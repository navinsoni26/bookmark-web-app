import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SERVER_IP } from 'src/environments/environment';
import { Collection } from '../models/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  collectionSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  /**
   * Get list of all collections
   */
  getCollections() {
    const url = `${SERVER_IP}/collections`;
    return this.http.get(url).pipe(
      tap((res: any) => {
        this.collectionSubject.next(res);
      })
    );
  }

  updateCollectionSubject() {
    this.getCollections().subscribe(
      res => console.log(res)
    )
  }

  /**
   * Get Collection detail by it's ID
   * @param collectionId ID of collection
   */
  getCollectionById(collectionId: string) {

  }

  /**
   * Add a new Collection
   * @param collection Collection to add
   */
  createCollection(requestBody: any) {
    const url = `${SERVER_IP}/collection`;
    // return this.http.put(`http://localhost:5000/collection/${requestBody.id}`, requestBody);
    return this.http.post(url, requestBody);
  }

  /**
   * Edit a collection
   * @param collection Collection to Edit
   */
  editCollection(requestBody: any) {
    const url = `${SERVER_IP}/collection/${requestBody.id}`;
    return this.http.put(url, requestBody);
  }

  /**
   * Delete one or more collection
   * @param collectionIds id of collection to delete
   */
  deleteCollections(collectionIds: string[]) {
    // const url = 
  }

  deleteCollection(collectionId: string): Observable<any> {
    const url = `${SERVER_IP}/collection/${collectionId}`;
    return this.http.delete(url);
  }

  /**
   * Set hidden property of collections
   * @param hidden boolean, whether to show or hide collection
   * @param collectionIds 
   */
  hideOrShowCollections(hidden: boolean, collectionIds: string[]) {

  }

}
