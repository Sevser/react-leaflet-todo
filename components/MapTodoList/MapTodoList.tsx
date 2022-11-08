import React, { useState, useEffect } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import { LeafletMouseEvent, LatLngLiteral } from '@types/leaflet';
import { Point } from '../../types/Point/Point';
import { Todo } from '../../types/todo/Todo';
import { ITodo } from '../../types/todo/ITodo';
import MapTodoEditModal from '../MapTodoEditModal';

const MapTodoList = () => {
    const [listTodo, updateList] = useState<Todo[]>([]);
    const [editTodo, updateEditTodo] = useState<Todo | null>(null);

    const cancelCreating = () => {
        updateEditTodo(null);
    };

    const saveTodo = (newTodo: Todo) => {
        updateList(list => {
            list.push(newTodo as Todo);
            updateEditTodo(() => null);
            return list;
        });
    };

    const map = useMapEvents({
        contextmenu(e: LeafletMouseEvent) {
            updateEditTodo(new Todo({
                point: new Point(e.latlng),
                description: '',
                completed: false,
                title: '',
            }));
        },
    });



    return (<>
        {listTodo.map((item: ITodo, index: number) => <Marker key={index} position={item.point as LatLngLiteral}>
            <Popup>{JSON.stringify(item)}</Popup>
        </Marker>)}
        {editTodo && <MapTodoEditModal editTodo={editTodo} onCancel={cancelCreating} onSave={saveTodo} />}
    </>);
};

export default MapTodoList;