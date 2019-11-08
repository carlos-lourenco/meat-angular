import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import { MEAT_API } from './../../app.api';
import { User } from './user.model';

@Injectable()
export class LoginService {

    user: User;
    lastUrl: string;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {/* pega a ultima url navegada para passar ao login e, após , o mesmo voltará para onde estava */
        this.router.events.filter(e => e instanceof NavigationEnd)
                          .subscribe( (e: NavigationEnd) => this.lastUrl = e.url)

    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }
    login(email: string, password: string): Observable<any> {

        return this.http.post<User>(`${MEAT_API}/login`, 
            {email: email, password: password})
            .do(user => this.user = user)
    }

    /* Valor default caso não se passe nada no path */
    handleLogin(path: string = this.lastUrl){
        this.router.navigate(['/login', btoa(path)]);
    }

    logout() {
        this.user = undefined;
    }
}