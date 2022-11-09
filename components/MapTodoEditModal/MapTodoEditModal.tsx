import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ITodo } from '../../types/todo/ITodo';
import { Todo } from '../../types/todo/Todo';
import { SyntheticEvent } from '@types/react';

type MapTodoEditModalProps = {
    editTodo: ITodo,
    onCancel: () => void,
    onSave: (p: ITodo) => void,
};

const MapTodoEditModal = ({ editTodo, onCancel, onSave }: MapTodoEditModalProps) => {
    const [saveDisabled, updateSaveDisabled] = useState<boolean>(true);
    const [value, updateValue] = useState<Todo>(editTodo);

    const checkAndUpdateSaveDisabled = (nVal: ITodo) => {
        if (value !== null && nVal.title && nVal.description && saveDisabled) {
            updateSaveDisabled(() => false);
        } else if (!saveDisabled && (nVal === null || !nVal.title.length || !nVal.description.length)) {
            updateSaveDisabled(() => true);
        }
    };

    const onInputDescription = (e: SyntheticEvent) => {
        const element = e.target as HTMLInputElement;
        const nVal = new Todo({
            ...value,
            description: element.value,
        });
        updateValue(nVal);
        checkAndUpdateSaveDisabled(nVal);
    };

    const onInputTitle = (e: SyntheticEvent) => {
        const element = e.target as HTMLInputElement;
        const nVal = new Todo({
            ...value,
            title: element.value,
        });
        updateValue(nVal);
        checkAndUpdateSaveDisabled(nVal);
    };

    const saveTodo = () => {
        onSave(value);
    };

    return (
        <Modal show={editTodo !== null} onHide={onCancel} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Creating new todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Todo's Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={value.title} onInput={onInputTitle} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Todo's Description</Form.Label>
                    <Form.Control
                        value={value.description}
                        as="textarea"
                        type="text"
                        onInput={onInputDescription}
                        placeholder="Description" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveTodo} disabled={saveDisabled}>
                    Save ToDo
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default MapTodoEditModal;