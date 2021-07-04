import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  collections = [];
  constructor(private http: HttpClient) { }

  getBookmarks() {
    return this.http.get('http://localhost:5000/bookmarks');
  }

  getCollections() {
    return this.http.get('http://localhost:5000/collections');
  }

  getTags() {
    return this.http.get('http://localhost:5000/tags');
  }

  postCollection(requestBody: any) {
    return this.http.post('http://localhost:5000/collection', requestBody);
  }

  putCollection(requestBody: any) {
    return this.http.put(`http://localhost:5000/collection/${requestBody.id}`, requestBody);
  }

  postBookmark(requestBody: any) {
    return this.http.post('http://localhost:5000/bookmark', requestBody)
  }
}
