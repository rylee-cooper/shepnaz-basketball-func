import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../shared/api';
import { message } from '../shared/Message';
import TableData from '../shared/TableData';
import { teamTableColumns } from '../../constants';
import TeamIndexActions from './TeamIndexActions';
import TeamForm from './TeamForm';
import TeamDto from '../../DTOs/Team/TeamDto';

class TeamIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            showModal: false,
            selectedTeam: null
        };

        this.columns = [
            { field: teamTableColumns.TEAM_NAME, header: 'Team' },
            { field: teamTableColumns.LEAGUE_DESCRIPTION, header: 'League' },
            { field: teamTableColumns.SEASON_DESCRIPTION, header: 'Season' }
        ];
    }

    async componentDidMount() {
        this.getTeams();
    }

    getTeams = () => {
        api.getTeams().then((result) => {
            this.setState({ teams: result.teams });
        }).catch(err => {
            message.error(`Error getting teams: ${err.message}`);
        });
    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }
    
    addTeam = (dto, setErrors, setSubmitting) => {
        api.addTeam(dto).then(() => {
            this.getTeams();
            this.hideModal();
        }).catch(err => {
            setErrors({ form: err.message });
            setSubmitting(false);
        });
    }

    handleSelection = (selection) => {
        this.props.history.push(`/Team/${selection.id}`);
    }

    render() {
        const { teams, showModal } = this.state;
        return (
            <React.Fragment>
                <TeamIndexActions handleAddTeamClick={this.showModal} />
                <TableData data={teams} columns={this.columns} handleSelection={this.handleSelection} />
                {showModal && <TeamForm
                    showModal={showModal}
                    handleCancelClick={this.hideModal}
                    defaultTeam={new TeamDto()}
                    handleFormSubmit={this.addTeam}
                    actionName="Add" />}
            </React.Fragment>
        );
    }
}

export default withRouter(TeamIndex);