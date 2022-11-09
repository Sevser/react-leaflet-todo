import React, { useEffect, useState } from 'react';
import { useMapEvents, useMap } from 'react-leaflet'
import { useRouter } from 'next/router';
import useThrottle from '../../utils/hooks/useThrottle';
import { LatLng } from 'leaflet';


const LocationMarker = () => {
    const router = useRouter();
    const map = useMap();
    const [center, setCenter] = useState<LatLng>(map.getCenter());
    const [zoom, setZoom] = useState<Number>(map.getZoom());
    const throttledCenter = useThrottle(center);
    const throttledZoom = useThrottle(zoom);
    useMapEvents({
        move() {
            setCenter(map.getCenter());
        },
        zoom() {
            setZoom(map.getZoom());
        }
    });

    useEffect(() => {
        router.push({
            query: {
                lat: throttledCenter.lat.toPrecision(6),
                lng: throttledCenter.lng.toPrecision(6),
                zoom: throttledZoom.toString(),
            },
        });
    }, [throttledCenter, throttledZoom]);

    return (<></>);
}

export default LocationMarker;