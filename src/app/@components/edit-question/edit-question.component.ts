import { Component } from '@angular/core';
import { QuestionnareServiceService } from '../../@service/questionnare-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-edit-question',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.scss'
})
export class EditQuestionComponent {

  questionnares!: questionnare;

  // 加入狀態控制：'edit' 或 'results'
  currentTab: 'edit' | 'results' = 'edit';
  switchTab(tab: 'edit' | 'results') {
    this.currentTab = tab;
  }

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

  // 1. 新增題目
  addQuestion() {
    const newId = `q${this.questionnares.questions.length + 1}`;
    this.questionnares.questions.push({
      id: newId,
      title: '',
      type: 'text',
      options: ['選項1'] // 預設給一個選項
    });
  }

  // 2. 刪除題目
  deleteQuestion(index: number) {
    this.questionnares.questions.splice(index, 1);
  }

  // 3. 新增選項 (針對 radio/checkbox)
  addOption(q: Question) {
    if (!q.options) q.options = [];
    q.options.push(`新選項 ${q.options.length + 1}`);
  }

  // 4. 刪除選項
  deleteOption(q: Question, optIndex: number) {
    q.options?.splice(optIndex, 1);
  }

  // 5.儲存問卷
  save() {
    if (!this.questionnares.title.trim()) {
      alert('標題不能為空喔！');
      return;
    }

    const success = this.questionnaireService.updateQuestionnaire(this.questionnares);

    if (success) {
      alert('儲存成功！');
      // 如果你想存完直接跳回列表頁，可以注入 Router 並導向
      // this.router.navigate(['/list']);
    } else {
      alert('儲存失敗，找不到該問卷。');
    }
  }

}
