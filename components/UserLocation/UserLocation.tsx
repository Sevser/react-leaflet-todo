import React, { useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet'
import { LocationEvent, LatLngLiteral } from '@types/leaflet';


const LocationMarker = () => {
    const [position, setPosition] = useState<LatLngLiteral | null>(null)
    const map = useMapEvents({
        load() {
            map.locate();
        },
        click() {
            // map.locate();
        },
        locationfound(e: LocationEvent) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return (position === null ? null : <Marker position={position}><Popup>You are here </Popup></Marker>);
}

export default LocationMarker;