<?php
namespace Thetavp\cron;

function cron_setup() {
	add_filter( 'cron_schedules', 'add_minute_interval' );
	if (!wp_next_scheduled("thetavp_check_status")) {
		wp_schedule_event( time(), 'one_minute', 'thetavp_check_status' );
	}
	add_action( 'thetavp_check_status', 'check_status' );
}

function add_minute_interval( $schedules ) {
		$schedules['one_minute'] = array(
			'interval' => 60,
			'display'  => esc_html__( 'Every 1 minute' )
		);

	return $schedules;
}

/**
 * Callback for the wordpress event.
 */
function check_status() {
	require_once plugin_dir_path( __FILE__ ) . 'database.php';
	require_once plugin_dir_path( __FILE__ ) . 'class-thetavp-api.php';
	$db     = new ThetavpDatabase();
	$api    = new Thetavp_Api();
	$videos = $db->get_videos_in_progress();
	if ( empty( $videos ) ) {
		return;
	}


	foreach ( $videos as $video ) {
		error_log(print_r($video, true));
		$state = $api->get_video_status( $video->theta_video_id );
		error_log(print_r($state, true));
		if ( $state['state'] == "success" ) {
			$db->set_video_state( $video->theta_video_id, "success" );
		} else if ( $state['state'] == "processing" && $video->state != "processing" ) {
			$db->set_video_state( $video->theta_video_id, "processing" );
		} else if ($video->state == "error"){
			$db->set_video_state($video->theta_video_id, "error");
		}
	}
}



