import { LoginService } from './security/login/login.service';
import { NotificationService } from 'app/shared/messages/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(
        private ns: NotificationService,
        private injector: Injector,
        private zone: NgZone,
    ) {
        super();
    }
    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message;
            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 401:
                        this.injector.get(LoginService).handleLogin();
                        break;
                    case 403:
                        this.ns.notify(message || 'Não autorizado.')
                        break;
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado .')
                        break;

                    default:
                        break;
                }

            })
        }
        super.handleError(errorResponse);
    }
}