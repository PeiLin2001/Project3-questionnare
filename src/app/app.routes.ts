import { Routes } from '@angular/router';
import { ListComponent } from './@components/list/list.component';
import { HomeComponent } from './@components/home/home.component';
import { SigninPageComponent } from './@components/signin-page/signin-page.component';
import { UserpageComponent } from './@components/userpage/userpage.component';
import { MagicConchShellComponent } from './@questionnares/magic-conch-shell/magic-conch-shell.component';
import { CreatNewdialogComponent } from './@component/creat-newdialog/creat-newdialog.component';
import { EditQuestionComponent } from './@components/edit-question/edit-question.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home',component:HomeComponent},
  {path: 'list',component:ListComponent},
  {path: 'signin',component:SigninPageComponent},
  {path: 'userpage',component:UserpageComponent},
  {path: 'question/:id',component:MagicConchShellComponent},
  {path: 'creatnew',component:CreatNewdialogComponent},
  {path: 'ed/:id',component:EditQuestionComponent},
];
