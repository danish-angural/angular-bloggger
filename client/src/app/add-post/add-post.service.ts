import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({providedIn: 'root'})
export class AddPostService {

	constructor(private http: HttpClient){

	}
	
	addPost(post: Post){
		console.log("at post-service", post);
		return this.http.post('/api/post/createPost',{
			title : post.title,
			description : post.description,
			author: post.author,
			date_created: post.date_created
		})
	}
	updatePost(post: Post){
		return this.http.post('/api/post/updatePost',{
			id: post.id,
			title : post.title,
			description : post.description
		})
	}

}