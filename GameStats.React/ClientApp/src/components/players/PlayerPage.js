import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayerIndex from './PlayerIndex';

class PlayerPage extends Component {

    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Route path={`${match.url}`} exact component={PlayerIndex} />
            </Switch>
        );
    }
}

export default PlayerPage;