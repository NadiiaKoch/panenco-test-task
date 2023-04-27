import React, { FC } from 'react';
import { Players } from './Blocks/Players/Players';
import { TeamsTable } from './Blocks/TeamsTable/TeamsTable';
import AddTeamForm from './Blocks/AddTeamForm/AddTeamForm';
import './App.css';

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
