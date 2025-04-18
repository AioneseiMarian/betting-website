import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matches = new BehaviorSubject<Match[]>([]);
  private featuredMatches = new BehaviorSubject<Match[]>([]);
  private liveMatches = new BehaviorSubject<Match[]>([]);
  private sportMatches = new BehaviorSubject<Match[]>([]);

  constructor() {
    // Initialize with some sample data
    this.initializeMatches();
  }

  private initializeMatches() {
    const allMatches: Match[] = [
      {
        id: 1,
        league: 'Premier League',
        homeTeam: 'Manchester City',
        awayTeam: 'Liverpool',
        date: new Date('2024-04-20T15:00:00'),
        odds: { home: 1.85, draw: 3.40, away: 4.20 },
        isLive: false
      },
      {
        id: 2,
        league: 'La Liga',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        date: new Date('2024-04-21T20:00:00'),
        odds: { home: 2.10, draw: 3.30, away: 3.50 },
        isLive: false
      },
      {
        id: 3,
        league: 'Serie A',
        homeTeam: 'Juventus',
        awayTeam: 'Inter Milan',
        date: new Date('2024-04-22T18:00:00'),
        odds: { home: 2.30, draw: 3.20, away: 3.10 },
        isLive: false
      },
      {
        id: 4,
        league: 'Bundesliga',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Borussia Dortmund',
        date: new Date('2024-04-23T17:30:00'),
        odds: { home: 1.75, draw: 3.60, away: 4.50 },
        isLive: false
      },
      {
        id: 5,
        league: 'Ligue 1',
        homeTeam: 'PSG',
        awayTeam: 'Lyon',
        date: new Date('2024-04-24T20:45:00'),
        odds: { home: 1.65, draw: 3.80, away: 5.20 },
        isLive: false
      },
      {
        id: 6,
        league: 'Premier League',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        date: new Date('2024-04-25T16:00:00'),
        odds: { home: 2.00, draw: 3.40, away: 3.80 },
        isLive: false
      },
      {
        id: 7,
        league: 'La Liga',
        homeTeam: 'Atletico Madrid',
        awayTeam: 'Sevilla',
        date: new Date('2024-04-26T19:00:00'),
        odds: { home: 1.90, draw: 3.30, away: 4.00 },
        isLive: false
      },
      {
        id: 8,
        league: 'Serie A',
        homeTeam: 'AC Milan',
        awayTeam: 'Napoli',
        date: new Date('2024-04-27T20:45:00'),
        odds: { home: 2.20, draw: 3.30, away: 3.20 },
        isLive: false
      },
      {
        id: 9,
        league: 'Bundesliga',
        homeTeam: 'RB Leipzig',
        awayTeam: 'Bayer Leverkusen',
        date: new Date('2024-04-28T15:30:00'),
        odds: { home: 2.10, draw: 3.40, away: 3.50 },
        isLive: false
      },
      {
        id: 10,
        league: 'Ligue 1',
        homeTeam: 'Monaco',
        awayTeam: 'Marseille',
        date: new Date('2024-04-29T20:00:00'),
        odds: { home: 2.00, draw: 3.30, away: 3.80 },
        isLive: false
      }
    ];

    // Set all matches
    this.matches.next(allMatches);

    // Set featured matches (first 3)
    this.featuredMatches.next(allMatches.slice(0, 3));

    // Set live matches (randomly mark some as live)
    const liveMatches = allMatches.map(match => ({
      ...match,
      isLive: Math.random() > 0.7 // 30% chance of being live
    })).filter(match => match.isLive);
    this.liveMatches.next(liveMatches);

    // Set sport matches (all matches)
    this.sportMatches.next(allMatches);
  }

  // Get all matches
  getAllMatches(): Observable<Match[]> {
    return this.matches.asObservable();
  }

  // Get featured matches
  getFeaturedMatches(): Observable<Match[]> {
    return this.featuredMatches.asObservable();
  }

  // Get live matches
  getLiveMatches(): Observable<Match[]> {
    return this.liveMatches.asObservable();
  }

  // Get sport matches
  getSportMatches(): Observable<Match[]> {
    return this.sportMatches.asObservable();
  }

  // Get match by ID
  getMatchById(id: number): Match | undefined {
    return this.matches.value.find(match => match.id === id);
  }

  // Add a new match
  addMatch(match: Match): void {
    const currentMatches = this.matches.value;
    this.matches.next([...currentMatches, match]);
    
    // Update other lists if needed
    this.updateFeaturedMatches();
    this.updateLiveMatches();
    this.updateSportMatches();
  }

  // Update an existing match
  updateMatch(updatedMatch: Match): void {
    const currentMatches = this.matches.value;
    const index = currentMatches.findIndex(match => match.id === updatedMatch.id);
    
    if (index !== -1) {
      currentMatches[index] = updatedMatch;
      this.matches.next([...currentMatches]);
      
      // Update other lists
      this.updateFeaturedMatches();
      this.updateLiveMatches();
      this.updateSportMatches();
    }
  }

  // Remove a match
  removeMatch(id: number): void {
    const currentMatches = this.matches.value;
    this.matches.next(currentMatches.filter(match => match.id !== id));
    
    // Update other lists
    this.updateFeaturedMatches();
    this.updateLiveMatches();
    this.updateSportMatches();
  }

  // Helper methods to update other lists
  private updateFeaturedMatches(): void {
    // For now, just take the first 3 matches
    this.featuredMatches.next(this.matches.value.slice(0, 3));
  }

  private updateLiveMatches(): void {
    const liveMatches = this.matches.value.filter(match => match.isLive);
    this.liveMatches.next(liveMatches);
  }

  private updateSportMatches(): void {
    this.sportMatches.next(this.matches.value);
  }
} 