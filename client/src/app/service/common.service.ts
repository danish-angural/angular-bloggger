import { Post } from './../models/post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class CommonService {
	public postEdit_Observable = new Subject();
	public postAdded_Observable = new Subject();

	public post_to_be_edited;
 
	constructor(){
	 this.post_to_be_edited = new Post();
	}

	notifyPostAddition(){
		this.postAdded_Observable.next();
	}

	notifyPostEdit(){
		this.postEdit_Observable.next();
	}
	 
	setPostToEdit(post: Post){
		this.post_to_be_edited = post;
		this.notifyPostEdit();
	}
}