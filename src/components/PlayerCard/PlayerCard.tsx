import React, { FC } from 'react';
import { Avatar, Card, CardHeader } from '@mui/material';
import { Player } from '../../types/Players';

type Props = {
  player: Player,
};

export const PlayerCard: FC<Props> = ({
  player,
}) => {
  return (
    <Card sx={{height: 120, borderRadius: 5, cursor: 'pointer', '&:hover .card-name': {color: '#652AD3'}}}>
      <CardHeader
        avatar={
        <Avatar sx={{ bgcolor: '#EDE6FB', color: '#1D0053', fontWeight: 700, fontSize: 32, width: 80, height: 80 }}>
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
            color: '#14141E',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 20,
          },
        }}
      />
    </Card>
  );
};