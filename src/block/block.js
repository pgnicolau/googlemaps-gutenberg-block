/**
 * BLOCK: google-map-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import blockIcons from './icons.js';
import Map from './map';
import Inspector from './inspector';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

function buildMap( attributes ) {
	return <Map
		center={ attributes.center }
		zoom={ 6 }
		places={ attributes.address }
		height={ attributes.height }
		api_key={ attributes.api_key }
		googleMapURL={ `https://maps.googleapis.com/maps/api/js?key=${ attributes.api_key }` }
		loadingElement={ <div style={ { height: '100%' } } /> }
		containerElement={ <div style={ { height: `${ attributes.height }px` } } /> }
		mapElement={ <div style={ { height: '100%' } } /> }
	/>;
} // buildMapIframe

export default registerBlockType(
	'cgb/block-google-map-block',
	{
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
		title: __( 'google-map-block - CGB Block' ), // Block title.
		description: 'Google map api block for adding map markers',
		icon: blockIcons.googleMap, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
		category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
		supports: { html: false },
		keywords: [
			__( 'google-map-block — CGB Block' ),
			__( 'CGB Example' ),
			__( 'create-guten-block' ),
		],
		attributes: {
			height: {
				type: 'number',
				default: '400',
			},
			address: {
				type: 'array',
				default: [],
			},
			api_key: {
				type: 'string',
				default: 'AIzaSyAdo5hu6O9gjTKD8iSDS04QJkCaYHDPXps',
			},
			center: {
				type: 'object',
				default: { lat: 40.64, lng: -73.96 },
			},
			heading: {
				type: 'string',
				default: 'Map Heading',
			},
			headingSize: {
				type: 'number',
				default: '25',
			},
		},

		edit: props => {
			const { attributes: attributes, setAttributes } = props;
			return [
				<Inspector { ...{ setAttributes, ...props } } />,
				<h1 style={ { fontSize: `${ attributes.headingSize }px` } }>{ attributes.heading }</h1>,
				<div>{ buildMap( attributes ) }</div>,
			];
		},

		save: props => {
			const { attributes } = props;

			return (
				<div>
					<h1 style={ { fontSize: `${ attributes.headingSize }px` } }>{ attributes.heading }</h1>
					<div>{ buildMap( attributes ) }</div>
				</div>
			);
		},
	},
);
