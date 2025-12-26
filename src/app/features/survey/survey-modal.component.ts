import { Component, input, output, signal, computed } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import {
  SelectButtonGroupComponent,
  SelectOption,
} from '../../shared/components/select-button-group/select-button-group.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import type { MoodSurvey, ProfileSurvey } from '../../shared/models/survey.model';

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
          [disabled]="!isFormValid()"
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

  readonly isFormValid = computed(() =>
    this.selectedMood() !== null &&
    this.selectedHunger() !== null &&
    this.selectedExperiment() !== null
  );

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

@Component({
  selector: 'app-profile-survey-modal',
  standalone: true,
  imports: [ModalComponent, SelectButtonGroupComponent, ButtonComponent],
  template: `
    <app-modal [isOpen]="isOpen()" (close)="close.emit()">
      <div class="px-5 space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Выбери пол</h3>
          <app-select-button-group
            [options]="genderOptions"
            [(selected)]="selectedGender"
            [columns]="2"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Выбери свой возраст</h3>
          <app-select-button-group
            [options]="ageOptions"
            [(selected)]="selectedAge"
            [columns]="5"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Твой стиль питания</h3>
          <app-select-button-group
            [options]="dietOptions"
            [(selected)]="selectedDiet"
            [columns]="2"
          />
        </div>

        <app-button
          variant="primary"
          [fullWidth]="true"
          [disabled]="!isFormValid()"
          (onClick)="submitSurvey()"
        >
          Продолжить
        </app-button>
      </div>
    </app-modal>
  `,
})
export class ProfileSurveyModalComponent {
  readonly isOpen = input(false);
  readonly close = output<void>();
  readonly submit = output<ProfileSurvey>();

  readonly selectedGender = signal<string | null>(null);
  readonly selectedAge = signal<string | null>(null);
  readonly selectedDiet = signal<string | null>(null);

  readonly isFormValid = computed(() =>
    this.selectedGender() !== null &&
    this.selectedAge() !== null &&
    this.selectedDiet() !== null
  );

  readonly genderOptions: SelectOption[] = [
    { value: 'male', label: 'Мужчина' },
    { value: 'female', label: 'Женщина' },
  ];

  readonly ageOptions: SelectOption[] = [
    { value: 'under18', label: 'до 18' },
    { value: '18-25', label: '18-25' },
    { value: '26-35', label: '26-35' },
    { value: '35-45', label: '35-45' },
    { value: '45+', label: '45+' },
  ];

  readonly dietOptions: SelectOption[] = [
    { value: 'standard', label: 'Стандартный' },
    { value: 'diet', label: 'Диетический' },
  ];

  submitSurvey(): void {
    this.submit.emit({
      gender: this.selectedGender(),
      ageRange: this.selectedAge(),
      dietStyle: this.selectedDiet(),
    });
  }
}
