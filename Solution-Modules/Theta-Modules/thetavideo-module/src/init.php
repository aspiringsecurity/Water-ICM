<?php

namespace Thetavp\init;


use Thetavp\admin\Admin;
use Thetavp\database\Database;

const THETAVP_VERSION    = "0.0.1";
const THETAVP_PLUGIN_DIR = WP_PLUGIN_DIR . "/thetavideoplugin/";

add_action( 'init', 'Thetavp\blocks\register_blocks' );

register_activation_hook( __FILE__, 'install' );
/**
 * Install the plugin. Create tables.
 */
function install() {
	$database = Database::getInstance();
	$database->create_database_tables();
	$options = get_option( 'thetavp_api_key' );
	if ( ! $options ) {
		$default = "";
		add_option( 'thetavp_keys', $default );
	}

}

/**
 * Handle the admin menu hook.
 */
function register_menu() {
	$admin_menu = new Admin();
	$page       = $admin_menu->add_thetavp_menu();

	add_action( 'load-' . $page, 'load_admin' );
}

/**
 * Redirect the post to the page and save the form data.
 */
function save_keys() {
	$admin_menu = new Admin();
	$admin_menu->thetavp_save_keys();

}

add_action( 'admin_post_thetavp_save_keys', 'save_keys' );


add_action( 'admin_menu', 'register_menu' );

/**
 * Do all the loading required for the admin page
 */
function load_admin() {
	add_action( 'admin_enqueue_scripts', 'enqueue_admin_css' );
}

/**
 * Load the admin page css.
 */
function enqueue_admin_css() {
	wp_enqueue_style( 'admin.css', plugin_dir_url( __FILE__ ) . '/public/css/admin.css' );
}

/**
 * Register rest routes for the API.
 */
function thetavp_register_rest_routes() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/thetavp.php';
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-thetavp-api.php';

	$thetavp          = new Thetavp();
	$api              = new Thetavp_Api();
	$slug             = $thetavp->get_slug();
	$api_version_slug = $slug . '/v1';

	register_rest_route( $api_version_slug, '/get_video/(?P<id>\d+)', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => array( $api, 'get_video' ),
		'permission_callback' => '__return_true'
	) );

	register_rest_route( $api_version_slug, '/get_videos', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => array( $api, 'get_videos' ),
		'permission_callback' => function ( $request ) {
			return current_user_can( 'manage_options' );
		}
	) );
}

/**
 * Set up WP-cron
 */
\Thetavp\cron\cron_setup();

//add_action( 'rest_api_init', 'thetavp_register_rest_routes' ); */


