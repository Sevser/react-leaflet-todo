import TodoList from "../TodoList";

import styles from './NavigationPanel.module.css';

const NavigationPanel = () => {
    return <div className={styles.container}>
        <div className={styles.content}>
            <TodoList />
        </div>
    </div>;
};

export default NavigationPanel;