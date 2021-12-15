import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayerIndex from './PlayerIndex';

const PlayerPage = (props) => {
    const { match } = props;
    return (
        <Switch>
            <Route path={`${match.url}`} exact component={PlayerIndex} />
        </Switch>);
}

export default PlayerPage;