import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button'
import { ShowPostService } from '../show-post/show-post.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ShowPostService]
})
export class HomeComponent {
    public username;
    myposts;
    @ViewChild('addPost') addBtn: ElementRef;
 
    constructor(private commonService: CommonService, private router: Router, private showpostservice: ShowPostService){
        this.username=localStorage.getItem('loggedInUser');
        if(!localStorage.getItem('loggedInUser')){
            this.router.navigate(['/']);
        }
         
        this.commonService.postEdit_Observable.subscribe(res => {
            this.addBtn.nativeElement.click();
        });
       this.showpostservice.getMyPosts(this.username).subscribe(res=>{
           this.myposts=res;
           console.log(this.myposts);
           
       })
 
    }
 
    logout(){
        localStorage.removeItem('loggedInUser');
        this.router.navigate(['/']);
    }
    
   
}