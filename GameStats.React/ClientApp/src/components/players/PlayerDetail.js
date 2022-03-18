import React, { useState, useEffect, useCallback } from 'react';
import api from '../shared/api';
import DetailCard from '../shared/DetailCard';
import { message } from '../shared/Message';
import { playerDisplayNames } from '../../constants';
import PlayerForm from './PlayerForm';

const PlayerDetail = (props) => {
    const [player, setPlayer] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { id } = props.match.params;
    
    const getPlayer = useCallback(() => {
        api.getPlayer(id).then((result) => {
            setPlayer(result);
        }).catch(err => {
            message.error(`Error getting player: ${err.message}`);
        });
    }, [id]);
    
    const toggleModalDisplay = () => {
        setShowModal(!showModal);
    }

    const editPlayer = (dto, setErrors, setSubmitting) => {
        api.editPlayer(dto).then(() => {
            getPlayer();
            toggleModalDisplay();
        }).catch(err => {
            setErrors({ form: err.message });
            setSubmitting(false);
        });
    }

    const textDetails = [
        `${playerDisplayNames.TEAM}: ${player.teamName}`,
        `${playerDisplayNames.JERSEY_NUMBER}: ${player.jerseyNumber}`,
        `${playerDisplayNames.GENDER}: ${player.gender}`,
        `${playerDisplayNames.DOB}: ${player.dateOfBirth}`
    ];

    useEffect(() => {
        getPlayer();
    }, [getPlayer]);

    return (
        <React.Fragment>
            <DetailCard
                title={player.name}
                textDetails={textDetails}
                toggleModalDisplay={toggleModalDisplay}
                editButtonText="Edit Player"
            />

            {showModal && <PlayerForm
                showModal={showModal}
                handleCancelClick={toggleModalDisplay}
                handleFormSubmit={editPlayer}
                defaultPlayer={player}
                actionName="Edit" />}
        </React.Fragment>
    );
}

export default PlayerDetail;