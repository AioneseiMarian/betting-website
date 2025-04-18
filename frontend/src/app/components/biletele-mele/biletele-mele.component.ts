import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { TicketsService, Ticket } from '../../services/tickets.service';

@Component({
  selector: 'app-biletele-mele',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  template: `
    <div class="tickets-container">
      <h1>Biletele Mele</h1>
      
      <div class="tickets-grid">
        <mat-card *ngFor="let ticket of tickets" class="ticket-card">
          <mat-card-header>
            <mat-card-title>
              Bilet #{{ ticket.id }}
              <mat-chip-set>
                <mat-chip [ngClass]="ticket.status">{{ ticket.status | titlecase }}</mat-chip>
              </mat-chip-set>
            </mat-card-title>
            <mat-card-subtitle>{{ ticket.date | date:'medium' }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="selections">
              <div *ngFor="let selection of ticket.selections" class="selection">
                <div class="match-info">
                  <div class="teams">{{ selection.homeTeam }} vs {{ selection.awayTeam }}</div>
                  <div class="league">{{ selection.league }}</div>
                  <div class="match-time">{{ selection.matchTime | date:'short' }}</div>
                </div>
                <div class="bet-info">
                  <span class="bet-type">{{ selection.betType }}</span>
                  <span class="odds">{{ selection.odds }}</span>
                </div>
                <mat-divider></mat-divider>
              </div>
            </div>
            
            <div class="ticket-summary">
              <div class="summary-row">
                <span>Miză</span>
                <span>{{ ticket.stake }} RON</span>
              </div>
              <div class="summary-row">
                <span>Cotă totală</span>
                <span>{{ ticket.totalOdds }}</span>
              </div>
              <div class="summary-row potential-win">
                <span>Câștig potențial</span>
                <span>{{ ticket.potentialWin }} RON</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .tickets-container {
      padding: 0 2rem;
      max-width: 1200px;
      margin: 0 auto;

      h1 {
        font-size: 2rem;
        font-weight: 500;
        color: #1A1A1A;
        margin-bottom: 2rem;
      }
    }

    .tickets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .ticket-card {
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);

      mat-card-header {
        padding: 1rem;
        background: #f5f5f5;
        border-radius: 12px 12px 0 0;

        mat-card-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
      }

      mat-chip-set {
        .mat-chip {
          &.won {
            background-color: #4CAF50;
            color: white;
          }
          &.lost {
            background-color: #f44336;
            color: white;
          }
          &.pending {
            background-color: #FFC107;
            color: black;
          }
        }
      }
    }

    .selections {
      padding: 1rem;

      .selection {
        margin-bottom: 1rem;

        .match-info {
          margin-bottom: 0.5rem;

          .teams {
            font-weight: 500;
            font-size: 1rem;
            color: #1A1A1A;
          }

          .league {
            font-size: 0.875rem;
            color: #666;
          }

          .match-time {
            font-size: 0.875rem;
            color: #E41E31;
          }
        }

        .bet-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.5rem 0;

          .bet-type {
            font-weight: 500;
            color: #1A1A1A;
          }

          .odds {
            font-weight: 700;
            color: #E41E31;
          }
        }

        mat-divider {
          margin: 1rem 0;
        }

        &:last-child {
          margin-bottom: 0;
          
          mat-divider {
            display: none;
          }
        }
      }
    }

    .ticket-summary {
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 0 0 12px 12px;

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        color: #666;

        &:last-child {
          margin-bottom: 0;
        }

        &.potential-win {
          font-weight: 700;
          color: #1A1A1A;
          font-size: 1rem;
        }
      }
    }

    @media (max-width: 768px) {
      .tickets-container {
        padding: 0 1rem;
      }

      .tickets-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `]
})
export class BileteleMeleComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.ticketsService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }
}
