import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { observer } from 'mobx-react';
import { useMobxStores } from "../../store/storeContext";
import { Todo } from "../../types/todo/Todo";

import styles from './TodoItem.module.css';

const TodoItemPopover = (props: object) => (<Tooltip {...props}>
    Click to locate
</Tooltip>);

const TodoItem = observer(({ todo }: { todo: Todo }) => {
    const store = useMobxStores();

    const markAsCompleted = () => {
        store.todos.markAsCompleted(todo);
    };

    return (<OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={TodoItemPopover}>
        <Card className={styles.card}>
            <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text>{todo.description}</Card.Text>
                <Button
                    onClick={() => markAsCompleted()}
                    variant="primary">
                    {todo.completed ? 'Completed' : 'Mark as completed'}
                </Button>
            </Card.Body>
        </Card>
    </OverlayTrigger>);
});

export default TodoItem;