import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../shared/api';
import { message } from '../shared/Message';
import TableData from '../shared/TableData';
import { teamFieldNames, teamDisplayNames } from '../../constants';
import TeamIndexActions from './TeamIndexActions';
import TeamForm from './TeamForm';
import TeamDto from '../../DTOs/Team/TeamDto';

const TeamIndex = (props) => {
    const columns = [
        { field: teamFieldNames.TEAM_NAME, header: teamDisplayNames.TEAM },
        { field: teamFieldNames.LEAGUE_DESCRIPTION, header: teamDisplayNames.LEAGUE },
        { field: teamFieldNames.SEASON_DESCRIPTION, header: teamDisplayNames.SEASON }
    ];
    const { history } = props;
    const [teams, setTeams] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const getTeams = () => {
        api.getTeams().then((result) => {
            setTeams(result.teams);
        }).catch(err => {
            message.error(`Error getting teams: ${err.message}`);
        });
    }

    const displayModal = () => {
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
    }

    const addTeam = (dto, setErrors, setSubmitting) => {
        api.addTeam(dto).then(() => {
            getTeams();
            hideModal();
        }).catch(err => {
            setErrors({ form: err.message });
            setSubmitting(false);
        });
    }

    const handleSelection = (selection) => {
        history.push(`/Team/${selection.id}`);
    }

    useEffect(() => {
        getTeams();
        return () => {
            setTeams([]);
        }
    }, []);

    return (
        <React.Fragment>
            <TeamIndexActions handleAddTeamClick={displayModal} />
            <TableData data={teams} columns={columns} handleSelection={handleSelection} />
            {showModal && <TeamForm
                showModal={showModal}
                handleCancelClick={hideModal}
                defaultTeam={new TeamDto()}
                handleFormSubmit={addTeam}
                actionName="Add" />}
        </React.Fragment>
    );
}

export default withRouter(TeamIndex);