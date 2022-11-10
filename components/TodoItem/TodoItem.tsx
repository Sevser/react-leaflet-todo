import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { observer } from 'mobx-react';
import { useMobxStores } from "../../store/StoreContext";
import { Todo } from "../../types/todo/Todo";
import { TrashFill, GeoAltFill } from 'react-bootstrap-icons';


import styles from './TodoItem.module.css';
import { showOnMapChannel } from "../../utils/events/showOnMapChannel";

const TodoItemPopover = (props: object) => (<Tooltip {...props}>
    Click to locate
</Tooltip>);

const TodoItem = observer(({ todo }: { todo: Todo }) => {
    const store = useMobxStores();

    const showOnMap = () => {
        showOnMapChannel.emit('showOnMap', { center: todo.point, zoom: 13 });
    };

    return (<Card className={styles.card}>
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
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={TodoItemPopover}>
                <GeoAltFill
                    onClick={showOnMap}
                    className={styles.geo} />
            </OverlayTrigger>
        </Card.Body>
    </Card>);
});

export default TodoItem;