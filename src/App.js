/*global chrome*/

import React from 'react';
import bg from './assets/bg.jpg';
import './App.css';
import Profile from './profile';

const App = (props) => {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Zip Recruiter Scrap</h1>
      </header>
      <section
        style={{
          padding: 24,
          paddingTop: 0,
          minHeight: 280
        }}
      >
        <Profile />
      </section>
    </div>
  )
}

export default App