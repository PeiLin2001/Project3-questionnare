import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionnareServiceService } from '../../@service/questionnare-service.service';
import {inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
  selector: 'app-creat-newdialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './creat-newdialog.component.html',
  styleUrl: './creat-newdialog.component.scss'
})
export class CreatNewdialogComponent {
  value = '';
  title = '';
  questionid = '';
  startDate = '';
  endDate = '';
  newQuestionnaire! :questionnare;

  constructor(
    private questionnaireService: QuestionnareServiceService
  ) {}
  readonly dialogRef = inject(MatDialogRef<CreatNewdialogComponent>);

  onOk() {

    console.log('目前輸入的值:', this.questionid, this.title); // <--- 加這一行測試
  // 檢查是否有填寫必要欄位
  // if (!this.id || !this.title) {
  //   alert('編號與標題為必填喔！');
  //   return;
  // }

  // 建立新物件 (注意：這裡直接用 this 裡面的變數)
  const dataToAdd: questionnare = {
    id: this.questionid,
    title: this.title,
    startDate: this.startDate,
    endDate: this.endDate,
    status: 'notStarted',
    questions: [] // 新問卷預設題目為空
  };

  // 呼叫 Service 新增資料
  this.questionnaireService.add(dataToAdd);

  // 關閉視窗並回傳 true，告訴清單頁「我成功新增了」
  this.dialogRef.close(true);
}


}
