<?php
namespace Thetavp\admin;
use Thetavp\Api\Api;
use Thetavp\database\Database;
use Thetavp\thetavp\Thetavp;

/**
 * Class containing all the admin related functions.
 *
 * This class contains the code for registering the menu, the menu itself and the saving of changed settings.
 */
class Admin{
	private $thetavp;
	private $database;
	private $api;

	/**
	 * Constructor for the Thetavp_Admin_Menu class.
	 * It sets the internal private variables.
	 */
	public function __construct() {
		$this->database    = Database::getInstance();
		$this->video_table = $this->database->get_theta_videos_table();
		$this->key_table   = $this->database->get_theta_keys_table();
		$this->thetavp     = new Thetavp();
		$this->api         = new Api();
	}

	/**
	 * Callback for adding a menu option.
	 * @return string
	 *
	 */
	public function add_thetavp_menu() {
		return add_menu_page(
			$this->thetavp->get_plugin_name(),
			$this->thetavp->get_plugin_name(),
			"manage_options",
			$this->thetavp->get_slug(),
			array( $this, 'show_admin_page' ),
			'dashicons-schedule',
			11
		);

	}


	/**
	 * Render the admin page
	 */
	public function show_admin_page() {
		$keys = $this->database->get_keys();

		if ( $this->api->is_localhost() ) {
			?>
            <p class="warn">Running from localhost is not yet supported.</p>
			<?php
		}
		?>
        <div class="wrap">
			<?php
			if ( isset( $_GET['status'] ) && $_GET['status'] == 1 ) {
				?><p>Updated successfully.</p> <?php
			}
			?>

            <h2>Keys</h2>

            <p>Get your API key and API secret from <a href="https://www.thetavideoapi.com/">the Theta Video API
                    site.</a></p>


            <form method="POST" action="admin-post.php" autocomplete="off">
                <input type="hidden" name="action" value="thetavp_save_keys">
				<?php wp_nonce_field( 'thetavp_keys_verify' ); ?>
				<?php if ( ! empty( $keys ) ) {
					?>
                    <div id="key">
                        <label for="api_key">Api key</label><br>
                        <input type='text' id="api_key" name="api_key" maxlength="32"
                               value="<?php echo $keys['key'] ?>"> <br>
                    </div>
                    <div id="secret">
                        <label for="api_secret">Api secret</label><br>
                        <input type="text" id="api_secret" name="api_secret" maxlength="32"
                               value="<?php echo $keys['secret'] ?>">
                    </div>
				<?php } else { ?>
                    <div id="key">
                        <label for="api_key">Api key</label><br>
                        <input type='text' id="api_key" maxlength="32" name="api_key"> <br>
                    </div>
                    <div id="secret">
                        <label for="api_secret">Api secret</label><br>
                        <input type="text" id="api_secret" maxlength="32" name="api_secret">
                    </div>
				<?php } ?>
                <br>
                <button type="submit">Save</button>
            </form>

        </div>

        <hr>
        <h2>Videos</h2>
		<?php

		$videos = $this->database->get_videos();
		if ( empty( $videos ) ) {
			?> <p>No videos have been uploaded to the API yet.</p>  <?php

		} else {
			?>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Theta Video ID</th>
                    <th>Status</th>
                </tr> <?php


			foreach ( $videos as $video ) {
				echo "<tr><td>$video->id</td><td>$video->theta_video_id</td><td>$video->status</td></tr>";
			}
			echo "</table>";
		}
	}

	/**
	 * Handle the form POST containing the keys
	 */
	public function thetavp_save_keys() {

		if ( ! current_user_can( 'edit_plugins' ) ) {
			wp_die( "you're not allowed to do this" );
		}
		check_admin_referer( 'thetavp_keys_verify' );
		$new_key    = $_POST['api_key'];
		$new_secret = $_POST['api_secret'];

		$this->database->set_api_keys( $new_key, $new_secret );

		wp_redirect( admin_url( 'admin.php?page=thetavp' ) );
	}


}
