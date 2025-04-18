export interface Match {
  id: number;
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: Date;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  isLive: boolean;
} 