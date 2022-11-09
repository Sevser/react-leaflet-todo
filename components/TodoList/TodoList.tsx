import { isObservable, toJS } from "mobx";
import { useEffect, useState } from "react";
import { useMobxStores } from "../../store/storeContext";
import { observer, inject } from 'mobx-react';
import TodoItem from "../TodoItem/index.ts";



const TodoList = observer(() => {
    const store = useMobxStores();
    const [mounted, updateMounted] = useState<boolean>(false);
    
    useEffect(() => {
        updateMounted(() => true);
    });

    return (<div>
        {mounted && store.todos.list.map(item => <TodoItem key={item.id} todo={item} />)}
    </div>);
});

export default TodoList;