import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Route path="/" component={Homepage} exact />
      </div>
    </Router>
  );
};

export default App;
