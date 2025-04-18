import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BetSelection {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  betType: string;
  odds: number;
  league: string;
  matchTime: string;
}

export interface Ticket {
  id: number;
  date: string;
  status: 'pending' | 'won' | 'lost';
  stake: number;
  totalOdds: number;
  potentialWin: number;
  selections: BetSelection[];
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private tickets: Ticket[] = [
    {
      id: 1,
      date: '2024-03-10 15:30',
      status: 'won',
      stake: 100,
      totalOdds: 3.5,
      potentialWin: 350,
      selections: [
        {
          matchId: 1,
          homeTeam: 'Real Madrid',
          awayTeam: 'Barcelona',
          betType: '1',
          odds: 1.75,
          league: 'La Liga',
          matchTime: '2024-03-10 15:30'
        },
        {
          matchId: 2,
          homeTeam: 'Bayern Munich',
          awayTeam: 'Dortmund',
          betType: 'Over 2.5',
          odds: 2.0,
          league: 'Bundesliga',
          matchTime: '2024-03-10 16:00'
        }
      ]
    },
    {
      id: 2,
      date: '2024-03-09 18:00',
      status: 'lost',
      stake: 50,
      totalOdds: 4.2,
      potentialWin: 210,
      selections: [
        {
          matchId: 3,
          homeTeam: 'Liverpool',
          awayTeam: 'Manchester City',
          betType: '2',
          odds: 2.1,
          league: 'Premier League',
          matchTime: '2024-03-09 18:00'
        },
        {
          matchId: 4,
          homeTeam: 'PSG',
          awayTeam: 'Lyon',
          betType: '1',
          odds: 2.0,
          league: 'Ligue 1',
          matchTime: '2024-03-09 19:00'
        }
      ]
    },
    {
      id: 3,
      date: '2024-03-11 20:00',
      status: 'pending',
      stake: 75,
      totalOdds: 3.8,
      potentialWin: 285,
      selections: [
        {
          matchId: 5,
          homeTeam: 'Inter',
          awayTeam: 'Milan',
          betType: 'X',
          odds: 3.8,
          league: 'Serie A',
          matchTime: '2024-03-11 20:00'
        }
      ]
    }
  ];

  constructor() { }

  getTickets(): Observable<Ticket[]> {
    return of(this.tickets);
  }

  getTicketById(id: number): Observable<Ticket | undefined> {
    return of(this.tickets.find(ticket => ticket.id === id));
  }
} 