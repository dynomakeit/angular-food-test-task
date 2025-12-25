import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

export interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="flex border-b border-gray-200">
      @for (tab of tabs(); track tab.id) {
        <button
          class="relative px-4 py-2 text-base font-medium transition-colors cursor-pointer"
          [ngClass]="{
            'text-accent': activeTab() === tab.id,
            'text-gray-500 hover:text-gray-900': activeTab() !== tab.id
          }"
          (click)="tabChange.emit(tab.id)"
        >
          {{ tab.label }}
          @if (activeTab() === tab.id) {
            <div class="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full"></div>
          }
        </button>
      }
    </div>
  `,
})
export class TabsComponent {
  readonly tabs = input<Tab[]>([]);
  readonly activeTab = input<string>('');
  readonly tabChange = output<string>();
}
