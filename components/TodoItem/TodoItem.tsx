import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { observer } from 'mobx-react';
import { useMobxStores } from "../../store/storeContext";
import { Todo } from "../../types/todo/Todo";
import { TrashFill } from 'react-bootstrap-icons';

import styles from './TodoItem.module.css';

const TodoItemPopover = (props: object) => (<Tooltip {...props}>
    Click to locate
</Tooltip>);

const TodoItem = observer(({ todo }: { todo: Todo }) => {
    const store = useMobxStores();

    return (<OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={TodoItemPopover}>
        <Card className={styles.card}>
            <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text>{todo.description}</Card.Text>
                <Button
                    onClick={() => store.todos.markAsCompleted(todo)}
                    variant="primary">
                    {todo.completed ? 'Completed' : 'Mark as completed'}
                </Button>
                <TrashFill
                    onClick={() => store.todos.removeToDo(todo)}
                    className={styles.trash} />
            </Card.Body>
        </Card>
    </OverlayTrigger>);
});

export default TodoItem;