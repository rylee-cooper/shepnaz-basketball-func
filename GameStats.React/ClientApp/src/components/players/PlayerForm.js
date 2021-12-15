import React, { Component } from 'react';
import { message } from '../shared/Message';
import api from '../shared/api';
import { inputTypes, playerFormFieldNames, playerFormDisplayNames } from '../../constants';
import ModalForm from '../shared/ModalForm';
import PlayerDto from '../../DTOs/Player/PlayerDto';

class PlayerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allTeams: [],
            selectedSeasonId: 0,
            selectedLeagueId: 0,
            teamOptions: [],
            leagueOptions: []
        };
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams = () => {
        api.getTeams().then((result) => {
            this.setState({ allTeams: result.teams });
        }).catch(err => {
            message.error(`Error getting teams: ${err.message}`);
        });
    }

    getSeasonOptions = () => {
        const { allTeams } = this.state;
        const seasons = allTeams.map(x => ({ value: x.seasonId, label: x.seasonDescription }));
        return this.getUnique(seasons);
    }

    getLeagueOptions = (seasonId) => {
        const { allTeams } = this.state;
        const leagues = allTeams
            .filter(x => x.seasonId === seasonId)
            .map(x => ({ value: x.leagueId, label: x.leagueDescription }));
        this.setState({ leagueOptions: this.getUnique(leagues), selectedSeasonId: seasonId });
    }

    getTeamOptions = (leagueId) => {
        const { allTeams, selectedSeasonId } = this.state;
        const teams = allTeams
            .filter(x => x.leagueId === leagueId && x.seasonId == selectedSeasonId)
            .map(x => ({ value: x.teamId, label: x.name }));
        this.setState({ teamOptions: this.getUnique(teams), selectedLeagueId: leagueId });
    }

    getUnique = (array) => {
        const uniqueSet = new Set(array.map(JSON.stringify));
        return Array.from(uniqueSet).map(JSON.parse);
    }

    handleFormSubmit = (values, { setSubmitting, setErrors }) => {
        if (this.isValidForm(values, setErrors)) {
            this.props.handleFormSubmit(new PlayerDto(values), setErrors, setSubmitting);
        } else {
            setSubmitting(false);
        }
    }

    handleSelection = (selectedValue, fieldName) => {
        switch (fieldName) {
            case playerFormFieldNames.SEASON:
                this.getLeagueOptions(selectedValue);
                break;
            case playerFormFieldNames.LEAGUE:
                this.getTeamOptions(selectedValue);
                break;
            default:
            // code block
        }
    }

    isValidForm = (values, setErrors) => {
        if (!values.name || !values.leagueId || !values.seasonId) {
            setErrors({
                [playerFormFieldNames.FIRST_NAME]: !values[playerFormFieldNames.FIRST_NAME] ? 'First Name is required' : '',
                [playerFormFieldNames.LAST_NAME]: !values[playerFormFieldNames.LAST_NAME] ? 'Last Name is required' : '',
                [playerFormFieldNames.JERSEY_NUMBER]: !values[playerFormFieldNames.JERSEY_NUMBER] ? 'Jersey Number is required' : '',
                [playerFormFieldNames.TEAM]: !values[playerFormFieldNames.TEAM] ? 'Team is required' : ''
            });
            return false;
        }
        return true;
    }

    render() {
        const { handleCancelClick, showModal, defaultPlayer, actionName } = this.props;
        const { teamOptions, leagueOptions } = this.state;

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
                options: this.getSeasonOptions(),
                initialValue: defaultPlayer.id !== 0 ? { value: defaultPlayer.seasonId, label: defaultPlayer.seasonDescription } : ''
            },
            {
                displayName: playerFormDisplayNames.LEAGUE,
                name: playerFormFieldNames.LEAGUE,
                inputType: inputTypes.SELECT,
                options: leagueOptions,
                initialValue: defaultPlayer.id !== 0 ? { value: defaultPlayer.leagueId, label: defaultPlayer.leagueDescription } : '',
                isHidden: leagueOptions.length === 0
            },
            {
                displayName: playerFormDisplayNames.TEAM,
                name: playerFormFieldNames.TEAM,
                inputType: inputTypes.SELECT,
                options: teamOptions,
                initialValue: defaultPlayer.id !== 0 ? { value: defaultPlayer.teamId, label: defaultPlayer.teamName } : '',
                isHidden: teamOptions.length === 0
            },
        ];

        return (
            <ModalForm showModal={showModal}
                handleFormSubmit={this.handleFormSubmit}
                handleCancelClick={handleCancelClick}
                handleSelection={this.handleSelection}
                modalTitle={`${actionName} Player`}
                formFields={fields}
                initialValues={defaultPlayer} />
        );
    }
}

export default PlayerForm;