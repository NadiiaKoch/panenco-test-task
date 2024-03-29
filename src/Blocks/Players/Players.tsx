import React, {
  memo,
  useEffect,
  useState,
} from 'react';
import { Grid } from '@mui/material';
import { getPlayers } from '../../API/loadData';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { Player } from '../../types/Players';
import './Players.css';


export const Players: React.FC = memo(() => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const perPage = 8;
  const currentPage = 1;

  const loadPlayers = async (perPage: number, currentPage: number) => {
    setIsLoading(true);
    try {
      const players = await getPlayers(currentPage, perPage);
      console.log(players);

      setPlayers(players.data);
      setTotal(players.meta.total_count);
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers(perPage, currentPage);
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
        </div>
      )}
      <div className="players-pg">
        <Pagination total={total} countPerPage={perPage} optionsPerPage={optionsPerPage} onLoad={loadPlayers} />
      </div>
    </>
  );
});
