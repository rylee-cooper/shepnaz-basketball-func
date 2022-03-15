import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../shared/api';
import { message } from '../shared/Message';
import TableData from '../shared/TableData';
import { playerFieldNames, playerDisplayNames } from '../../constants';
import PlayerIndexActions from './PlayerIndexActions';
import PlayerForm from './PlayerForm';
import PlayerDto from '../../DTOs/Player/PlayerDto';

const PlayerIndex = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [players, setPlayers] = useState([]);
    
    const columns = [
        { field: playerFieldNames.PLAYER_NAME, header: playerDisplayNames.PLAYER_NAME },
        { field: playerFieldNames.JERSEY_NUMBER, header: playerDisplayNames.JERSEY_NUMBER },
        { field: playerFieldNames.TEAM_NAME, header: playerDisplayNames.TEAM }
    ];

    const getPlayers = () => {
        api.getPlayers().then((result) => {
            setPlayers(result.players);
        }).catch(err => {
            message.error(`Error getting players: ${err.message}`);
        });
    }

    const toggleModalDisplay = () => {
        setShowModal(!showModal);
    }

    const addPlayer = (dto, setErrors, setSubmitting) => {
        api.addPlayer(dto).then(() => {
            getPlayers();
            toggleModalDisplay();
        }).catch(err => {
            setErrors({ form: err.message });
            setSubmitting(false);
        });
    }

    const handleSelection = (selection) => {
        props.history.push(`/Player/${selection.id}`);
    }

    useEffect(() => {
        getPlayers();
    }, []);

    return (
        <React.Fragment>
            <PlayerIndexActions handleAddPlayerClick={toggleModalDisplay} />
            <TableData data={players} columns={columns} handleSelection={handleSelection} />
            {showModal && <PlayerForm
                showModal={showModal}
                handleCancelClick={toggleModalDisplay}
                defaultPlayer={new PlayerDto()}
                handleFormSubmit={addPlayer}
                actionName="Add" />}
        </React.Fragment>
    );
}

export default withRouter(PlayerIndex);