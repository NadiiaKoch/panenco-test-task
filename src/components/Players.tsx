import React, {
  memo,
  useEffect,
  useState,
} from 'react';

import { getPlayers } from '../API/loadData';
import { Player } from '../types/Player';
import { PlayerCard } from './PlayerCard';
import { Pagination } from './Pagination';
import { Grid } from '@mui/material';
import { Loader } from './Loader';
import './Players.css';


export const Players: React.FC = memo(() => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const perPage = 8;
  const currentPage = 1;

  const loadPlayers = async () => {
    setIsLoading(true);
    try {
      const players = await getPlayers(currentPage, perPage);
      console.log(players);

      setPlayers(players.data);
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const optionsPerPage = [8, 16, 32];


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='players-wrapper'>
          <Grid container spacing={3}>
            {players.map((player) => (
              <Grid item xs={3}>
                <PlayerCard player={player} />
              </Grid>
            ))}
          </Grid>
          <div className="players-pg">
            <Pagination setData={setPlayers} path="players" countPerPage={perPage} optionsPerPage={optionsPerPage} />
          </div>
        </div>
      )}
    </>
  );
});
