import React, { Fragment, useState, useEffect } from 'react';
import {
	withGoogleMap,
	GoogleMap,
	withScriptjs,
	Marker,
	InfoWindow,
} from 'react-google-maps';

const Map = ( props ) => {
	const [ showInfoIndex, setShowInfoIndex ] = useState( {} );

	useEffect( () => {
	}, [ showInfoIndex ] );

	const handleToggle = ( a ) => {
		setShowInfoIndex( { showInfoIndex: a } );
	};

	return (
		<GoogleMap
			defaultZoom={ props.zoom }
			defaultCenter={ props.center }
		>
			{ props.places.map( ( place, i ) => {
				return (

					<Fragment key={ i }>
						<Marker
							id={ i }
							position={ {
								lat: parseFloat( place.latitude ),
								lng: parseFloat( place.longitude ),
							} }

							onClick={ () => handleToggle( i ) }
						>

							{ ( showInfoIndex.showInfoIndex === i ) &&
								<InfoWindow>
									<div>{ place.name }</div>
								</InfoWindow>
							}
						</Marker>
					</Fragment>
				);
			} ) }
		</GoogleMap>
	);
};

export default withScriptjs( withGoogleMap( Map ) );
