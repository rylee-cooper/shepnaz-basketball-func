import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../shared/api';
import { message } from '../shared/Message';
import TableData from '../shared/TableData';
import { playerTableColumns } from '../../constants';
import PlayerIndexActions from './PlayerIndexActions';
import PlayerForm from './PlayerForm';
import PlayerDto from '../../DTOs/Player/PlayerDto';

class PlayerIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            showModal: false,
            selectedPlayer: null
        };

        this.columns = [
            { field: playerTableColumns.PLAYER_NAME, header: 'Name' },
            { field: playerTableColumns.JERSEY_NUMBER, header: 'Jersey Number' },
            { field: playerTableColumns.TEAM, header: 'Team' }
        ];
    }

    async componentDidMount() {
        this.getPlayers();
    }

    getPlayers = () => {
        api.getPlayers().then((result) => {
            this.setState({ players: result.players });
        }).catch(err => {
            message.error(`Error getting players: ${err.message}`);
        });
    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    addPlayer = (dto, setErrors, setSubmitting) => {
        api.addPlayer(dto).then(() => {
            this.getPlayers();
            this.hideModal();
        }).catch(err => {
            setErrors({ form: err.message });
            setSubmitting(false);
        });
    }

    handleSelection = (selection) => {
        this.props.history.push(`/Player/${selection.id}`);
    }

    render() {
        const { players, showModal } = this.state;
        return (
            <React.Fragment>
                <PlayerIndexActions handleAddPlayerClick={this.showModal} />
                <TableData data={players} columns={this.columns} handleSelection={this.handleSelection} />
                {showModal && <PlayerForm
                    showModal={showModal}
                    handleCancelClick={this.hideModal}
                    defaultPlayer={new PlayerDto()}
                    handleFormSubmit={this.addPlayer}
                    actionName="Add" />}
            </React.Fragment>
        );
    }
}

export default withRouter(PlayerIndex);