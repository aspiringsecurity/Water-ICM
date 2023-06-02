<?php

namespace Thetavp\database;
/**
 * The class used for all the database interactions
 */
class Database {
	private $theta_video_table;
	private $theta_keys_table;
	private static $instance = null;

	/**
	 * Constructor which sets the local private variables. These are used to access the tables later on.
	 */
	public function __construct() {
		global $wpdb;
		$this->theta_video_table = $wpdb->prefix . "thetavp_videos";
		$this->theta_keys_table  = $wpdb->prefix . "thetavp_apikeys";
	}

	public static function getInstance() {
		if ( self::$instance == null ) {
			self::$instance = new ThetavpDatabase();
		}

		return self::$instance;
	}

	/**
	 * Create the database tables required for the plugin to work
	 */
	public function create_database_tables() {
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		global $charset_collate;

		$sql = "CREATE TABLE IF NOT EXISTS $this->theta_video_table (
	        `id` int not null,
    		`hosted_on_chain` bool not null,
    		`theta_video_id` char(32),
    		`external_url` varchar(255),
    		`status` varchar(255),
	        PRIMARY KEY (`id`)
		) $charset_collate;";

		dbDelta( $sql );

		$sql = "
		CREATE TABLE IF NOT EXISTS $this->theta_keys_table (
		    `id` int not null auto_increment,
		    `secret` char(32) not null,
		    `key` char(32) not null,
		    `checked` bool default FALSE,
		    PRIMARY KEY (`id`)
		) $charset_collate;
		";
		dbDelta( $sql );
	}

	/**
	 * Returns the table in which the keys are being stored.
	 * @return string key table name
	 */
	public function get_theta_keys_table() {
		return $this->theta_keys_table;
	}

	/**
	 * Returns the table in which the video data is being stored.
	 * @return string video table name
	 */
	public function get_theta_videos_table() {
		return $this->theta_video_table;
	}

	/**
	 * Get all the videos in the table
	 * @return array|object|null all the videos in the table
	 */
	public function get_videos() {
		global $wpdb;

		return $wpdb->get_results( "SELECT * FROM $this->theta_video_table" );
	}

	/**
	 * Get the keys
	 * @return array|object|void|null returns an array of the keys or empty if there are no results
	 */
	public function get_keys() {
		global $wpdb;

		$result = $wpdb->get_row( "SELECT * FROM $this->theta_keys_table WHERE id=1" );
		if ( empty( $result ) ) {
			return $result;
		}

		return array(
			'key'    => $result->key,
			'secret' => $result->secret
		);

	}

	/**
	 * Get all videos currently uploading or transcoding
	 * @return array|object|null array of videos or empty if there are no videos
	 */
	public function get_videos_in_progress() {
		global $wpdb;

		return $wpdb->get_results( "SELECT * FROM $this->theta_video_table WHERE status <> 'success' AND status <> 'error' OR status IS NULL " );


	}

	/**
	 * Save the api key and secret to the database
	 *
	 * @param $key string api key
	 * @param $secret string api secret
	 *
	 * @return bool|int succes or failure
	 */
	public function add_key( $key, $secret ) {
		global $wpdb;
		$data = array( 'key' => $key, 'secret' => $secret );

		return $wpdb->insert( $this->theta_keys_table, $data );
	}

	/**
	 * Stores a video in the database
	 *
	 * @param $id int library ID
	 * @param $theta_video_id string ID given by the theta video api
	 * @param $state string current state
	 */
	public function add_video( $id, $theta_video_id, $state ) {
		global $wpdb;
		$video = $this->get_video( $id );
		if ( ! empty( $video ) ) {
			return;
		}
		$wpdb->insert( $this->theta_video_table,
			array(
				'id'             => $id,
				'theta_video_id' => $theta_video_id,
				'status'         => $state
			)
		);

	}

	/**
	 * Update the API key and secret or insert them if they do not exist in the db.
	 *
	 * @param $api_key string the API key from thetavideapi
	 * @param $api_secret string the API secret from thetavideoapi
	 */
	public function set_api_keys( $api_key, $api_secret ) {
		global $wpdb;

		$old_key = $this->get_keys();
		if ( empty( $old_key ) ) {
			$wpdb->insert( $this->theta_keys_table,
				array(
					'key'    => $api_key,
					'secret' => $api_secret
				) );

			return;
		}
		$wpdb->update( $this->theta_keys_table,
			array(
				'key'    => $api_key,
				'secret' => $api_secret
			),
			array( 'id' => 1 ) );


	}

	/**
	 * Set the video state
	 *
	 * @param $theta_video_id string id of the video of which the state has to be changed
	 * @param $state string new state
	 */
	public function set_video_state( $theta_video_id, $state ) {
		global $wpdb;
		$wpdb->update( $this->theta_video_table, array(
			'status' => $state
		),
			array( 'theta_video_id' => $theta_video_id )
		);
	}

	/**
	 * Get video
	 *
	 * @param $id int id from the media library
	 *
	 * @return array|object|void|null array containing data or empty when there isn't any data
	 */
	public function get_video( $id ) {
		global $wpdb;
		$sql = $wpdb->prepare(
			"SELECT * FROM $this->theta_video_table WHERE id = %s",
			$id
		);

		$result = $wpdb->get_row( $sql );
		if ( empty( $result ) ) {
			return $result;
		}

		return array(
			'id'             => $result->id,
			'theta_video_id' => $result->theta_video_id,
			'external_url'   => $result->external_url,
			'status'         => $result->status
		);

	}

}
