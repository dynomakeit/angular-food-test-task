import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <div class="flex items-center gap-3 px-5 py-4">
    <button class="p-1 cursor-pointer" (click)="menuClick.emit()">
        <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button
        class="flex-1 flex items-center justify-between cursor-pointer"
        (click)="addressClick.emit()"
      >
        <span class="text-base font-medium text-gray-900">{{ address() }}</span>
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  `,
})
export class HeaderComponent {
  readonly address = input('');
  readonly menuClick = output<void>();
  readonly addressClick = output<void>();
}
