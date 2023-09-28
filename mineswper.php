<?php
/**
 * Plugin Name:       Mineswper
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mineswper
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */


//  function enqueue_frontend_script() {
//     $script_path       = 'build/frontend.js';
//     $script_asset_path = 'build/frontend.asset.php';
//     $script_asset      = require( $script_asset_path );
//     $script_url = plugins_url( $script_path, __FILE__ );
//     wp_enqueue_script( 'script', $script_url, $script_asset['dependencies'], $script_asset['version'] );
// }

// function create_block_mineswper_block_init() {

//     register_block_type( __DIR__ . '/build' );
//     register_block_type(__DIR__, array(
//         'render_callback' => 'enqueue_frontend_script'
//     ));

// }
// add_action( 'init', 'create_block_mineswper_block_init' );

function create_block_interactive_block_block_init() {
    register_block_type( __DIR__ . '/build', array(
        'render_callback' => 'render_block_with_attribures'
    ) );
}
 
// Copied from @wordpress/dependency-extraction-webpack-plugin docs.
function enqueue_frontend_script() {
    $script_path       = 'build/frontend.js';
    $script_asset_path = 'build/frontend.asset.php';
    $script_asset      = require( $script_asset_path );
    $script_url = plugins_url( $script_path, __FILE__ );
    wp_enqueue_script( 'script', $script_url, $script_asset['dependencies'], $script_asset['version'] );
}
 
// Copied from WooCommerce Blocks.
function add_attributes_to_block( $attributes = [], $content = '' ) {
    $escaped_data_attributes = [];
 
    foreach ( $attributes as $key => $value ) {
        if ( is_bool( $value ) ) {
            $value = $value ? 'true' : 'false';
        }
        if ( ! is_scalar( $value ) ) {
            $value = wp_json_encode( $value );
        }
        $escaped_data_attributes[] = 'data-' . esc_attr( strtolower( preg_replace( '/(?<!\ )[A-Z]/', '-$0', $key ) ) ) . '="' . esc_attr( $value ) . '"';
    }
 
    return preg_replace( '/^<div /', '<div ' . implode( ' ', $escaped_data_attributes ) . ' ', trim( $content ) );
}
 
function render_block_with_attribures( $attributes = [], $content = '' ) {
    if ( ! is_admin() ) {
        enqueue_frontend_script();
    }
    if (empty($attributes)){
        create_block_interactive_block_block_init();
    }
    return add_attributes_to_block($attributes, $content);
};
 
add_action( 'init', 'create_block_interactive_block_block_init' );
