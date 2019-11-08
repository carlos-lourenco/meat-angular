import { LoginService } from './login/login.service';
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(
        private loginservice: LoginService,
    ) {}

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginservice.isLoggedIn()
        if (!loggedIn) {
            this.loginservice.handleLogin(`/${path}`);
        }
        return loggedIn;
    }

    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path);
    }

    /* 
        ActivatedRouteSnapshot: Copia da rota que foi ativada
        RouterStateSnapshot: Arvore de todas as rotas que foram ativadas até chegar na nossa
    */

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
         return this.checkAuthentication(activatedRoute.routeConfig.path);
    }
}