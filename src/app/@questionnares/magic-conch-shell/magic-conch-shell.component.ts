import { Component } from '@angular/core';
import { QuestionnareServiceService } from '../../@service/questionnare-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Question {
  id: string;
  title: string;
  type: 'text' | 'radio' | 'checkbox';
  options?: string[];

}

interface questionnare {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'notStarted' | 'done' | 'unavailable';
  completedDate?:Date;
  questions: Question[];
}

@Component({
  selector: 'app-magic-conch-shell',
  imports: [RouterLink,CommonModule],
  templateUrl: './magic-conch-shell.component.html',
  styleUrl: './magic-conch-shell.component.scss'
})
export class MagicConchShellComponent {

  questionnares!: questionnare;

  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnareServiceService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('當前 ID:', id);
    if (id) {
    this.questionnares = this.questionnaireService.getById(id)!;
    console.log('抓到的資料:', this.questionnares);
    }
  }



}
