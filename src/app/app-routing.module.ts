import { RecentlySharedComponent } from './components/recently-shared/recently-shared.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';

const routes: Routes = [
  { path: 'recently-shared', component: RecentlySharedComponent },
  { path: 'tags', component: TagListComponent },
  { path: 'collections', component: CollectionListComponent },
  { path: 'bookmarks', component: BookmarkListComponent},
  { path: 'bookmarks/:id', component: BookmarkListComponent }

  // {path: 'collection'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
