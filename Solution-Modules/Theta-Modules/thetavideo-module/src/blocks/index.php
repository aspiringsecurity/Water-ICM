<?php
namespace Thetavp\blocks;

function register_blocks(){
	register_block_type( __DIR__ . '', array(
		'render_callback' => 'Thetavp\\render_dynamic_block'
	) );
}