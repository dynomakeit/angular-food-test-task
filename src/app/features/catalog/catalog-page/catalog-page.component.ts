import { Component, signal, computed } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TabsComponent, Tab } from '../../../shared/components/tabs/tabs.component';
import { FoodCardComponent } from '../food-card/food-card.component';
import { MoodSurveyModalComponent } from '../../survey/mood-survey-modal/mood-survey-modal.component';
import { ProfileSurveyModalComponent } from '../../survey/profile-survey-modal/profile-survey-modal.component';
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
  readonly address = signal('Новосибирская улица, 100');
  readonly activeCategory = signal('popular');
  readonly isMoodSurveyOpen = signal(false);
  readonly isProfileSurveyOpen = signal(false);

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
      imageUrl: 'https://images.unsplash.com/photo-1603903631918-90e83e9b9e3a?w=400&h=300&fit=crop',
      category: 'popular',
    },
    {
      id: '2',
      name: 'Паста',
      price: 650,
      weight: 340,
      imageUrl: 'https://images.unsplash.com/photo-1603903631918-90e83e9b9e3a?w=400&h=300&fit=crop',
      category: 'popular',
    },
    {
      id: '3',
      name: 'Борщ со сметаной',
      price: 650,
      weight: 340,
      imageUrl: 'https://images.unsplash.com/photo-1603903631918-90e83e9b9e3a?w=400&h=300&fit=crop',
      category: 'popular',
    },
    {
      id: '4',
      name: 'Паста',
      price: 650,
      weight: 340,
      imageUrl: 'https://images.unsplash.com/photo-1603903631918-90e83e9b9e3a?w=400&h=300&fit=crop',
      category: 'popular',
    },
    {
      id: '5',
      name: 'Цезарь',
      price: 550,
      weight: 280,
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
      category: 'salads',
    },
    {
      id: '6',
      name: 'Греческий салат',
      price: 480,
      weight: 250,
      imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
      category: 'salads',
    },
    {
      id: '7',
      name: 'Пепперони',
      price: 890,
      weight: 450,
      imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
      category: 'pizza',
    },
    {
      id: '8',
      name: 'Маргарита',
      price: 750,
      weight: 400,
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
      category: 'pizza',
    },
    {
      id: '9',
      name: 'Карбонара',
      price: 720,
      weight: 320,
      imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
      category: 'pasta',
    },
    {
      id: '10',
      name: 'Болоньезе',
      price: 680,
      weight: 350,
      imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop',
      category: 'pasta',
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
    console.log('Mood survey submitted:', survey);
    this.isMoodSurveyOpen.set(false);
    this.isProfileSurveyOpen.set(true);
  }

  openProfileSurvey(): void {
    this.isProfileSurveyOpen.set(true);
  }

  closeProfileSurvey(): void {
    this.isProfileSurveyOpen.set(false);
  }

  onProfileSurveySubmit(survey: ProfileSurvey): void {
    console.log('Profile survey submitted:', survey);
    this.isProfileSurveyOpen.set(false);
  }
}
