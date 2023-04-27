import { Team } from "./Team";

export interface Teams {
  data: Team[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: null;
    per_page: number;
    total_count: number;
  }
}