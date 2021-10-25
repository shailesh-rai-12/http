import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
 error =new Subject<string>();
  constructor(private http:HttpClient) { }

  createAndStorePost(title:string,content:string)
  {
    const postData:Post={title:title,content:content}
    this.http.post(
      'https://angular-two-55096-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      postData,
      {
        observe:'response'
      }
      ).subscribe((responseData)=>{
        console.log(responseData);
      },error=>{
        this.error.next(error.message);
      })
  }

  fetchPosts()
  {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print','pretty');
    searchParams = searchParams.append('custom','key');

    return this.http
              .get<{[key:string]:Post}>('https://angular-two-55096-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
              {
                headers:new HttpHeaders({'custom-header':'Hello World'}),
                params:searchParams
              })
              .pipe(map(responseData=>{
                const postArr:Post[] = [];
                for(const key in responseData){
                      if(responseData.hasOwnProperty(key)){
                        postArr.push({...responseData[key],id:key});
                      }  
                }
                return postArr;
            }),
            catchError(errorRes=>{
              //something with error
              //console.log(errorRes);
              return throwError(errorRes);
            })
          );
    
  }

  deletePosts(){
    return this.http.delete('https://angular-two-55096-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
    {
        observe:'events'
    }).pipe(tap(event=>{
      
      if(event.type==HttpEventType.Response){
        console.log(event.body);
      }
      if(event.type==HttpEventType.Sent){
        console.log(event);
      }
      
    }))
   
  }
}
