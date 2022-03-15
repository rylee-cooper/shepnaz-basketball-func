import React, { useState, useEffect } from 'react';
import { message } from '../shared/Message';
import api from '../shared/api';
import { inputTypes, teamFieldNames, teamDisplayNames } from '../../constants';
import ModalForm from '../shared/ModalForm';
import TeamDto from '../../DTOs/Team/TeamDto';

const TeamForm = (props) => {
    const { handleCancelClick, showModal, defaultTeam, actionName } = props;

    const [leagues, setLeagues] = useState([]);
    const [seasons, setSeasons] = useState([]);
    
    const getLeagues = () => {
        api.getLeagues().then((result) => {
            setLeagues(result.leagues);
        }).catch(err => {
            message.error(`Error getting leagues: ${err.message}`);
        });
    }

    const getSeasons = () => {
        api.getSeasons().then((result) => {
            setSeasons(result.seasons);
        }).catch(err => {
            message.error(`Error getting seasons: ${err.message}`);
        });
    }

    const isValidForm = (values, setErrors) => {
        if (!values.name || !values.leagueId || !values.seasonId) {
            setErrors({
                [teamFieldNames.TEAM]: !values[teamFieldNames.TEAM] ? 'Team Name is required' : '',
                [teamFieldNames.LEAGUE]: !values[teamFieldNames.LEAGUE] ? 'League is required' : '',
                [teamFieldNames.SEASON]: !values[teamFieldNames.SEASON] ? 'Season is required' : ''
            });
            return false;
        }
        return true;
    }

    const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        if (isValidForm(values, setErrors)) {
            props.handleFormSubmit(new TeamDto(values), setErrors, setSubmitting);
        } else {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        getLeagues();
        getSeasons();
    }, []);

    const fields = [
        {
            displayName: teamDisplayNames.TEAM,
            name: teamFieldNames.TEAM,
            inputType: inputTypes.TEXT,
            options: [],
            initialValue: defaultTeam.id !== 0 ? defaultTeam.name : ''
        },
        {
            displayName: teamDisplayNames.SEASON,
            name: teamFieldNames.SEASON,
            inputType: inputTypes.SELECT,
            options: seasons.map(x => ({ value: x.id, label: x.description })),
            initialValue: defaultTeam.id !== 0 ? { value: defaultTeam.seasonId, label: defaultTeam.seasonDescription } : ''
        },
        {
            displayName: teamDisplayNames.LEAGUE,
            name: teamFieldNames.LEAGUE,
            inputType: inputTypes.SELECT,
            options: leagues.map(x => ({ value: x.id, label: x.description })),
            initialValue: defaultTeam.id !== 0 ? { value: defaultTeam.leagueId, label: defaultTeam.leagueDescription } : ''
        }
    ];

    return (
        <ModalForm showModal={showModal}
            handleFormSubmit={handleFormSubmit}
            handleCancelClick={handleCancelClick}
            modalTitle={`${actionName} Team`}
            formFields={fields}
            initialValues={defaultTeam} />
    );

}

export default TeamForm;