<?php
namespace Thetavp\thetavp;
/**
 * Class containing some constants used in other places
 */
class Thetavp {
	const options_tag = "thetavp_options";
	const options_version = '1.0';

	protected $version;
	protected $plugin_name;
	protected $slug;


	/**
	 * Construct the class and set some variables
	 */
	public function __construct() {
		if ( defined( 'THETAVP_VERSION' ) ) {
			$this->version = THETAVP_VERSION;
		} else {
			$this->version = '0.0.1';
		}

		$this->plugin_name = "Theta Video Plugin";
		$this->slug        = "thetavp";
	}

	/**
	 * Get the current plugin version
	 * @return string current plugin version
	 */
	public function get_version() {
		return $this->version;
	}

	/**
	 * Get the plugin name
	 * @return string plugin name
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * Get the slug used in urls
	 * @return string slug
	 */
	public function get_slug() {
		return $this->slug;
	}

}
