import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable()
export class RequestProvider {
  private headers: HttpHeaders;
  
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

  post(request : PostRequest): Observable<any> {
    return this.http.post(`${request.context}/${request.path}`, request.object, { headers: this.headers }).pipe(map((res: any) => res.json()));
  }
}

interface PostRequest{
  context : string,
  path : string,
  object : any,
}
