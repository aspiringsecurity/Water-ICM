<?php
namespace Thetavp\Api;

use Thetavp\database\Database;
use WP_Error;

class Api {
	private $namespace;
	private $plugin_name;
	private $version;
	private $plugin_dir_path;
	private $db;
	private $api_version;

	/**
	 * Constructor for the api class. Holds the db.
	 * @param $plugin_name string Plugin name
	 */
	public function __constructor( $plugin_name ) {
		require_once "database.php";
		$this->plugin_name     = $plugin_name;
		$this->version         = THETAVP_VERSION;
		$this->namespace       = $plugin_name . '/v' . $this->version;
		$this->plugin_dir_path = $this->plugin_dir_path( dirname( __FILE__ ) );


		$this->db          = Database::getInstance();
		$this->api_version = 'v1';


		//add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Get the API version.
	 * @return string;
	 */
	public function get_api_version() {
		return $this->api_version;
	}

	/**
	 * Check if the current user accessing is admin or not.
	 * @return bool user is admin
	 */
	public function permission_callback_is_admin() {
		return is_admin();
	}

	/**
	 *
	 * Get the videos
	 * @param $request
	 *
	 * @return void|WP_Error
	 */
	public function get_videos( $request ) {
		$result = $this->db->get_videos();

		if ( empty( $result ) ) {
			return new WP_Error( 'no videos found', 'no videos have been found', array( 'status' => 404 ) );
		}
	}

	/**
	 * Get a single video for the rest API
	 * @param $request
	 *
	 * @return false|string|WP_Error
	 */
	public function get_video( $request ) {
		$id = $request['id'];

		$result = $this->db->get_video( $id );

		if ( empty( $result ) ) {
			return new WP_Error( 'not_found', 'the video has not been found', array( 'status' => 404 ) );
		}

		return json_encode( $result );
	}


	/**
	 * Get a presigned url
	 * @return array|false containing the upload url
	 */
	public function get_upload_url() {
		$url  = "https://api.thetavideoapi.com/upload";
		$keys = $this->db->get_keys();
		if ( empty( $keys ) ) {
			return false;
		}
		$headers = array(
			'x-tva-sa-id'     => $keys['key'],
			'x-tva-sa-secret' => $keys['secret']
		);


		$response = wp_remote_post( $url, array( 'headers' => $headers ) );
		if ( is_wp_error( $response ) ) {
			error_log( $response->get_error_message() );

			return false;
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body );

		$upload        = $data->body->uploads[0];
		$id            = $upload->id;
		$presigned_url = $upload->presigned_url;
		error_log( $id );

		return array(
			'id'            => $id,
			'presigned_url' => $presigned_url
		);
	}

	/**
	 * Query the api to see if the status changed or not.
	 * @param $theta_video_id string theta video id
	 *
	 * @return array|false  video status. Returns false on failure.
	 */
	function get_video_status( $theta_video_id ) {
		$url  = "https://api.thetavideoapi.com/video/" . $theta_video_id;
		$keys = $this->db->get_keys();
		if ( empty( $keys ) ) {
			return false;
		}
		$headers  = array(
			'x-tva-sa-id'     => $keys['key'],
			'x-tva-sa-secret' => $keys['secret']
		);
		$response = wp_remote_get( $url, array( 'headers' => $headers ) );
		if ( is_wp_error( $response ) ) {
			error_log( $response->get_error_message() );

			return false;
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body );

		$state_object = $data->body->videos[0];
		$state        = $state_object->state;
		$sub_state    = $state_object->sub_state;
		$progress     = $state_object->progress;

		return array(
			'state'     => $state,
			'sub_state' => $sub_state,
			'progress'  => $progress
		);

	}

	/**
	 * This function uploads a video and returns an array with the theta video id and the state.
	 * It returns false if an error occured.
	 *
	 * @param $video_url string url to a video file
	 *
	 * @return array|void returns an array on success, void on failure.
	 */
	public function upload_using_url(  $video_url ) {
		//don't allow running this function from localhost
		if ($this->is_localhost()){
			return;
		}
		$video_url = $this->change_http_to_https($video_url);
		$url  = "https://api.thetavideoapi.com/video";
		$keys = $this->db->get_keys();
		if ( empty( $keys ) ) {
			error_log("No keys have been set");
			return;
		}
		$headers  = array(
			'x-tva-sa-id'     => $keys['key'],
			'x-tva-sa-secret' => $keys['secret'],
			'Content-Type'    => 'application/json'
		);

		$body     = array(
			"source_uri"      => $video_url,
			"playback_policy" => "public"
		);
		$response = wp_remote_post( $url, array( 'headers' => $headers, 'body' => wp_json_encode($body) ) );
		if ( is_wp_error( $response ) ) {
			error_log( print_r( $response->get_error_message(), true ) );

			return;
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body );


		$state_object = $data->body->videos[0];
		$id = $state_object->id;
		$state = $state_object->state;

		return array(
			'theta_video_id' => $id,
			'state' => $state
		);
	}

	/**
	 * Uploads the video using the curl binary octet stream.
	 * @param $url string endpoint of the api
	 * @param $video string video object
	 *
	 * Bugs: currently not working every time.
	 */
	public function upload_using_presigned_url_curl( $url, $video ) {

		$id = $video['id'];
		// Generated by curl-to-PHP: http://incarnate.github.io/curl-to-php/
		$ch = curl_init();

		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, 'PUT' );
		curl_setopt( $ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_2 );
		curl_setopt( $ch, CURLOPT_VERBOSE, true );

		$verbose = fopen( 'php://temp', 'w+' );
		curl_setopt( $ch, CURLOPT_STDERR, $verbose );

		$post = array(
			'file' => new CurlFile( get_attached_file( $id )/*, $video['mime'], $video['filename']*/ )
		);
		error_log( print_r( $post, true ) );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, $post );

