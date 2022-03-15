import React, { useState, useEffect, useCallback } from 'react';
import { message } from '../shared/Message';
import api from '../shared/api';
import { inputTypes, playerFieldNames, playerDisplayNames } from '../../constants';
import ModalForm from '../shared/ModalForm';
import PlayerDto from '../../DTOs/Player/PlayerDto';

const PlayerForm = (props) => {
    const { handleCancelClick, showModal, defaultPlayer, actionName } = props;

    const [leagues, setLeagues] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [teams, setTeams] = useState([]);
    const [genders, setGenders] = useState([]);
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

    const getTeams = useCallback(() => {
        api.getTeams().then((result) => {
            const teamsUnderLeagueSeason =
                result.teams.filter(x => x.leagueId === selectedLeagueId && x.seasonId === selectedSeasonId);
            setTeams(teamsUnderLeagueSeason);
        }).catch(err => {
            message.error(`Error getting teams: ${err.message}`);
        });
    }, [selectedLeagueId, selectedSeasonId]);

    const getGenders = () => {
        api.getGenders().then((result) => {
            setGenders(result.genders);
        }).catch(err => {
            message.error(`Error getting genders: ${err.message}`);
        });
    }

    const isValidForm = (values, setErrors) => {
        if (!values.name || !values.leagueId || !values.seasonId) {
            setErrors({
                [playerFieldNames.FIRST_NAME]: !values[playerFieldNames.FIRST_NAME] ? 'First Name is required' : '',
                [playerFieldNames.LAST_NAME]: !values[playerFieldNames.LAST_NAME] ? 'Last Name is required' : '',
                [playerFieldNames.JERSEY_NUMBER]: !values[playerFieldNames.JERSEY_NUMBER] ? 'Jersey Number is required' : '',
                [playerFieldNames.DOB]: !values[playerFieldNames.DOB] ? 'Date of birth is required' : '',
                [playerFieldNames.GENDER]: !values[playerFieldNames.GENDER] ? 'Gender is required' : '',
                [playerFieldNames.SEASON]: !values[playerFieldNames.SEASON] ? 'Season is required' : '',
                [playerFieldNames.LEAGUE]: !values[playerFieldNames.LEAGUE] ? 'League is required' : '',
                [playerFieldNames.TEAM]: !values[playerFieldNames.TEAM] ? 'Team is required' : ''
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
            case playerFieldNames.SEASON:
                setSelectedSeasonId(selectedValue);
                break;
            case playerFieldNames.LEAGUE:
                setSelectedLeagueId(selectedValue);
                break;
            default:
            // code block
        }
    }

    useEffect(() => {
        getSeasons();
        getLeagues();
        getGenders();

        if (selectedSeasonId !== 0 && selectedLeagueId !== 0) {
            getTeams();
        } else {
            setTeams([]);
        }
    }, [selectedSeasonId, selectedLeagueId, getTeams]);

    const fields = [
        {
            displayName: playerDisplayNames.FIRST_NAME,
            name: playerFieldNames.FIRST_NAME,
            inputType: inputTypes.TEXT,
            options: [],
            initialValue: defaultPlayer.id !== 0 ? defaultPlayer.firstName : ''
        },
        {
            displayName: playerDisplayNames.LAST_NAME,
            name: playerFieldNames.LAST_NAME,
            inputType: inputTypes.TEXT,
            options: [],
            initialValue: defaultPlayer.id !== 0 ? defaultPlayer.lastName : ''
        },
        {
            displayName: playerDisplayNames.JERSEY_NUMBER,
            name: playerFieldNames.JERSEY_NUMBER,
            inputType: inputTypes.TEXT,
            options: [],
            initialValue: defaultPlayer.id !== 0 ? defaultPlayer.jerseyNumber : ''
        },
        {
            displayName: playerDisplayNames.DOB,
            name: playerFieldNames.DOB,
            inputType: inputTypes.DATE,
            options: [],
            initialValue: defaultPlayer.id !== 0 ? defaultPlayer.dateOfBirth : ''
        },
        {
            displayName: playerDisplayNames.GENDER,
            name: playerFieldNames.GENDER,
            inputType: inputTypes.SELECT,
            options: genders.map(x => ({ value: x.id, label: x.description })),
            initialValue: defaultPlayer.id !== 0 ? defaultPlayer.gender : ''
        },
        {
            displayName: playerDisplayNames.SEASON,
            name: playerFieldNames.SEASON,
            inputType: inputTypes.SELECT,
            options: seasons.map(x => ({ value: x.id, label: x.description })),
            initialValue: defaultPlayer.id !== 0 ? { value: defaultPlayer.seasonId, label: defaultPlayer.seasonDescription } : ''
        },
        {
            displayName: playerDisplayNames.LEAGUE,
            name: playerFieldNames.LEAGUE,
            inputType: inputTypes.SELECT,
            options: leagues.map(x => ({ value: x.id, label: x.description })),
            initialValue: defaultPlayer.id !== 0 ? { value: defaultPlayer.leagueId, label: defaultPlayer.leagueDescription } : ''
        },
        {
            displayName: playerDisplayNames.TEAM,
            name: playerFieldNames.TEAM,
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