import { Component, input, output, model, computed } from '@angular/core';
import { NgClass } from '@angular/common';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-button-group',
  standalone: true,
  imports: [NgClass],
  template: `
    @if (columns()) {
      <div class="flex flex-col gap-2" [ngClass]="containerClass()">
        @for (row of rows(); track rowIndex; let rowIndex = $index) {
          <div
            class="flex gap-2"
            [class.justify-center]="rowIndex > 0"
          >
            @for (option of row; track option.value) {
              <button
                class="py-3 text-base font-medium rounded-xl transition-all duration-200 cursor-pointer"
                [class.flex-1]="rowIndex === 0"
                [class.px-5]="row.length <= 3"
                [class.px-1]="row.length > 3"
                [ngClass]="{
                  'bg-accent text-white': isSelected(option.value),
                  'bg-white text-gray-900 border border-gray-200 hover:border-accent': !isSelected(option.value)
                }"
                (click)="selectOption(option.value)"
              >
                {{ option.label }}
              </button>
            }
          </div>
        }
      </div>
    } @else {
      <div class="flex flex-wrap gap-2" [ngClass]="containerClass()">
        @for (option of options(); track option.value) {
          <button
            class="px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 cursor-pointer"
            [ngClass]="{
              'bg-accent text-white': isSelected(option.value),
              'bg-white text-gray-900 border border-gray-200 hover:border-accent': !isSelected(option.value)
            }"
            (click)="selectOption(option.value)"
          >
            {{ option.label }}
          </button>
        }
      </div>
    }
  `,
})
export class SelectButtonGroupComponent {
  readonly options = input<SelectOption[]>([]);
  readonly selected = model<string | null>(null);
  readonly containerClass = input<string>('');
  readonly columns = input<number | null>(null);

  readonly selectionChange = output<string>();

  readonly rows = computed(() => {
    const cols = this.columns();
    const opts = this.options();
    if (!cols) return [opts];

    const result: SelectOption[][] = [];
    for (let i = 0; i < opts.length; i += cols) {
      result.push(opts.slice(i, i + cols));
    }
    return result;
  });

  isSelected(value: string): boolean {
    return this.selected() === value;
  }

  selectOption(value: string): void {
    this.selected.set(value);
    this.selectionChange.emit(value);
  }
}
