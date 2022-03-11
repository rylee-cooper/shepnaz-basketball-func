import React, { useState, useEffect } from 'react';
import { message } from '../shared/Message';
import api from '../shared/api';
import { inputTypes, playerFormFieldNames, playerFormDisplayNames } from '../../constants';
import ModalForm from '../shared/ModalForm';
import PlayerDto from '../../DTOs/Player/PlayerDto';

const PlayerForm = (props) => {
    const { handleCancelClick, showModal, defaultPlayer, actionName } = props;

    const [leagues, setLeagues] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedSeasonId, setSelectedSeasonId] = useState(0);
    const [selectedLeagueId, setSelectedLeagueId] = useState(0);

    const getSeasons = () => {
        api.getSeasons().then((result) => {
            setSeasons(result.seasons);
        }).catch(err => {
            message.error(`Error getting seasons: ${err.message}`);
        });
    }
    const getLeagues = () => {
        api.getLeagues().then((result) => {
            setLeagues(result.leagues);
        }).catch(err => {
            message.error(`Error getting leagues: ${err.message}`);
        });
    }

    const getTeams = () => {
        api.getTeams().then((result) => {
            const teamsUnderLeagueSeason =
                result.teams.filter(x => x.leagueId === selectedLeagueId && x.seasonId === selectedSeasonId);
            setTeams(teamsUnderLeagueSeason);
        }).catch(err => {
            message.error(`Error getting teams: ${err.message}`);
        });
    }

    const isValidForm = (values, setErrors) => {
        if (!values.name || !values.leagueId || !values.seasonId) {
            setErrors({
                [playerFormFieldNames.FIRST_NAME]: !values[playerFormFieldNames.FIRST_NAME] ? 'First Name is required' : '',
                [playerFormFieldNames.LAST_NAME]: !values[playerFormFieldNames.LAST_NAME] ? 'Last Name is required' : '',
                [playerFormFieldNames.JERSEY_NUMBER]: !values[playerFormFieldNames.JERSEY_NUMBER] ? 'Jersey Number is required' : '',
                [playerFormFieldNames.SEASON]: !values[playerFormFieldNames.SEASON] ? 'Season is required' : '',
                [playerFormFieldNames.LEAGUE]: !values[playerFormFieldNames.LEAGUE] ? 'League is required' : '',
                [playerFormFieldNames.TEAM]: !values[playerFormFieldNames.TEAM] ? 'Team is required' : ''
            });
            return false;
        }
        return true;
    }

    const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        if (isValidForm(values, setErrors)) {
            props.handleFormSubmit(new PlayerDto(values), setErrors, setSubmitting);
        } else {
            setSubmitting(false);
        }
    }

    const handleSelection = (selectedValue, fieldName) => {
        switch (fieldName) {
        case playerFormFieldNames.SEASON:
            setSelectedSeasonId(selectedValue);
            break;
        case playerFormFieldNames.LEAGUE:
            setSelectedLeagueId(selectedValue);
            break;
        default:
            // code block
        }
    }

    useEffect(() => {
        getSeasons();
        getLeagues();

        if (selectedSeasonId !== 0 && selectedLeagueId !== 0) {
            getTeams();
        } else {
            setTeams([]);
        }
    }, [selectedSeasonId, selectedLeagueId]);

    const fields = [
        {
            displayName: playerFormDisplayNames.FIRST_NAME,
            name: playerFormFieldNames.FIRST_NAME,
            inputType: inputTypes.TEXT,
            options: [],
            initialValue: defaultPlayer.id !== 0 ? defaultPlayer.firstName : '',
        },
        {
            displayName: playerFormDisplayNames.LAST_NAME,
            name: playerFormFieldNames.LAST_NAME,
            inputType: inputTypes.TEXT,
            options: [],
            initialValue: defaultPlayer.id !== 0 ? defaultPlayer.lastName : ''
        },
        {
            displayName: playerFormDisplayNames.JERSEY_NUMBER,
            name: playerFormFieldNames.JERSEY_NUMBER,
            inputType: inputTypes.TEXT,
            options: [],
            initialValue: defaultPlayer.id !== 0 ? defaultPlayer.jerseyNumber : ''
        },
        {
            displayName: playerFormDisplayNames.SEASON,
            name: playerFormFieldNames.SEASON,
            inputType: inputTypes.SELECT,
            options: seasons.map(x => ({ value: x.id, label: x.description })),
            initialValue: defaultPlayer.id !== 0 ? { value: defaultPlayer.seasonId, label: defaultPlayer.seasonDescription } : ''
        },
        {
            displayName: playerFormDisplayNames.LEAGUE,
            name: playerFormFieldNames.LEAGUE,
            inputType: inputTypes.SELECT,
            options: leagues.map(x => ({ value: x.id, label: x.description })),
            initialValue: defaultPlayer.id !== 0 ? { value: defaultPlayer.leagueId, label: defaultPlayer.leagueDescription } : ''
        },
        {
            displayName: playerFormDisplayNames.TEAM,
            name: playerFormFieldNames.TEAM,
            inputType: inputTypes.SELECT,
            options: teams.map(x => ({ value: x.id, label: x.name })),
            initialValue: defaultPlayer.id !== 0 ? { value: defaultPlayer.teamId, label: defaultPlayer.teamName } : '',
            noOptionsMessage: 'No teams found for selected league and season'
        }
    ];

    return (
        <ModalForm showModal={showModal}
            handleFormSubmit={handleFormSubmit}
            handleCancelClick={handleCancelClick}
            modalTitle={`${actionName} Player`}
            formFields={fields}
            initialValues={defaultPlayer}
            handleSelection={handleSelection} />
    );
}

export default PlayerForm;