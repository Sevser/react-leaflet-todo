import React, { useState } from 'react';
import { useMapEvents, Marker } from 'react-leaflet';
import { LeafletMouseEvent, LatLngLiteral } from '@types/leaflet';
import { IPoint } from '../../types/Point/IPoint';
import { Point } from '../../types/Point/Point';

const MapTodoList = () => {
    const [listTodo, updateList] = useState<IPoint[]>([]);
    const map = useMapEvents({
        contextmenu(e: LeafletMouseEvent) {
            updateList(old => old.concat(new Point(e.latlng)));
            console.log(e);
        },
    });
    return (listTodo.map((item: IPoint, index: number) => <Marker key={index} position={item as LatLngLiteral}></Marker>));
};

export default MapTodoList;