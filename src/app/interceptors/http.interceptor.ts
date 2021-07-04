import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as collections from './../mockData/collection.json';
import * as bookmarks from './../mockData/bookmarks.json';
import * as tags from './../mockData/tags.json';

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted request' + request.url);
        return next.handle(request);
        // switch (request.url) {
        //     case '/bookmarks':
        //         return of(new HttpResponse({ status: 200, body: ((bookmarks) as any).default }));
        //     case '/tags':
        //         return of(new HttpResponse({ status: 200, body: ((tags) as any).default }));
        //     default:
        //         next.handle(request);
        // }


    }
}