		$headers   = array();
		$headers[] = 'Content-Type: application/octet-stream';
		curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );

		$result = curl_exec( $ch );
		if ( curl_errno( $ch ) ) {
			error_log( curl_error( $ch ) );
		}
		curl_close( $ch );

		rewind( $verbose );
		$log = stream_get_contents( $verbose );
		error_log( $log );
	}

	/**
	 * Transcodes the video as described in the examples
	 * @param $upload_id
	 *
	 * @return void
	 */

	public function transcode_upload( $upload_id ) {
		$url  = "https://api.thetavideoapi.com/video";
		$keys = $this->db->get_keys();
		if ( empty( $keys ) ) {
			return;
		}
		$headers = array(
			'x-tva-sa-id'     => $keys['key'],
			'x-tva-sa-secret' => $keys['secret'],
			'Content-Type'    => 'application/json'
		);
		$body    = array(
			'source_uri'      => $upload_id,
			'playback_policy' => 'public'
		);

		$response = wp_remote_post( $url, array( 'headers' => $headers, 'body' => wp_json_encode( $body ) ) );
		if ( is_wp_error( $response ) ) {
			error_log( $response->get_error_message() );

			return;
		}
		$body = wp_remote_retrieve_body( $response );
		error_log( print_r( $body, true ) );


	}

	/**
	 * Checks if cURL is loaded or not.
	 * @return bool curl is loaded
	 */
	function curl_is_loaded() {
		if ( in_array( 'curl', get_loaded_extensions() ) ) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Checks if the host is localhost or not.
	 * @return bool is running on localhost
	 */
	function is_localhost() {
		if ( $_SERVER['SERVER_ADDR'] == '127.0.0.1' || $_SERVER['SERVER_NAME'] == 'localhost' ) {
			return true;
		}

		return false;
	}

	/**
	 * Changes http to https 
	 * @param $url string url
	 *
	 * @return string url with HTTPS prefix
	 */
	function change_http_to_https($url){
		$exploded = explode(":", $url);
		if ($exploded[0] == "http"){
			$exploded[0] = "https";
			return join(":", $exploded);
		}
		return $url;
	}

}
