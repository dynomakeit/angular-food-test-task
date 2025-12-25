import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [ngClass]="buttonClasses()"
      [disabled]="disabled()"
      (click)="onClick.emit($event)"
    >
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('outline');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly selected = input(false);
  readonly fullWidth = input(false);

  readonly onClick = output<MouseEvent>();

  buttonClasses(): string {
    const base = 'font-medium transition-all duration-200 rounded-xl cursor-pointer';

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    };

    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-accent text-white hover:bg-accent-hover',
      outline: this.selected()
        ? 'bg-accent text-white border border-accent'
        : 'bg-white text-gray-900 border border-gray-200 hover:border-accent',
      ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
    };

    const width = this.fullWidth() ? 'w-full' : '';
    const disabledClass = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';

    return `${base} ${sizes[this.size()]} ${variants[this.variant()]} ${width} ${disabledClass}`;
  }
}
