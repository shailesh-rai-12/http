import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn:'root',
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request on its way");
    const modifyReq=req.clone({headers:req.headers.append('Auth','xyz')});
    return next.handle(modifyReq).pipe(tap(event=>{
             console.log(event);
                //response intercepting
            if(event.type==HttpEventType.Response){
              console.log("Response arrived",event.body);
              
            }
    }));
    
  }
}
