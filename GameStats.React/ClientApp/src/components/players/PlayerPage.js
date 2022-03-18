import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayerIndex from './PlayerIndex';
import PlayerDetail from './PlayerDetail';

const PlayerPage = (props) => {
    const { match } = props;
    return (
        <Switch>
            <Route path={`${match.url}`} exact component={PlayerIndex} />
            <Route path={`${match.url}/:id([0-9]*)`} exact component={PlayerDetail} />
        </Switch>);
}

export default PlayerPage;