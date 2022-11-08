import React, { useState } from 'react';
import { useMapEvents, Marker } from 'react-leaflet';
import { LeafletMouseEvent, LatLngLiteral } from '@types/leaflet';
import { Point } from '../../types/Point/Point';
import { Todo } from '../../types/todo/Todo';
import { Modal, Button } from 'react-bootstrap';
import { ITodo } from '../../types/todo/ITodo';

const MapTodoList = () => {
    const [listTodo, updateList] = useState<Todo[]>([]);
    const [editTodo, updateEditTodo] = useState<Todo | null>(null)
    
    const cancelCreating = () => {
        updateEditTodo(null);
    };

    const saveTodo = () => {
        updateList(list => {
            list.concat(editTodo as Todo);
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
        {listTodo.map((item: ITodo, index: number) => <Marker key={index} position={item.point as LatLngLiteral}></Marker>)}
        <Modal show={editTodo !== null} onHide={cancelCreating} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Creating new todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelCreating}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveTodo}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
};

export default MapTodoList;