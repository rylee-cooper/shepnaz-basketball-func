import React, { Component } from 'react';
import { message } from '../shared/Message';
import api from '../shared/api';
import { inputTypes, teamFormFieldNames, teamFormDisplayNames } from '../../constants';
import ModalForm from '../shared/ModalForm';
import TeamDto from '../../DTOs/Team/TeamDto';

class TeamForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leagues: [],
            seasons: []
        };
    }

    componentDidMount() {
        this.getLeagues();
        this.getSeasons();
    }

    getLeagues = () => {
        api.getLeagues().then((result) => {
            this.setState({ leagues: result.leagues });
        }).catch(err => {
            message.error(`Error getting leagues: ${err.message}`);
        });
    }

    getSeasons = () => {
        api.getSeasons().then((result) => {
            this.setState({ seasons: result.seasons });
        }).catch(err => {
            message.error(`Error getting seasons: ${err.message}`);
        });
    }

    handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        if (this.isValidForm(values, setErrors)) {
            this.props.handleFormSubmit(new TeamDto(values), setErrors, setSubmitting);
        } else {
            setSubmitting(false);
        }
    }

    isValidForm = (values, setErrors) => {
        if (!values.name || !values.leagueId || !values.seasonId) {
            setErrors({
                [teamFormFieldNames.TEAM_NAME]: !values[teamFormFieldNames.TEAM_NAME] ? 'Team Name is required' : '',
                [teamFormFieldNames.LEAGUE]: !values[teamFormFieldNames.LEAGUE] ? 'League is required' : '',
                [teamFormFieldNames.SEASON]: !values[teamFormFieldNames.SEASON] ? 'Season is required' : ''
            });
            return false;
        }
        return true;
    }

    render() {
        const { handleCancelClick, showModal, defaultTeam, actionName } = this.props;
        const { leagues, seasons } = this.state;

        const fields = [
            {
                displayName: teamFormDisplayNames.TEAM_NAME,
                name: teamFormFieldNames.TEAM_NAME,
                inputType: inputTypes.TEXT,
                options: [],
                initialValue: defaultTeam.id !== 0 ? defaultTeam.name : ''
            },
            {
                displayName: teamFormDisplayNames.LEAGUE,
                name: teamFormFieldNames.LEAGUE,
                inputType: inputTypes.SELECT,
                options: leagues.map(x => ({ value: x.id, label: x.description })),
                initialValue: defaultTeam.id !== 0 ? { value: defaultTeam.leagueId, label: defaultTeam.leagueDescription } : ''
            },
            {
                displayName: teamFormDisplayNames.SEASON,
                name: teamFormFieldNames.SEASON,
                inputType: inputTypes.SELECT,
                options: seasons.map(x => ({ value: x.id, label: x.description })),
                initialValue: defaultTeam.id !== 0 ? { value: defaultTeam.seasonId, label: defaultTeam.seasonDescription } : ''
            }
        ];

        return (
            <ModalForm showModal={showModal}
                handleFormSubmit={this.handleFormSubmit}
                handleCancelClick={handleCancelClick}
                modalTitle={`${actionName} Team`}
                formFields={fields}
                initialValues={defaultTeam} />
        );
    }
}

export default TeamForm;