
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent {

  public user : User;

  constructor(private loginService: LoginService, private router: Router) {
  	this.user = new User();
    if(localStorage.getItem('loggedInUser'))
    this.router.navigate(['/home'])
  }

  validateLogin() {
  	if(this.user.username && this.user.password) {
  		this.loginService.validateLogin(this.user).subscribe(result => {
        if(result['status'] === 'success') {
          localStorage.setItem('loggedInUser', this.user.username)
          this.router.navigate(['/home']);
          console.log(result);
        } else {
          alert('Wrong username password');
        }
        
      }, error => {
        console.log('error is ', error);
      });
  	} else {
  		alert('enter user name and password');
  	}
  }
  register(){
    if(this.user.username && this.user.password){
      this.loginService.register(this.user).subscribe(result=>{
        console.log(result)
        if(result['status']==='success'){
          localStorage.setItem('loggedInUser', this.user.username)
          this.router.navigate(['/home']);
        }else alert('username '+this.user.username+' is taken.')
      })
    }
    else{
      alert('enter username and password')
    }
  }

}