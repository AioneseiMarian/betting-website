import { Match } from './match.model';

export interface BetSelection {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  odds: number;
  betType: string;
  stake?: number;
  league: string;
  startTime: Date;
} 