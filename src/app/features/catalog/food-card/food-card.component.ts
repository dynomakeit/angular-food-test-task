import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import type { FoodItem } from '../../../shared/models/food-item.model';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="bg-white rounded-lg overflow-hidden">
      <div class="relative">
        <img
          [src]="item().imageUrl"
          [alt]="item().name"
          class="w-full h-40 object-cover rounded-lg"
        />
      </div>
      <div class="pt-3">
        <h3 class="text-base font-medium text-gray-900 mb-1">{{ item().name }}</h3>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-gray-900 font-semibold">{{ item().price | currency: 'RUB' : 'symbol-narrow' : '1.0-0' }}</span>
          <span class="text-gray-500 text-sm">{{ item().weight }} г.</span>
        </div>
        <button
          class="w-full py-2 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-accent transition-colors"
          (click)="addToCart.emit(item())"
        >
          <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class FoodCardComponent {
  readonly item = input.required<FoodItem>();
  readonly addToCart = output<FoodItem>();
}
