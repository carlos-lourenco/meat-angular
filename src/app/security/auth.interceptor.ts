import { LoginService } from './login/login.service';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        //private loginService: LoginService, <<< Isso dá erro de parse!
        private injector: Injector, // isso resolve o problema com injeção manual...
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        const loginService = this.injector.get(LoginService); // ..dessa forma
        if (loginService.isLoggedIn()) {
            const authRequest = request.clone(
                {setHeaders:{'Authorization': `Bearer ${loginService.user.accessToken}`}})

            
            return next.handle(authRequest);
        } else {
            return next.handle(request);
        }
    }
}