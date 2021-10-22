import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // console.log(postData);
    this.http.post(
      'https://angular-two-55096-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      postData
      ).subscribe((responseData)=>{
        console.log(responseData);
      })
  }

  onFetchPosts() {
    // Send Http request
    this.http.get<{[key:string]:Post}>('https://angular-two-55096-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
    .pipe(map(responseData=>{
          const postArr:Post[] = [];
          for(const key in responseData){
                if(responseData.hasOwnProperty(key)){
                  postArr.push({...responseData[key],id:key});
                }  
          }
          return postArr;
      })
    )
    .subscribe((posts=>{
      this.loadedPosts=posts;
      
    }))
  }

  onClearPosts() {
    // Send Http request
  }
}
