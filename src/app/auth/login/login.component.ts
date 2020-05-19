import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLoading = false;

constructor(
  public authservicehandle: AuthService
){}

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authservicehandle.login(form.value.email, form.value.password);
  }
}
