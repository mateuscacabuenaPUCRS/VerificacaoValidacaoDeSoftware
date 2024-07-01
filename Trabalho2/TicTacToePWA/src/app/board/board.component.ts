import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  squares: any[];
  started: boolean;
  playerCount: number;
  winner: string | null;
  xIsNext: boolean;
  totalPredictions: number;

  correctOutput: string | null;
  correctHitsOverall: number;
  correctHitsPercentage: number;

  knnOutput: string | null;
  knnHits: number;
  knnHitsPercentage: number;

  mlpOutput: string | null;
  mlpHits: number;
  mlpHitsPercentage: number;

  decisionTreeOutput: string | null;
  decisionTreeHits: number;
  decisionTreeHitsPercentage: number;

  apiError: string | null;

  constructor() {
    this.squares = Array(9).fill(0);
    this.started = false;
    this.playerCount = 1;
    this.winner = null;
    this.xIsNext = true;
    this.totalPredictions = 0;

    this.correctOutput = null;
    this.correctHitsOverall = 0;
    this.correctHitsPercentage = 0;

    this.knnOutput = null;
    this.knnHits = 0;
    this.knnHitsPercentage = 0;

    this.mlpOutput = null;
    this.mlpHits = 0;
    this.mlpHitsPercentage = 0;

    this.decisionTreeOutput = null;
    this.decisionTreeHits = 0;
    this.decisionTreeHitsPercentage = 0;

    this.apiError = null;
  }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(0);
    this.started = false;
    this.winner = null;
    this.xIsNext = true;
    this.totalPredictions = 0;

    this.correctOutput = null;
    this.correctHitsOverall = 0;
    this.correctHitsPercentage = 0;

    this.knnOutput = null;
    this.knnHits = 0;
    this.knnHitsPercentage = 0;

    this.mlpOutput = null;
    this.mlpHits = 0;
    this.mlpHitsPercentage = 0;

    this.decisionTreeOutput = null;
    this.decisionTreeHits = 0;
    this.decisionTreeHitsPercentage = 0;

    this.apiError = null;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  changePlayerCount() {
    if (this.playerCount === 1) {
      this.playerCount = 2;
    } else {
      this.playerCount = 1;
    }
  }

  makeMove(idx: number) {
    if (!this.started) {
      this.started = true;
    }
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
    // Make random computer move
    if (this.playerCount === 1 && !this.winner) {
      const emptySquares = this.squares
        .map((square, idx) => (square ? null : idx))
        .filter((idx) => idx !== null) as number[];
      const randomIdx = Math.floor(Math.random() * emptySquares.length);
      this.squares.splice(emptySquares[randomIdx], 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
    }
    this.aiPredict();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  aiPredict() {
    const board = this.squares.join(',');
    this.apiError = null;
    fetch(`http://localhost:8080/${board}`)
      .then((response) => response.json())
      .then((data) => {
        const { correctOutput, kNN, MLP, DTree } = data;
        this.correctOutput = correctOutput;
        this.knnOutput = kNN;
        this.mlpOutput = MLP;
        this.decisionTreeOutput = DTree;
        const roundToTwo = (num: number) => Math.round(num * 100) / 100;
        const getPercentage = (num: number) => roundToTwo(num / this.totalPredictions * 100);
        this.totalPredictions = this.totalPredictions + 1;
        if (kNN === correctOutput) {
          this.knnHits = this.knnHits + 1;
          this.correctHitsOverall = this.correctHitsOverall + 1;
        }
        if (MLP === correctOutput) {
          this.mlpHits = this.mlpHits + 1;
          this.correctHitsOverall = this.correctHitsOverall + 1;
        }
        if (DTree === correctOutput) {
          this.decisionTreeHits = this.decisionTreeHits + 1;
          this.correctHitsOverall = this.correctHitsOverall + 1;
        }
        this.correctHitsOverall = this.correctHitsOverall;
        this.knnHitsPercentage = getPercentage(this.knnHits);
        this.mlpHitsPercentage = getPercentage(this.mlpHits);
        this.decisionTreeHitsPercentage = getPercentage(this.decisionTreeHits);
        this.correctHitsPercentage = getPercentage(this.correctHitsOverall / 3);
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (error.message === 'Failed to fetch') {
            error = 'Failed to connect to the API';
          } else {
            error = 'An unexpected error occurred';
            console.error(error);
          }
        }
        this.apiError = error;
      });
  }
}
