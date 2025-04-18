import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { BetSelection } from '../models/bet-selection.model';
import { tap } from 'rxjs/operators';

export interface Bet {
  id: number;
  userId: number;
  matchId: number;
  betType: string;
  odds: number;
  stake: number;
  potentialWin: number;
  status: 'pending' | 'won' | 'lost';
  createdAt: Date;
}

export interface BetSlip {
  selections: BetSelection[];
  totalOdds: number;
  stake: number;
  potentialWin: number;
}

@Injectable({
  providedIn: 'root'
})
export class BettingService {
  private betSelections = new BehaviorSubject<BetSelection[]>([]);
  private betRemoved = new Subject<{matchId: number, betType: string}>();

  constructor(private http: HttpClient) {}

  getCurrentBets(): Observable<BetSelection[]> {
    return this.betSelections.asObservable();
  }

  getBetRemovedEvents(): Observable<{matchId: number, betType: string}> {
    return this.betRemoved.asObservable();
  }

  getUserBets(): Observable<Bet[]> {
    return this.http.get<Bet[]>(`${environment.apiUrl}/bets`);
  }

  addToBetSlip(bet: BetSelection): void {
    const currentBets = this.betSelections.value;
    const existingBetIndex = currentBets.findIndex(b => b.matchId === bet.matchId);
    
    if (existingBetIndex !== -1) {
      currentBets[existingBetIndex] = bet;
    } else {
      currentBets.push(bet);
    }
    
    this.betSelections.next([...currentBets]);
  }

  removeBet(matchId: number): void {
    const currentBets = this.betSelections.value;
    const betToRemove = currentBets.find(bet => bet.matchId === matchId);
    if (betToRemove) {
      this.betRemoved.next({ matchId: betToRemove.matchId, betType: betToRemove.betType });
    }
    const updatedBets = currentBets.filter(bet => bet.matchId !== matchId);
    this.betSelections.next(updatedBets);
  }

  clearBetSlip(): void {
    const currentBets = this.betSelections.value;
    // Emit removal events for all bets before clearing
    currentBets.forEach(bet => {
      this.betRemoved.next({ matchId: bet.matchId, betType: bet.betType });
    });
    this.betSelections.next([]);
  }

  placeBets(): Observable<Bet[]> {
    const bets = this.betSelections.value;
    return this.http.post<Bet[]>(`${environment.apiUrl}/bets`, bets).pipe(
      tap(() => this.clearBetSlip())
    );
  }

  private calculateTotalOdds(selections: BetSelection[]): number {
    return selections.reduce((total, selection) => total * selection.odds, 1);
  }

  private calculatePotentialWin(totalOdds: number, stake: number): number {
    return Number((totalOdds * stake).toFixed(2));
  }
} 