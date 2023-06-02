<?php
namespace Thetavp\block;
use Thetavp\Api\Api;
use Thetavp\database\Database;
use Thetavp\database\ThetavpDatabase;

/**
 * This function renders the Gutenberg block.
 * It shows the video hosted by the Wordpress host or the one hosted using the Theta Video API depending on whether the
 * video has been uploaded and has been processed by the API.
 *
 * @param $attributes array, automatically applied by Wordpress
 */
function render_dynamic_block( $attributes ) {
	$api = new Api();
	$db  = Database::getInstance();

	$video_obj    = $attributes['video'];

	/**
	 * Show the video hosted on the blockchain if it has finished transcoding.
	 */
	$theta_video = $db->get_video( $video_obj['id'] );
    error_log(print_r($theta_video, true));
	ob_start();
	if ( ! empty( $theta_video ) ) {
		if ( $theta_video['status'] == "success" ) {
			?>
			<div>
				<div style="position:relative;padding-top: 56.25%;">
					<iframe src="https://player.thetavideoapi.com/video/<?php echo $theta_video['theta_video_id'] ?>"
							style="position:absolute; top: 0; left: 0; width: 100%; height:100%;"></iframe>
				</div>
			</div>

			<?php
			return ob_get_clean();

		}
	} else {
		//if the result is empty (no video has been uploaded)
		$video = $api->upload_using_url( $video_obj['url'] );
		if ( ! empty( $video ) ) {
			$db->add_video( $video_obj['id'], $video['theta_video_id'], $video['state'] );
		}
	}

	?>

	<div>
		<video height="auto" controls="controls" onclick="this.play()" src=<?php echo $video_obj['url'] ?>>
		</video>
	</div>
	<?php
	return ob_get_clean();


}

