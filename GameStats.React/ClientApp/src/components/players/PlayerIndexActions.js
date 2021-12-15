import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import IndexActions from '../shared/IndexActions';

class PlayerIndexActions extends Component {

    render() {
        const { handleAddPlayerClick } = this.props;
        return (
            <IndexActions>
                <Row>
                    <Col>
                        <ButtonToolbar className="d-flex justify-content-end">
                            <Button variant="secondary" size="lg" className="create-btn" onClick={handleAddPlayerClick}>Add Player</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </IndexActions>
        );
    }
}

export default withRouter(PlayerIndexActions);