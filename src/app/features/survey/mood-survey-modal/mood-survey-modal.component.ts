import { Component, input, output, signal } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SelectButtonGroupComponent, SelectOption } from '../../../shared/components/select-button-group/select-button-group.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import type { MoodSurvey } from '../../../shared/models/survey.model';

@Component({
  selector: 'app-mood-survey-modal',
  standalone: true,
  imports: [ModalComponent, SelectButtonGroupComponent, ButtonComponent],
  template: `
    <app-modal [isOpen]="isOpen()" (close)="close.emit()">
      <div class="px-5 space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Выбери свое настроение</h3>
          <app-select-button-group
            [options]="moodOptions"
            [(selected)]="selectedMood"
            [columns]="3"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Насколько ты голоден</h3>
          <app-select-button-group
            [options]="hungerOptions"
            [(selected)]="selectedHunger"
            [columns]="4"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Хочется ли экспериментов?</h3>
          <app-select-button-group
            [options]="experimentOptions"
            [(selected)]="selectedExperiment"
            [columns]="2"

          />
        </div>

        <app-button
          variant="primary"
          [fullWidth]="true"
          (onClick)="submitSurvey()"
        >
          Продолжить
        </app-button>
      </div>
    </app-modal>
  `,
})
export class MoodSurveyModalComponent {
  readonly isOpen = input(false);
  readonly close = output<void>();
  readonly submit = output<MoodSurvey>();

  readonly selectedMood = signal<string | null>(null);
  readonly selectedHunger = signal<string | null>(null);
  readonly selectedExperiment = signal<string | null>(null);

  readonly moodOptions: SelectOption[] = [
    { value: 'joy', label: 'Радость' },
    { value: 'sadness', label: 'Печаль' },
    { value: 'anger', label: 'Гнев' },
    { value: 'calm', label: 'Спокойствие' },
    { value: 'excitement', label: 'Волнение' },
  ];

  readonly hungerOptions: SelectOption[] = [
    { value: '2', label: '2/10' },
    { value: '5', label: '5/10' },
    { value: '7', label: '7/10' },
    { value: '10', label: '10/10' },
  ];

  readonly experimentOptions: SelectOption[] = [
    { value: 'usual', label: 'Как обычно' },
    { value: 'experiments', label: 'Эксперименты' },
  ];

  submitSurvey(): void {
    this.submit.emit({
      mood: this.selectedMood(),
      hungerLevel: this.selectedHunger(),
      wantsExperiments: this.selectedExperiment(),
    });
  }
}
