import React, { useState } from 'react';
import { useMapEvents, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import { LeafletMouseEvent, LatLngLiteral } from '@types/leaflet';
import { Point } from '../../types/Point/Point';
import { Todo } from '../../types/todo/Todo';
import { ITodo } from '../../types/todo/ITodo';
import MapTodoEditModal from '../MapTodoEditModal';
import { useMobxStores } from '../../store/storeContext';

const MapTodoList = () => {
    const store = useMobxStores();
    const [editTodo, updateEditTodo] = useState<Todo | null>(null);

    const cancelCreating = () => {
        updateEditTodo(null);
    };

    const saveTodo = (newTodo: Todo) => {
        newTodo.creationDate = new Date();
        store.todos.addToDo(newTodo);
        updateEditTodo(() => null);
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
        <LayersControl.Overlay checked name="layer with todo's">
            <LayerGroup>
                {store.todos.list.map((item: ITodo, index: number) => <Marker key={index} position={item.point as LatLngLiteral}>
                    <Popup>{JSON.stringify(item)}</Popup>
                </Marker>)}
            </LayerGroup>
        </LayersControl.Overlay>
        {editTodo && <MapTodoEditModal editTodo={editTodo} onCancel={cancelCreating} onSave={saveTodo} />}
    </>);
};

export default MapTodoList;