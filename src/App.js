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
                        <Route
                            path="/recommendation"
                            render={
                                () => (
                                    jwt
                                        ? <Recommendation />
                                        : <Redirect to={{
                                            pathname: "/",
                                        }} />
                                )
                            }
                        />
                        <Route
                            path="/"
                            render={
                                () => (
                                    jwt
                                        ? <Redirect to={{
                                            pathname: "/recommendation",
                                        }} />
                                        : <Questionnaire />
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
