import { useEffect, useState } from 'react';
const uniqid = require( 'uniqid' );

const {
	InspectorControls,
} = wp.editor;
const {
	Button,
	PanelBody,
	RangeControl,
	TextControl,
} = wp.components;

import { mobile, tablet, desktop } from '@wordpress/icons';

function Inspector( props ) {
	const { attributes: { height, api_key, address, headingSize, heading }, setAttributes } = props;

	const [ name, setName ] = useState( '' );
	const [ newAddress, setNewAddress ] = useState( '' );
	const [ addressObj, setAddressObj ] = useState( {} );
	const [ markerData, setMarkerData ] = useState( address ? address : [] );

	useEffect( () => {
	}, [ addressObj, markerData ] );

	const addMarker = () => {
		const nameObj = { id: uniqid(), name: name };
		const fullAddressObj = Object.assign( {}, addressObj, nameObj );

		setMarkerData( [ ...markerData, fullAddressObj ] );

		const address = [ ...markerData, fullAddressObj ];
		const center = { lat: fullAddressObj.latitude, lng: fullAddressObj.longitude };
		setAttributes( { address } );
		setAttributes( { center } );

		setName( '' );
		setNewAddress( '' );
	};

	const searchAddress = ( add ) => {
		const addressQuery = add.split( /[ ,]+/ ).join( '%' );
		setNewAddress( add );

		fetch( `https://maps.googleapis.com/maps/api/geocode/json?address=${ addressQuery }&key=${ api_key }` ).then( ( response ) => response.json()
		).then( data => {
			if ( data.status === 'OK' ) {
				const location = data.results[ 0 ].geometry.location;
				const addressFormatted = data.results[ 0 ].formatted_address;

				setAddressObj( {
					address: addressFormatted,
					latitude: location.lat,
					longitude: location.lng,
				} );
			}
		} );
	};

	return <InspectorControls>

		<PanelBody>

			<TextControl
				label="Map Heading"
				value={ heading }
				onChange={ heading => setAttributes( { heading } ) }
			/>

			<div style={ { width: '22px' } }>{ mobile }</div>

			<RangeControl
				beforeIcon="arrow-left-alt2"
				afterIcon="arrow-right-alt2"
				label={ 'Mobile Font' }
				value={ headingSize }
				onChange={ headingSize => setAttributes( { headingSize } ) }
				min={ 1 }
				max={ 40 }
			/>

			<div style={ { width: '22px' } }>{ tablet }</div>

			<RangeControl
				beforeIcon="arrow-left-alt2"
				afterIcon="arrow-right-alt2"
				label={ 'Tablet Font' }
				value={ headingSize }
				onChange={ headingSize => setAttributes( { headingSize } ) }
				min={ 1 }
				max={ 40 }
			/>

			<div style={ { width: '22px' } }>{ desktop }</div>
			<RangeControl
				beforeIcon="arrow-left-alt2"
				afterIcon="arrow-right-alt2"
				label={ 'Desktop Font' }
				value={ headingSize }
				onChange={ headingSize => setAttributes( { headingSize } ) }
				min={ 1 }
				max={ 40 }
			/>

		</PanelBody>

		<PanelBody>
			<p>Add Markers on Map: </p>

			<TextControl
				label="Name"
				value={ name }
				onChange={ newName => setName( newName ) }
			/>
			<TextControl
				label={ 'Address' }
				value={ newAddress }
				onChange={ ( add ) => searchAddress( add ) }
			/>
			<Button style={ { border: '1px solid #000' } } onClick={ addMarker }>Add Marker</Button>
		</PanelBody>

		{ markerData.length > 0 ?
			<PanelBody>
				<p>Locations: </p>
				{ markerData.map( place =>
					<div key={ place.id }>
						<p>{ place.name }: { place.address }</p>
					</div>
				) }
			</PanelBody> :
			null }

		<PanelBody>
			<RangeControl
				beforeIcon="arrow-left-alt2"
				afterIcon="arrow-right-alt2"
				label={ 'Map Height' }
				value={ height }
				onChange={ height => setAttributes( { height } ) }
				min={ 50 }
				max={ 1000 }
			/>
		</PanelBody>

		<PanelBody>
			<TextControl
				label={ 'Api Key' }
				help={ <p>Please create your own API key on the <a href="https://console.developers.google.com"
					target="_blank">Google Console</a>. This is a requirement enforced by Google.
				</p> }
				value={ api_key }
				onChange={ api_key => {
					if ( ! api_key ) {
						api_key = '';
					}
					setAttributes( { api_key } );
				} }
			/>
		</PanelBody>

	</InspectorControls>;
}

export default Inspector;
