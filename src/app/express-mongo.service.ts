import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpressMongoService {

  constructor(private http: HttpClient) { }

  create(data: any) {
    return this.http.post('https://my-express-api.onrender.com/api/create',
      { data });
  }

  batchLoad(data: any) {
    return this.http.post('https://my-express-api.onrender.com/api/batchLoad/',
      { data });
  }

  insert(data: any) {
    return this.http.post('https://my-express-api.onrender.com/api/insert/',
      { data });
  }

  retrieve() {
    return this.http.get('https://my-express-api.onrender.com/api/retrieve/',
      { });
  }

  update(id: any,data: any) {
    return this.http.put('https://my-express-api.onrender.com/api/update/',
      {id, data});
  } 

  delete(data: any) {
    return this.http.post('https://my-express-api.onrender.com/api/delete/',
      { data });
  }

  deleteAll() {
    return this.http.delete('https://my-express-api.onrender.com/api/deleteAll/',
      { });
  }
}
