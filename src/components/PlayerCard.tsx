import React, { FC } from 'react';
import { Player } from '../types/Player';
import { Avatar, Card, CardHeader } from '@mui/material';
import { purple } from '@mui/material/colors';


type Props = {
  player: Player,
};

export const PlayerCard: FC<Props> = ({
  player,
}) => {
  return (
    <Card sx={{height: 80, borderRadius: 5}}>
      {/* <div className="icon">{`${player.first_name[0]}${player.last_name[0]}`}</div> */}
      <CardHeader
        avatar={
        <Avatar sx={{ bgcolor: purple[100], color: purple[900] }}>
          {`${player.first_name[0]}${player.last_name[0]}`}
        </Avatar>
        }
        title={
          <a className='card-name' href="/">
            {`${player.first_name}`}<br/>{`${player.last_name}`}
          </a>
        }
        sx={{
          '.card-name': {
            textDecoration: 'none',
            color: 'black',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 14,
          },
          '& .card-name:hover': {
            color: purple[500]
          }
        }}
      />
    </Card>
  );
};