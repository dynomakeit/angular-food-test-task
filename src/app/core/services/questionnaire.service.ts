import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { MoodSurvey, ProfileSurvey } from '../../shared/models/survey.model';

const API_URL = '/api/v1';

export interface QuestionnaireRequest {
  mood: string;
  hungry: number;
  isWantExperiment: boolean;
  sex: boolean;
  age: number;
  isStandartFoodStyle: boolean;
  likeEat: string;
  dontLikeEat: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private readonly http = inject(HttpClient);

  submit(moodSurvey: MoodSurvey, profileSurvey: ProfileSurvey): Observable<void> {
    const body: QuestionnaireRequest = {
      mood: moodSurvey.mood ?? '',
      hungry: this.parseHunger(moodSurvey.hungerLevel),
      isWantExperiment: moodSurvey.wantsExperiments === 'experiments',
      sex: profileSurvey.gender === 'male',
      age: this.parseAge(profileSurvey.ageRange),
      isStandartFoodStyle: profileSurvey.dietStyle === 'standard',
      likeEat: '',
      dontLikeEat: '',
    };

    return this.http.post<void>(`${API_URL}/User/questionnaire`, body);
  }

  private parseHunger(level: string | null): number {
    if (!level) return 0;
    return parseInt(level, 10) || 0;
  }

  private parseAge(ageRange: string | null): number {
    switch (ageRange) {
      case 'under18': return 16;
      case '18-25': return 22;
      case '26-35': return 30;
      case '35-45': return 40;
      case '45+': return 50;
      default: return 25;
    }
  }
}
