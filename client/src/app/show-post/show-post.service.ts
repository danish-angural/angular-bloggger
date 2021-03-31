import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
 
@Injectable()
export class ShowPostService {
 
    constructor(private http: HttpClient){
 
    }
     
    getAllPost(){
        return this.http.get('/api/post/getAllPost',{})
    }
 
    deletePost(id){
        return this.http.delete('/api/post/deletePost/', {params: {'id': id}})
    }
    getOnePost(id){
        console.log(id);
        return this.http.get('/api/post/getPost/', {params: {'id': id}})
    }
    getMyPosts(username){
        console.log(username);
        return this.http.get('/api/post/getMyPosts/', {params: {'username': username}})
    }
}