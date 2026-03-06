import { Injectable } from '@angular/core';

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


@Injectable({
  providedIn: 'root'
})
export class QuestionnareServiceService {

  constructor() { }

  // files
  private questionnares:questionnare[]=[
    {
      id: '001',
      title: '你為什麼不問問神奇海螺',
      startDate: '2026-02-03',
      endDate: '2026-05-05',
      status: 'notStarted',
      completedDate: new Date(),
      questions: [
      {
        id: 'q1',
        title: '神奇海螺，我長大以後會結婚嗎？',
        type: 'radio',
        options: ['可能會吧', '不會']
      },
      {
        id: 'q2',
        title: '我可不可以吃東西？',
        type: 'text'
      }
      ]
    },
    {
      id: '002',
      title: '演奏春日影的動機',
      startDate: '2026-02-01',
      endDate: '2026-05-03',
      status: 'done',
      completedDate: new Date(),
      questions: [
      {
        id: 'q1',
        title: '你為甚麼要演奏春日影？',
        type: 'radio',
        options: ['就，挺突然的', '好聽', '最喜歡crychic了']
      },
      {
        id: 'q2',
        title: '你知道soyorin會生氣嗎？',
        type: 'text'
      }
      ]
    },
    {
      id: '003',
      title: '組樂團的開心程度',
      startDate: '2026-02-28',
      endDate: '2026-05-30',
      status: 'unavailable',
      completedDate: new Date(),
      questions: [
      {
        id: 'q1',
        title: '覺得組樂團開心過嗎？',
        type: 'radio',
        options: ['開心', '普通', '不開心']
      },
      {
        id: 'q2',
        title: '為什麼？',
        type: 'radio',
        options: ['吉他彈太爛', '嘴砲而已ㄏㄏ', '隊友很雷']
      }
      ]
    },
    {
      id: '004',
      title: '是否和Tomorin組一輩子樂團?',
      startDate: '2026-02-05',
      endDate: '2026-08-31',
      status: 'notStarted',
      completedDate: new Date(),
      questions: [
      {
        id: 'q1',
        title: '一輩子喔？',
        type: 'radio',
        options: ['下輩子也陪你','太沉重了','saki醬說要解散']
      },
      {
        id: 'q2',
        title: '一輩子樂團喔:):):):)',
        type: 'text'
      }
      ]
    }
  ]
  // files

  getAll() {
    return this.questionnares;
  }

  getById(id: string) {
    return this.questionnares.find(q => q.id === id);
  }

  add(questionnaire: questionnare) {
  this.questionnares.push(questionnaire);
  }

  // 刪除指定 ID 的問卷
  deleteById(id: string) {
  this.questionnares = this.questionnares.filter(q => q.id !== id);
  // 如果你有對接後端 API，這裡會是 HttpClient.delete(...)
  }

  //儲存正在編輯的問卷
  updateQuestionnaire(updatedData: questionnare) {
    const index = this.questionnares.findIndex(q => q.id === updatedData.id);
    if (index !== -1) {
      // 找到對應的 ID，用新資料替換舊資料
      this.questionnares[index] = { ...updatedData };
      console.log('Service 收到更新：', this.questionnares[index]);
      return true;
    }
    return false;
  }
}
