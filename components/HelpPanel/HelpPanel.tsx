import { Card } from 'react-bootstrap';

const HelpPanel = () => {
    return (<Card style={{ 'margin-bottom': '1rem' }}>
        <Card.Body>
            <Card.Text>
                To Create todo click on Map with Right mouse button.
            </Card.Text>
        </Card.Body>
    </Card>)
};

export default HelpPanel;