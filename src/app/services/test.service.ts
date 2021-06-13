import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getBookmarks() {
    return this.http.get('/bookmarks');
  }

  getCollections() {
    return this.http.get('/collections');
  }

  getTags() {
    return this.http.get('/tags');
  }
}
