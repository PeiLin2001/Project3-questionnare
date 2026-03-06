import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";
import { QuestionnareServiceService } from '../../@service/questionnare-service.service';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CreatNewdialogComponent } from '../../@component/creat-newdialog/creat-newdialog.component';

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
  selector: 'app-userpage',
  imports: [FormsModule, DatePipe, RouterLink, MatButtonModule],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.scss'
})

export class UserpageComponent {

    // 1. 變數定義
    searchText = '';
    fromDate = '';
    toDate = '';
    questionnares: questionnare[] = [];
    isEditing: boolean = false; // 預設為 false（隱藏狀態）

    // 2. 注入 Service 與 Dialog
    constructor(private questionnaireService: QuestionnareServiceService ,dialog: MatDialog) {}
     ngOnInit() {
      this.loadList();
    }
    readonly dialog = inject(MatDialog);

    // 3. 核心邏輯方法
    loadList() {
      this.questionnares = this.questionnaireService.getAll();
    }

    // 切換編輯模式的方法
    toggleEditMode() {
      this.isEditing = !this.isEditing;
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

    deleteQuestionnaire(id: string) {
    if (confirm('確定要刪除此問卷嗎?')) {
      this.questionnaireService.deleteById(id);
      // 重新取得清單以更新畫面
      this.loadList();
    }
    }



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(CreatNewdialogComponent, {
      width: '60vw',
      height: '40vw',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    // 重要：當視窗關閉後執行
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // 重新從 Service 抓取最新清單，這會觸發 Angular 的變更偵測並重新渲染畫面
        this.loadList();
        console.log('清單已更新！');
      }
    });
  }

}
