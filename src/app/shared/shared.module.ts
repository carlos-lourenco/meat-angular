import { RestaurantService } from './../restaurants/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { OrderService } from './../order/order.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';

import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { RadioComponent } from './radio/radio.component';
import { InputComponent } from './input/input.component';
import { RatingComponent } from './rating/rating.component';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service'
import { LoginService } from '../security/login/login.service';
import { LoggedInGuard } from '../security/loggedin.guard';
import { LeaveOrderGuard } from 'app/order/leave-order-guard';
import { AuthInterceptor } from 'app/security/auth.interceptor';

@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports:[
       FormsModule,
       ReactiveFormsModule,
       CommonModule
    ],
    exports: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers: [
                OrderService, 
                ShoppingCartService, 
                RestaurantService, 
                NotificationService,
                LoginService,
                LoggedInGuard,
                LeaveOrderGuard,
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
                ]
        }
    }
}