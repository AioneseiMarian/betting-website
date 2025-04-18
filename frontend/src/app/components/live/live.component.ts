import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatchCardComponent, BetType } from '../../shared/components/match-card/match-card.component';
import { MatchService } from '../../services/match.service';
import { BettingService } from '../../services/betting.service';
import { Match } from '../../models/match.model';
import { BetSelection } from '../../models/bet-selection.model';

@Component({
  selector: 'app-live',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatchCardComponent
  ],
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  liveMatches: Match[] = [];

  constructor(
    private matchService: MatchService,
    private bettingService: BettingService
  ) {}

  ngOnInit(): void {
    this.matchService.getLiveMatches().subscribe(matches => {
      this.liveMatches = matches;
    });
  }

  onBetSelect(match: Match, betType: BetType): void {
    const betSelection: BetSelection = {
      matchId: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      odds: this.getOddsForBetType(match, betType),
      betType: betType,
      league: match.league,
      startTime: match.date
    };
    this.bettingService.addToBetSlip(betSelection);
  }

  private getOddsForBetType(match: Match, betType: BetType): number {
    switch(betType) {
      case 'home':
        return match.odds.home;
      case 'draw':
        return match.odds.draw;
      case 'away':
        return match.odds.away;
      default:
        return 0;
    }
  }
}
