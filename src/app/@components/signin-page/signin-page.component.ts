import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-signin-page',
  imports: [FormsModule],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent {
  constructor(private router: Router) {}
  account="";
  password="";
  reminder="";
  count = 0;

  signin(){
      this.count ++ ;

      if (this.account === "123456789" && this.password === "abcdefghi")
      {
        this.count = 0;
        this.router.navigate(['/userpage']);
      }
      else if (this.account !== "123456789" && this.password !== "abcdefghi" && this.count < 3 )
      {
        this.reminder = "帳號或密碼錯誤";
      }
      else if (this.account !== "123456789" && this.password !== "abcdefghi" && this.count >= 3)
      {
        this.reminder = "帳號或密碼錯誤，您無法再輸入密碼";
      }
  }


}
