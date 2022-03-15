import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

const DetailCard = (props) => {
    const { title, textDetails, toggleModalDisplay, editButtonText } = props;
    return (
        <Card className="basic-card">
            <Card.Body className="p-4 d-flex justify-content-between">
                <Container>
                    <Row>
                        <Col>
                            <Card.Title as="h2">{title}</Card.Title>
                            {textDetails.map(text => <Card.Text>{text}</Card.Text>)}
                        </Col>
                        <Col className="d-flex flex-row-reverse">
                            <div>
                                <Button variant="secondary" size="lg" className="create-btn" onClick={toggleModalDisplay}>{editButtonText}</Button>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </Card.Body>
        </Card>
    );
}

export default DetailCard;