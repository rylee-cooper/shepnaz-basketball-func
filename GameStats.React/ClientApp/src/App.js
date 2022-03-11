import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Dashboard from './components/dashboard/Dashboard';
import TeamPage from './components/teams/TeamPage';
import PlayerPage from './components/players/PlayerPage';
import LeaguePage from './components/leagues/LeaguePage';
import CoachPage from './components/coaches/CoachPage';
import SeasonPage from './components/seasons/SeasonPage';

const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={Dashboard} />
            <Route path='/Team' component={TeamPage} />
            <Route path='/Player' component={PlayerPage} />
            <Route path='/League' component={LeaguePage} />
            <Route path='/Coach' component={CoachPage} />
            <Route path='/Season' component={SeasonPage} />
        </Layout>
    );
}

export default App;
