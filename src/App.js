import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/SiteLayout';
import Questionnaire from './components/Questionnaire';
import Recommendation from './components/Recommendation';

import './App.css';

function App() {
    const jwt = localStorage.jwt;    

    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/questionnaire">
                            <Questionnaire />
                        </Route>
                        <Route
                            path="/recommendation"
                            render={
                                ({ location }) => (
                                    jwt
                                        ? <Recommendation />
                                        : <Redirect to={{
                                            pathname: "/questionnaire",
                                            state: { from: location },
                                        }} />
                                )
                            }
                        />
                        <Route
                            path="/"
                            render={
                                ({ location }) => (
                                    jwt
                                        ? <Recommendation />
                                        : <Redirect to={{
                                            pathname: "/questionnaire",
                                            state: { from: location },
                                        }} />
                                )
                            }
                        />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
