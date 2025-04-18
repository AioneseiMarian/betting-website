import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

interface SocialBet {
  id: number;
  user: {
    name: string;
    avatar: string;
    followers: number;
  };
  match: {
    homeTeam: string;
    awayTeam: string;
    league: string;
    date: Date;
  };
  prediction: {
    type: 'home' | 'draw' | 'away';
    odds: number;
    stake: number;
    potentialWin: number;
  };
  likes: number;
  comments: number;
  isLiked?: boolean;
}

@Component({
  selector: 'app-supersocial',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './supersocial.component.html',
  styleUrl: './supersocial.component.scss'
})
export class SupersocialComponent {
  socialBets: SocialBet[] = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
        followers: 1250
      },
      match: {
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        league: 'La Liga',
        date: new Date('2024-04-15T20:00:00')
      },
      prediction: {
        type: 'home',
        odds: 2.10,
        stake: 50,
        potentialWin: 105
      },
      likes: 42,
      comments: 8,
      isLiked: true
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=2',
        followers: 850
      },
      match: {
        homeTeam: 'Manchester City',
        awayTeam: 'Liverpool',
        league: 'Premier League',
        date: new Date('2024-04-15T17:30:00')
      },
      prediction: {
        type: 'draw',
        odds: 3.50,
        stake: 30,
        potentialWin: 105
      },
      likes: 28,
      comments: 5
    }
  ];

  onLike(betId: number): void {
    const bet = this.socialBets.find(b => b.id === betId);
    if (bet) {
      bet.isLiked = !bet.isLiked;
      bet.likes += bet.isLiked ? 1 : -1;
    }
  }

  onComment(betId: number): void {
    console.log(`Comment on bet ${betId}`);
    // TODO: Implement comment functionality
  }

  onFollow(userId: number): void {
    console.log(`Follow user ${userId}`);
    // TODO: Implement follow functionality
  }
}
