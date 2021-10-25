import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts = [];
  isFectching = false;
  error=null;
  private errorSub:Subscription;

  constructor(private postService:PostsService) {}
  
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  ngOnInit() {
   this.errorSub=this.postService.error.subscribe(errorMessage=>{
      this.error=errorMessage;
    });

    this.postService.fetchPosts().subscribe(posts=>{
      this.isFectching=false;
      this.loadedPosts=posts;
     },error=>{
        this.error=error.message;
     });
  }

  onCreatePost(postData:Post) {
    // Send Http request
    // console.log(postData);
    this.postService.createAndStorePost(postData.title,postData.content);
   
  }

  onFetchPosts() {
    // Send Http request
    this.isFectching=true;
    this.postService.fetchPosts()
        .subscribe(posts=>{
          this.isFectching=false;
          this.loadedPosts=posts;
         },error=>{
          this.isFectching=false;
            this.error=error.message;
         });

    
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
    .subscribe(data=>{
      this.loadedPosts=[];
    })
    

  }

  onHandleError(){
    this.error=null;
  }
}
