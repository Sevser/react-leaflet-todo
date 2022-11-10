import HelpPanel from "../HelpPanel";
import TodoList from "../TodoList";

import styles from './NavigationPanel.module.css';

const NavigationPanel = () => {
    return <div className={styles.container}>
        <div className={styles.content}>
            <HelpPanel />
            <TodoList />
        </div>
    </div>;
};

export default NavigationPanel;