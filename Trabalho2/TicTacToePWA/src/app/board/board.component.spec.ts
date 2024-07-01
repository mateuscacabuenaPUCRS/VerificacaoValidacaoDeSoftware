import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SquareComponent } from '../square/square.component';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, SquareComponent],
      imports: [NoopAnimationsModule, MatButtonModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the board', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.squares.length).toBe(9);
    expect(component.started).toBeFalse();
    expect(component.playerCount).toBe(1);
    expect(component.winner).toBeNull();
    expect(component.xIsNext).toBeTrue();
  });

  it('should start a new game', () => {
    component.newGame();
    expect(component.squares.every((square) => square === 0)).toBeTrue();
    expect(component.started).toBeFalse();
    expect(component.winner).toBeNull();
    expect(component.xIsNext).toBeTrue();
  });

  it('should change player count', () => {
    component.changePlayerCount();
    expect(component.playerCount).toBe(2);
    component.changePlayerCount();
    expect(component.playerCount).toBe(1);
  });

  it('should make a move and switch player', () => {
    component.changePlayerCount();
    expect(component.xIsNext).toBeTrue();
    component.makeMove(0);
    fixture.detectChanges();
    expect(component.squares[0]).toBe('X'); 
    expect(component.xIsNext).toBeFalse();
    component.makeMove(1);
    fixture.detectChanges();
    expect(component.squares[1]).toBe('O'); 
    expect(component.xIsNext).toBeTrue(); 
  });

  it('should not overwrite a move', () => {
    component.makeMove(0);
    expect(component.squares[0]).toBe('X');
    component.makeMove(0);
    expect(component.squares[0]).toBe('X'); 
  });

  it('should calculate winner correctly', () => {
    component.squares = ['X', 'X', 'X', 0, 'O', 0, 'O', 0, 0];
    expect(component.calculateWinner()).toBe('X');
  });

  it('should handle AI prediction', () => {
    const mockResponse = {
      correctOutput: 'X_GANHOU',
      kNN: 'X_GANHOU',
      MLP: 'O_GANHOU',
      DTree: 'X_GANHOU',
    };

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(JSON.stringify(mockResponse)))
    );

    component.aiPredict();
    expect(component.apiError).toBeNull();
  });
});
