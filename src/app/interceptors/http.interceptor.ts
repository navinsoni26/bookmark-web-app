import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as collections from './../mockData/collection.json';
import * as bookmarks from './../mockData/bookmarks.json';

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        console.log('Intercepted request' + request.url);
        switch(request.url) {
            case '/bookmarks' : 
            return of(new HttpResponse({ status: 200, body: ((bookmarks) as any).default }));
            case '/collections' :
                return of(new HttpResponse({ status: 200, body: ((collections) as any).default }));
            default:
                return of(new HttpResponse({ status: 200, body: ((collections) as any).default }));
        }
        

    }
}