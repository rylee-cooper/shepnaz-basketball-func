import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TeamIndex from './TeamIndex';
import TeamDetail from './TeamDetail';

const TeamPage = (props) => {
    const { match } = props;
    return (
        <Switch>
            <Route path={`${match.url}`} exact component={TeamIndex} />
            <Route path={`${match.url}/:id([0-9]*)`} exact component={TeamDetail} />
        </Switch>
    );
}

export default TeamPage;