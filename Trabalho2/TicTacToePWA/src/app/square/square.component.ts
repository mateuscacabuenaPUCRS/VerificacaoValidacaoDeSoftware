import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button [attr.data-cy]="'button-' + index" *ngIf="!value" mat-raised-button style="width: 100%; height: 100%"></button>
    <button
      [attr.data-cy]="'button-' + index"
      *ngIf="value == 'X'"
      color="primary"
      mat-raised-button
      style="width: 100%; height: 100%"
    >
      {{ value }}
    </button>
    <button
      [attr.data-cy]="'button-' + index"
      *ngIf="value == 'O'"
      color="accent"
      mat-raised-button
      style="width: 100%; height: 100%"
    >
      {{ value }}
    </button>
  `,
  styles: [
    `
      button {
        font-size: 5em;
      }
    `,
  ],
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | null = null;
  @Input() index: number | null = null;
}
