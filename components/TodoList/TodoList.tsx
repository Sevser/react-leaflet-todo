import { useEffect, useState } from "react";
import { useMobxStores } from "../../store/StoreContext";
import { observer } from 'mobx-react';
import TodoItem from '../TodoItem';
import { Todo } from "../../types/todo/Todo";

const TodoList = observer(() => {
    const store = useMobxStores();
    const [mounted, updateMounted] = useState<boolean>(false);

    useEffect(() => {
        updateMounted(() => true);
    });

    return (<div>
        {mounted && store.todos.list.map(item => <TodoItem key={item.id} todo={item as Todo} />)}
    </div>);
});

export default TodoList;