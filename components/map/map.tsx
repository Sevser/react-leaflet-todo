import React, { useEffect, useState, useRef, SetStateAction } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, LayersControl, ZoomControl } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import useResize from '../../utils/hooks/useResize';
import UserLocation from '../UserLocation';
import MapTodoList from '../MapTodoList';
import { useRouter } from 'next/router';

const Map = () => {
    const [ready, updateReady] = useState<boolean>(false);
    const [readyCoord, updateReadyCoord] = useState<boolean>(false);
    const [initialCenter, updateInitialCenter] = useState<[number, number]>([51.505, -0.09]);
    const [initialZoom, updateZoom] = useState<number>(13);
    const rootEl = useRef<HTMLDivElement>(null);
    const [mapSize] = useResize(rootEl);
    const router = useRouter();

    useEffect(() => {
        if (mapSize && mapSize.width && mapSize.height) {
            updateReady(() => true);
        }
    }, [mapSize]);

    useEffect(() => {
        (async function init() {
            delete L.Icon.Default.prototype._getIconUrl;

            L.Icon.Default.mergeOptions({
                iconRetinaUrl: iconRetinaUrl.src,
                iconUrl: iconUrl.src,
                shadowUrl: shadowUrl.src,
            });
            L.control.zoom({
                position: 'bottomright'
            });
        })();
        if (router.isReady && router.query && !readyCoord) {
            const lat = parseFloat(router.query.lat as string);
            const lng = parseFloat(router.query.lng as string);
            if (router.query.zoom) {
                const zoom = parseInt(router.query.zoom as string, 10);
                if (!isNaN(zoom)) {
                    updateZoom(zoom);
                }
            }
            updateInitialCenter([isNaN(lat) ? initialCenter[0] : lat, isNaN(lng) ? initialCenter[1] : lng]);
            updateReadyCoord(() => true);
        }
    });    

    return (
        <div ref={rootEl} className={styles['map-container']}>
            {
                ready && readyCoord ? (<MapContainer
                    center={initialCenter}
                    zoom={initialZoom}
                    style={mapSize ? mapSize.sizeAsStyle : {}}
                    zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position='bottomright' />
                    <UserLocation />
                    <LayersControl position="topright">
                        <MapTodoList />
                    </LayersControl>
                </MapContainer>) : ''
            }
        </div >
    )
};

export default Map;