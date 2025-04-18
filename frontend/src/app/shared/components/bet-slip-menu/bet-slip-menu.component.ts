import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BettingService } from '../../../services/betting.service';
import { BetSelection } from '../../../models/bet-selection.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bet-slip-menu',
  templateUrl: './bet-slip-menu.component.html',
  styleUrls: ['./bet-slip-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BetSlipMenuComponent implements OnInit, OnDestroy {
  betSlip: { selections: BetSelection[], totalStake: number, potentialWin: number } = {
    selections: [],
    totalStake: 0,
    potentialWin: 0
  };
  private subscription: Subscription = new Subscription();

  constructor(
    private bettingService: BettingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.bettingService.getCurrentBets().subscribe(bets => {
        this.betSlip.selections = bets;
        this.updateTotals();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBetSlipCount(): number {
    return this.betSlip.selections.length;
  }

  getTotalOdds(): number {
    return this.betSlip.selections.reduce((total, bet) => total * bet.odds, 1);
  }

  getPotentialWin(): number {
    const totalOdds = this.getTotalOdds();
    return this.betSlip.totalStake ? Number((this.betSlip.totalStake * totalOdds).toFixed(2)) : 0;
  }

  updateTotals(): void {
    this.betSlip.potentialWin = this.getPotentialWin();
  }

  removeBet(matchId: number): void {
    this.bettingService.removeBet(matchId);
  }

  clearBetSlip(): void {
    this.bettingService.clearBetSlip();
    this.betSlip.totalStake = 0;
    this.betSlip.potentialWin = 0;
  }

  isValidBetSlip(): boolean {
    return this.betSlip.selections.length > 0 && 
           typeof this.betSlip.totalStake === 'number' && 
           this.betSlip.totalStake > 0;
  }

  placeBets(): void {
    if (!this.isValidBetSlip()) {
      this.snackBar.open('Please enter a stake amount', 'Close', {
        duration: 3000
      });
      return;
    }

    // Set the same stake for all bets before placing them
    this.betSlip.selections.forEach(bet => {
      bet.stake = this.betSlip.totalStake;
    });

    this.bettingService.placeBets().subscribe({
      next: () => {
        this.snackBar.open('Bets placed successfully!', 'Close', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open('Failed to place bets. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Error placing bets:', error);
      }
    });
  }
}