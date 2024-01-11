import React from 'react';
import './App.css';
import WeeklyView from './components/Calendar/WeeklyView';
import CreateEvent from './components/EventForm/CreateEvent';
import ManageClient from './components/ClientForm/ManageClient';

function App() {
  return (
    <div className="App">
      <header>
        <CreateEvent />
        <ManageClient />
        <WeeklyView />
      </header>
    </div>
  );
}

export default App;
