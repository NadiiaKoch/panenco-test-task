import { Player } from "./Player";

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