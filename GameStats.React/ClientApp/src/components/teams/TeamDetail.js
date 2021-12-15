import React, { Component } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../shared/api';
import { message } from '../shared/Message';
import TeamForm from './TeamForm';

class TeamDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team: {},
            showModal: false
        };

        this.columns = [
            { field: 'name', header: 'Name' },
            { field: 'jerseyNumber', header: 'Jersey Number' },
            { field: 'gender', header: 'Gender' }
        ];
    }

    componentDidMount() {
        this.getTeam();
    }

    getTeam = () => {
        const { id } = this.props.match.params;

        api.getTeam(id).then((result) => {
            this.setState({ team: result });
        }).catch(err => {
            message.error(`Error getting team: ${err.message}`);
        });
    }

    getCoachDisplay = (coaches) => {
        return coaches && coaches.length > 0
            ? `${coaches.map(coach => coach.name).join(', ')}`
            : 'Unassigned';
    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    editTeam = (dto, setErrors, setSubmitting) => {
        api.editTeam(dto).then(() => {
            this.getTeam();
            this.hideModal();
        }).catch(err => {
            setErrors({ form: err.message });
            setSubmitting(false);
        });
    }

    render() {
        const { team, showModal } = this.state;
        return (
            <React.Fragment>
                <Card className="basic-card">
                    <Card.Body className="p-4 d-flex justify-content-between">
                        <Container>
                            <Row>
                                <Col>
                                    <Card.Title as="h2">{team.name}</Card.Title>
                                    <Card.Text>League: {team.leagueDescription}</Card.Text>
                                    <Card.Text>{team.seasonDescription}</Card.Text>
                                    <Card.Text>Coach: {this.getCoachDisplay(team.coaches)}</Card.Text>
                                </Col>
                                <Col className="d-flex flex-row-reverse">
                                    <div>
                                        <Button variant="secondary" size="lg" className="create-btn" onClick={this.showModal}>Edit Team</Button>
                                    </div>
                                </Col>
                            </Row>

                        </Container>
                    </Card.Body>
                </Card>
                <div className="mt-5">
                    <h4 className="pl-3">Players</h4>
                    <DataTable
                        value={team.players}
                        responsiveLayout="scroll"
                        stripedRows
                    >
                        {this.columns.map(x =>
                            <Column field={x.field} key={x.field} header={x.header}></Column>
                        )}
                    </DataTable>
                </div>

                {showModal && <TeamForm
                    showModal={showModal}
                    handleCancelClick={this.hideModal}
                    handleFormSubmit={this.editTeam}
                    defaultTeam={team}
                    actionName="Edit" />}
            </React.Fragment>
        );
    }
}

export default TeamDetail;