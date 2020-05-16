
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddPostService } from './add-post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService ]
})
export class AddPostComponent {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  public post : Post;
  constructor(private addPostService: AddPostService, private router: Router, private commonService: CommonService) {
    this.post = new Post();
  }

  addPost() {
  	if(this.post.title && this.post.description){
      if(this.post.id){
        this.post.author=localStorage.getItem('loggedInUser');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var date = mm + '/' + dd + '/' + yyyy;
        this.post.date_created=date;
        console.log(this.post);
        this.addPostService.updatePost(this.post).subscribe(res =>{
        this.commonService.notifyPostAddition();
        });
      }
      else{
        this.post.author=localStorage.getItem('loggedInUser');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var date = mm + '/' + dd + '/' + yyyy;
        this.post.date_created=date;
        console.log(this.post);
  		this.addPostService.addPost(this.post).subscribe(res =>{
  			this.closeBtn.nativeElement.click();
      });
    }
  	} else {
  		alert('Title and Description required');
  	}
  }
  ngOnInit(){
    this.commonService.postEdit_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_edited;
    });
}

}