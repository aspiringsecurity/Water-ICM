<?php
/**
 * Plugin Name:       Theta Video Plugin
 * Plugin URI:        https://thetavideoplugin.com
 * Description:       Plugin for using the Theta video API
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Theta Video Plugin
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       thetavp
 *
 * @package           thetavp
 */

namespace Thetavp;

/**
 * Prevent the plugin from being directly called
 */
if ( ! defined( "ABSPATH" ) ) {
	exit;
}

function thetavp_build_notice(){
	echo '<div class="notice notice-erorr"><p>';
	_e('Video plugin for Theta requires to be built. Run npm install and then npm built.', 'thetavp');
	echo '</p></div>';
}

function thetavp_pre_init(){
	if ( ! file_exists(__DIR__ .'/build') || ! file_exists(__DIR__ . '/vendor/autoload.php')){
		add_action('admin_notices', 'Thetavp\thetavp_build_notice');
		return;
	}

	require_once __DIR__ . '/vendor/autoload.php';
}
thetavp_pre_init();
