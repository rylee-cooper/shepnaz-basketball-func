import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TeamIndex from './TeamIndex';
import TeamDetail from './TeamDetail';

class TeamPage extends Component {
    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Route path={`${match.url}`} exact component={TeamIndex} />
                <Route path={`${match.url}/:id([0-9]*)`} exact component={TeamDetail} />
            </Switch>
        );
    }
}

export default TeamPage;