import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const Map = () => {
    const [mapStyles, updateStyles] = useState({ height: '', width: '' });
    const [ready, updateReady] = useState<boolean>(false);
    const rootEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapStyles.width && mapStyles.height) {
            updateReady(() => true);
        }
    }, [mapStyles]);

    useEffect(() => {
        if(rootEl.current) {
            const whattype = rootEl.current; 
            updateStyles(() => ({
                height: `${whattype.clientHeight}px`,
                width: `${whattype.clientWidth}px`,
            }));
        }
    }, [rootEl]);

    useEffect(() => {
        (async function init() {
            delete L.Icon.Default.prototype._getIconUrl;

            L.Icon.Default.mergeOptions({
                iconRetinaUrl: iconRetinaUrl.src,
                iconUrl: iconUrl.src,
                shadowUrl: shadowUrl.src,
            });
        })();
    }, []);

    return (
        <div ref={rootEl} className={styles['map-container']}>
            {
                ready ? (<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={mapStyles}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>) : ''
            }
        </div>
    )
};

export default Map;