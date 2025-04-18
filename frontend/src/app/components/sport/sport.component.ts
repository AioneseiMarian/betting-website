import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatchCardComponent, BetType } from '../../shared/components/match-card/match-card.component';
import { BettingService } from '../../services/betting.service';
import { Match } from '../../models/match.model';
import { BetSelection } from '../../models/bet-selection.model';
import { MatchService } from '../../services/match.service'

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatchCardComponent
  ],
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss']
})
export class SportComponent implements OnInit {
  sportMatches: Match[] = [];

  constructor(
    private matchService: MatchService,
    private bettingService: BettingService
  ) {}

  ngOnInit(): void {
    this.matchService.getSportMatches().subscribe(matches => {
      this.sportMatches = matches;
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
