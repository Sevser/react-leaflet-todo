import React, { useState } from 'react';
import { useMapEvents, Marker, LayersControl, LayerGroup } from 'react-leaflet';
import { LatLngLiteral } from '@types/leaflet';
import { Point } from '../../types/Point/Point';
import { Todo } from '../../types/todo/Todo';
import { ITodo } from '../../types/todo/ITodo';
import MapTodoEditModal from '../MapTodoEditModal';
import { useMobxStores } from '../../store/StoreContext';
import { observer } from 'mobx-react';

const MapTodoList = observer(() => {
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

    useMapEvents({
        contextmenu(e) {
            updateEditTodo(new Todo({
                point: new Point(e.latlng)
            }));
        },
    });

    return (<>
        <LayersControl.Overlay checked name="completed todo's">
            <LayerGroup>
                {store.todos.list.filter(item => item.completed).map((item: ITodo, index: number) => <Marker
                    key={index}
                    position={item.point as LatLngLiteral} />)}
            </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="pending todo's">
            <LayerGroup>
                {store.todos.list.filter(item => !item.completed).map((item: ITodo, index: number) => <Marker key={index} position={item.point as LatLngLiteral} />)}
            </LayerGroup>
        </LayersControl.Overlay>
        {editTodo && <MapTodoEditModal editTodo={editTodo} onCancel={cancelCreating} onSave={saveTodo} />}
    </>);
});

export default MapTodoList;