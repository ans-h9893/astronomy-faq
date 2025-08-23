import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpressMongoService {

  constructor(private http: HttpClient) { }

  create(data: any) {
    return this.http.post('https://astronomy-faq.onrender.com/create',
      { data });
  }

  batchLoad(data: any) {
    return this.http.post('https://astronomy-faq.onrender.com/batchLoad',
      { data });
  }

  insert(data: any) {
    return this.http.post('https://astronomy-faq.onrender.com/insert',
      { data });
  }

  retrieve() {
    return this.http.get('https://astronomy-faq.onrender.com/retrieve',
      { });
  }

  update(id: any,data: any) {
    return this.http.put('https://astronomy-faq.onrender.com/update',
      {id, data});
  } 

  delete(data: any) {
    return this.http.post('https://astronomy-faq.onrender.com/delete',
      { data });
  }

  deleteAll() {
    return this.http.delete('https://astronomy-faq.onrender.com/deleteAll',
      { });
  }
}
