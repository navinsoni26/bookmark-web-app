import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PREFIX_URL, SERVER_IP } from 'src/environments/environment';
import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient) { }

  /**
   * Get all Bookmarks
   * @returns 
   */
  getBookmarks() {
    const url = `${SERVER_IP}/bookmarks`;
    return this.http.get(url);
  }

  /**
   * Get Bookmark by ID
   * @param id Bookmark Id
   */
  getBookmarkById(id: string) {
    const url = `${PREFIX_URL}/bookmark/${id}`;
    return this.http.get(url);
  }

  /**
   * Get Bookmark By Collection
   * @param collectionId Collection Id string
   */
  getBookmarksByCollection(collectionId: string) {
    const url = `${SERVER_IP}/bookmark/${collectionId}`;
    return this.http.get(url);
  }

  /**
   * Get Bookmarks by Tags
   * @param tagIds list of tag id's
   */
  getBookmarksByTags(tagIds: string[]) {
    const tagIdString = tagIds.join(',');
    const url = `${PREFIX_URL}/bookmark/tags?id=${tagIdString}`;
    return this.http.get(url);
  }

  /**
   * Get Bookmarks marked as favorite
   */
  getFavoriteBookmarks() {
    const url = `${PREFIX_URL}/bookmark/fav`;
    return this.http.get(url);
  }
  
  /**
   * Add a new Bookmark
   * @param bookmark Bookmark to save
   */
  addBookmark(bookmark: Bookmark) {
    const url = `${PREFIX_URL}/bookmark`;
    return this.http.post(url, bookmark);
  }

  /**
   * Edit existing Bookmark
   * @param bookmark Bookmark to edit
   */
  editBookmark(bookmark: Bookmark) {
    const url = `${PREFIX_URL}/bookmark/${bookmark.id}`;
    return this.http.put(url, bookmark);
  }

  /**
   * Delete one or more bookmarks
   * @param bookmarkIds Id of bookmarks to delete
   */
  deleteBookmarks(bookmarkIds: string[]) {
    
  }

  /**
   * Set Bookmarks as favorite
   * @param bookmarkIds ID of bookmarks to set as favorite
   */
  setBookmarksAsFav(bookmarkIds: string[]) {

  }

  /**
   * Remove bookmarks from favorites
   * @param bookmarkIds ID of bookmarks to remove from favorites
   */
  removeBookmarksFromFav(bookmarkIds: string[]) {

  }

  /**
   * Move one or more bookmarks to other collection
   * @param bookmarkIds id of bookmarks to move to other collection
   * @param collectionId ID of destination collection
   */
  moveBookmarksToCollection(bookmarkIds: string[], collectionId: string) {

  }

  /**
   * Add tags to one or more bookmarks
   * @param tagIds id of tags which are to be added to Bookmark
   * @param bookmarkIds bookmarkId's to which tags will be added
   */
  addTagsToBookmarks(tagIds: string[], bookmarkIds: string[]) {

  }

  /**
   * Remove all tags from bookmarks
   * @param bookmarkIds ID of bookmarks
   */
  removeTagsFromBookmarks(bookmarkIds: string[]) {

  }
}
