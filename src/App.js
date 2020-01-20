import React from 'react';
import Layout from './components/SiteLayout';
import Questionnaire from './components/Questionnaire';

import './App.css';

function App() {
  return (
    <div className="App">
        <Layout>
            <Questionnaire />
        </Layout>
    </div>
  );
}

export default App;
