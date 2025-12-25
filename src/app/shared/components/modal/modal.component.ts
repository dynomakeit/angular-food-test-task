import { Component, input, output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-end justify-center">
        <div
          class="absolute inset-0 bg-black/50"
          @fadeIn
          (click)="close.emit()"
        ></div>
        <div
          class="relative w-full max-w-md bg-white rounded-t-3xl pb-8"
          @slideUp
        >
          <div class="flex justify-center pt-3 pb-4">
            <div class="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <ng-content />
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  readonly isOpen = input(false);
  readonly close = output<void>();
}
