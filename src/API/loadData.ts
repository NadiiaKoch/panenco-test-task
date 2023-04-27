import axios from 'axios';
import { Teams } from '../types/Teams';
import { Players } from '../types/Players';

// eslint-disable-next-line max-len
axios.defaults.baseURL = 'https://www.balldontlie.io/api/v1';

export function getTeams(
  page: number,
  perPage: number,
): Promise<Teams> {
  return axios
    .get(`/teams?page=${page}&per_page=${perPage}`)
    .then((res) => res.data);
}

export function getPlayers(
  page: number,
  perPage: number,
): Promise<Players> {
  return axios
    .get(`/players?page=${page}&per_page=${perPage}`)
    .then((res) => res.data);
}