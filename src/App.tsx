import './App.css';
import AddTeamForm from './components/AddTeamForm';

import { Players } from './components/Players';
import React, { FC } from 'react';
import { TeamsTable } from './components/TeamsTable';

export const App: FC = () => {
  return (
    <div className="App">
      <div className="wrapper">
      <h1 className="title">
        NBA profile
      </h1>
      <h4 className="title-small">
        Teams
      </h4>
      <AddTeamForm />
      <TeamsTable />
      <h4 className="title-small">
        Players
      </h4>
      <Players />
      </div>
    </div>
  );
};
