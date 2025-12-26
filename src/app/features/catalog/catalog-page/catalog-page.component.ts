import { Component, signal, computed, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TabsComponent, Tab } from '../../../shared/components/tabs/tabs.component';
import { FoodCardComponent } from '../food-card/food-card.component';
import {
  MoodSurveyModalComponent,
  ProfileSurveyModalComponent,
} from '../../survey/survey-modal.component';
import { QuestionnaireService } from '../../../core/services/questionnaire.service';
import type { FoodItem } from '../../../shared/models/food-item.model';
import type { MoodSurvey, ProfileSurvey } from '../../../shared/models/survey.model';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    HeaderComponent,
    TabsComponent,
    FoodCardComponent,
    MoodSurveyModalComponent,
    ProfileSurveyModalComponent,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      <app-header
        [address]="address()"
        (menuClick)="onMenuClick()"
        (addressClick)="onAddressClick()"
      />

      <app-tabs
        [tabs]="categories"
        [activeTab]="activeCategory()"
        (tabChange)="activeCategory.set($event)"
      />

      <div class="flex-1 overflow-y-auto p-5">
        <div class="grid grid-cols-2 gap-4">
          @for (item of filteredItems(); track item.id) {
            <app-food-card
              [item]="item"
              (addToCart)="onAddToCart($event)"
            />
          }
        </div>
      </div>

      <div class="bg-white border-t border-gray-200 px-5 py-4 pb-8">
        <button
          class="w-full py-4 bg-accent text-white font-medium rounded-xl cursor-pointer hover:bg-accent-hover transition-colors"
          (click)="openMoodSurvey()"
        >
          Подобрать меню
        </button>
      </div>

      <app-mood-survey-modal
        [isOpen]="isMoodSurveyOpen()"
        (close)="closeMoodSurvey()"
        (submit)="onMoodSurveySubmit($event)"
      />

      <app-profile-survey-modal
        [isOpen]="isProfileSurveyOpen()"
        (close)="closeProfileSurvey()"
        (submit)="onProfileSurveySubmit($event)"
      />
    </div>
  `,
})
export class CatalogPageComponent {
  private readonly questionnaireService = inject(QuestionnaireService);

  readonly address = signal('Новосибирская улица, 100');
  readonly activeCategory = signal('popular');
  readonly isMoodSurveyOpen = signal(true);
  readonly isProfileSurveyOpen = signal(false);

  private moodSurveyData: MoodSurvey | null = null;

  readonly categories: Tab[] = [
    { id: 'salads', label: 'Салаты' },
    { id: 'popular', label: 'Популярное' },
    { id: 'pizza', label: 'Пицца' },
    { id: 'pasta', label: 'Паста' },
  ];

  readonly foodItems = signal<FoodItem[]>([
    {
      id: '1',
      name: 'Борщ со сметаной',
      price: 650,
      weight: 340,
      imageUrl: 'https://example.com/borsh.jpg',
      category: 'popular',
    },
    {
      id: '2',
      name: 'Паста',
      price: 650,
      weight: 340,
      imageUrl: 'https://example.com/pasta.jpg',
      category: 'popular',
    },

  ]);

  readonly filteredItems = computed(() =>
    this.foodItems().filter((item) => item.category === this.activeCategory())
  );

  onMenuClick(): void {
    console.log('Menu clicked');
  }

  onAddressClick(): void {
    console.log('Address clicked');
  }

  onAddToCart(item: FoodItem): void {
    console.log('Added to cart:', item);
  }

  openMoodSurvey(): void {
    this.isMoodSurveyOpen.set(true);
  }

  closeMoodSurvey(): void {
    this.isMoodSurveyOpen.set(false);
  }

  onMoodSurveySubmit(survey: MoodSurvey): void {
    this.moodSurveyData = survey;
    this.isMoodSurveyOpen.set(false);
    this.isProfileSurveyOpen.set(true);
  }

  closeProfileSurvey(): void {
    this.isProfileSurveyOpen.set(false);
  }

  onProfileSurveySubmit(survey: ProfileSurvey): void {
    if (!this.moodSurveyData) return;

    this.questionnaireService.submit(this.moodSurveyData, survey).subscribe({
      next: () => {
        console.log('Questionnaire submitted successfully');
        this.isProfileSurveyOpen.set(false);
        this.moodSurveyData = null;
      },
      error: (err) => {
        console.error('Failed to submit questionnaire:', err);
      },
    });
  }
}
