import React, { useState, useEffect, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../shared/api';
import DetailCard from '../shared/DetailCard';
import { message } from '../shared/Message';
import { playerFieldNames, playerDisplayNames, teamDisplayNames } from '../../constants';
import TeamForm from './TeamForm';

const TeamDetail = (props) => {
    const [team, setTeam] = useState({});
    const [players, setPlayers] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { id } = props.match.params;

    const getTeam = useCallback(() => {
        api.getTeam(id).then((result) => {
            setTeam(result);
        }).catch(err => {
            message.error(`Error getting team: ${err.message}`);
        });
    }, [id]);

    const getPlayers = useCallback(() => {
        api.getPlayersByTeam(id).then((result) => {
            setPlayers(result.players);
        }).catch(err => {
            message.error(`Error getting players: ${err.message}`);
        });
    }, [id]);

    const getCoaches = useCallback(() => {
        api.getCoachesByTeam(id).then((result) => {
            setCoaches(result.coaches);
        }).catch(err => {
            message.error(`Error getting coaches: ${err.message}`);
        });
    }, [id]);

    const getCoachDisplay = (coaches) => {
        return coaches && coaches.length > 0
            ? `${coaches.map(coach => coach.name).join(', ')}`
            : 'Unassigned';
    }

    const toggleModalDisplay = () => {
        setShowModal(!showModal);
    }

    const editTeam = (dto, setErrors, setSubmitting) => {
        api.editTeam(dto).then(() => {
            getTeam();
            toggleModalDisplay();
        }).catch(err => {
            setErrors({ form: err.message });
            setSubmitting(false);
        });
    }

    const columns = [
        { field: playerFieldNames.PLAYER_NAME, header: playerDisplayNames.PLAYER_NAME },
        { field: playerFieldNames.JERSEY_NUMBER, header: playerDisplayNames.JERSEY_NUMBER },
        { field: playerFieldNames.GENDER, header: playerDisplayNames.GENDER }
    ];

    const textDetails = [
        `${teamDisplayNames.LEAGUE}: ${team.leagueDescription}`,
        `${teamDisplayNames.SEASON}: ${team.seasonDescription}`,
        `${teamDisplayNames.COACHES}: ${getCoachDisplay(coaches)}`
    ];

    useEffect(() => {
        getTeam();
        getPlayers();
        getCoaches();
    }, [getTeam, getPlayers, getCoaches]);

    return (
        <React.Fragment>
            <DetailCard
                title={team.name}
                textDetails={textDetails}
                toggleModalDisplay={toggleModalDisplay}
                editButtonText="Edit Team"
            />
            <div className="mt-5">
                <h4 className="pl-3">Players</h4>
                <DataTable
                    value={players}
                    responsiveLayout="scroll"
                    stripedRows
                >
                    {columns.map(x =>
                        <Column field={x.field} key={x.field} header={x.header}></Column>
                    )}
                </DataTable>
            </div>

            {showModal && <TeamForm
                showModal={showModal}
                handleCancelClick={toggleModalDisplay}
                handleFormSubmit={editTeam}
                defaultTeam={team}
                actionName="Edit" />}
        </React.Fragment>
    );
}

export default TeamDetail;