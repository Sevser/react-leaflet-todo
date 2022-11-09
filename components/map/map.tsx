import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, ZoomControl } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import useResize from '../../utils/hooks/useResize';
import UserLocation from '../UserLocation';
import MapTodoList from '../MapTodoList';

const Map = () => {
    const [ready, updateReady] = useState<boolean>(false);
    const rootEl = useRef<HTMLDivElement>(null);
    const [mapSize] = useResize(rootEl);

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
    }, []);

    return (
        <div ref={rootEl} className={styles['map-container']}>
            {
                ready ? (<MapContainer center={[51.505, -0.09]} zoom={13} style={mapSize ? mapSize.sizeAsStyle : {}} zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position='bottomright'/>
                    <UserLocation />
                    <LayersControl position="topright">
                        <MapTodoList />
                    </LayersControl>
                </MapContainer>) : ''
            }
        </div>
    )
};

export default Map;