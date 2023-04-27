import { Team } from './Teams';

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  team: Team;
}

export interface Players {
  data: Player[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: null;
    per_page: number;
    total_count: number;
  }
}