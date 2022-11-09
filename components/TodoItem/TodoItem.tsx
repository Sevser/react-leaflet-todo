import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Todo } from "../../types/todo/Todo";

import styles from './TodoItem.module.css';

const TodoItemPopover = (props: object) => (<Tooltip {...props}>
    Click to locate
</Tooltip>);

const TodoItem = ({ todo }: { todo: Todo }) => {
    return (<OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={TodoItemPopover}>
        <Card className={styles.card}>
            <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text>{todo.description}</Card.Text>
            </Card.Body>
        </Card>
    </OverlayTrigger>);
};

export default TodoItem;