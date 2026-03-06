import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";
import { QuestionnareServiceService } from '../../@service/questionnare-service.service';

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
  selector: 'app-list',
  imports: [FormsModule, DatePipe, RouterLink, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent {

  searchText = '';
  fromDate = '';
  toDate = '';

  questionnares: questionnare[] = [];

  constructor(private questionnaireService: QuestionnareServiceService) {}

   ngOnInit() {
    this.questionnares = this.questionnaireService.getAll();
  }



  // get the date of the day you completed the questionnare
  getCompletedDate(item:questionnare)
  {
    item.status = 'done';
    item.completedDate = new Date();
  }

  // filt the list
  get filteredList() {
  return this.questionnares.filter(q => {
    const matchText =
      !this.searchText || q.title.includes(this.searchText) || q.id.includes(this.searchText);

    const matchFrom =
      !this.fromDate || q.startDate >= this.fromDate;

    const matchTo =
      !this.toDate || q.endDate <= this.toDate;

    return matchText && matchFrom && matchTo;
    });
  }

}
