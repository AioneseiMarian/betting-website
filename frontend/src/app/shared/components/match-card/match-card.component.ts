import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Match } from '../../../models/match.model';
import { BettingService } from '../../../services/betting.service';
import { Subscription } from 'rxjs';

export type BetType = 'home' | 'draw' | 'away';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit, OnDestroy {
  @Input() match!: Match;
  @Output() betSelect = new EventEmitter<BetType>();
  
  selectedBet: BetType | null = null;
  private betRemovedSubscription: Subscription | undefined;

  constructor(private bettingService: BettingService) {}

  ngOnInit(): void {
    this.betRemovedSubscription = this.bettingService.getBetRemovedEvents()
      .subscribe(event => {
        if (event.matchId === this.match.id) {
          this.selectedBet = null;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.betRemovedSubscription) {
      this.betRemovedSubscription.unsubscribe();
    }
  }

  onBetSelect(type: BetType): void {
    this.selectedBet = type;
    this.betSelect.emit(type);
  }

  isBetSelected(betType: BetType): boolean {
    return this.selectedBet === betType;
  }
} 