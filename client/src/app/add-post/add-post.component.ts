
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddPostService } from './add-post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { ShowPostService } from '../show-post/show-post.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService, ShowPostService ]
})
export class AddPostComponent {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  public post : Post;
  public present_posts: number;
  constructor(private addPostService: AddPostService, private router: Router, private commonService: CommonService, private showpostservice: ShowPostService) {
    this.post = new Post();
  }
  addPost() {
  	if(this.post.title && this.post.description){
      if(this.post._id){
        this.post.author=localStorage.getItem('loggedInUser');
        var date = (new Date());
        var dated = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds()
        this.post.date_created=dated;
        this.addPostService.updatePost(this.post).subscribe(res =>{
        this.commonService.notifyPostAddition();
        });
      }
      else{
        this.post.author=localStorage.getItem('loggedInUser');
        var date = (new Date());
        var dated = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds()
        this.post.date_created=dated;
        console.log(this.post);
  		this.addPostService.addPost(this.post).subscribe(res =>{
        this.commonService.notifyPostAddition();
      });
    }
    this.post=new Post();
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