import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowPostService } from './show-post.service';
import { Post } from '../models/post.model';
import { CommonService, } from '../service/common.service';
import {MatCardModule} from '@angular/material/card'
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  providers: [ ShowPostService ],
  styleUrls: ['./show-post.component.css'],

})
export class ShowPostComponent implements OnInit {
 
  @ViewChild('closeBtn') closeBtn: ElementRef;
  public posts : any [];
  public post_to_delete;
  username;
  constructor(private showPostService: ShowPostService, private commonService: CommonService) {
    this.username=localStorage.getItem('loggedInUser');
    console.log("username=",localStorage);
    
  }
 
  ngOnInit(){
    this.getAllPost();
 
    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllPost();
    });
    this.commonService.refresh().subscribe(res=>{
            this.getAllPost();
    });
  }
 
  setDelete(post: Post){
    console.log(post)
    this.post_to_delete = post;
  }
 
  cancel(){
    this.post_to_delete = null;
  }
 
  getAllPost(){
    this.showPostService.getAllPost().subscribe(result => {
        this.posts = result['data'];
    });
  }
 
  editPost(post: Post){
    this.commonService.setPostToEdit(post);
    this.getAllPost();
  }
 
  deletePost(){
    console.log(this.post_to_delete);
    this.showPostService.deletePost(this.post_to_delete._id).subscribe(res => {
      this.getAllPost();
    })
  }
  ShowMyPosts(){
    this.showPostService.getMyPosts(this.username);
  }
}