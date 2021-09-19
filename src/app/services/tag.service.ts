import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SERVER_IP } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tagSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getTags() {
    const url = `${SERVER_IP}/tags`;
    return this.http.get(url).pipe(
      tap((res: any) => {
        this.tagSubject.next(res);
      })
    );
  }

  addTag(tag: any) {

  }

  editTag(tag: any) {

  }

  deleteTags(tagIds: string[]) {

  }
  
}
