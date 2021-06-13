import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockHttpCalIInterceptor } from './interceptors/http.interceptor';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { BookmarkCardComponent } from './components/bookmark-card/bookmark-card.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { CollectionListDialogComponent } from './components/collection-list-dialog/collection-list-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { RecentlySharedComponent } from './components/recently-shared/recently-shared.component';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    HeaderComponent,
    MainComponent,
    BookmarkListComponent,
    BookmarkCardComponent,
    CollectionListComponent,
    DialogComponent,
    ContextMenuComponent,
    CollectionListDialogComponent,
    SearchResultComponent,
    TagListComponent,
    RecentlySharedComponent,
    BookmarkFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MockHttpCalIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
