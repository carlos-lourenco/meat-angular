import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { RadioOption } from './../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { Order, OrderItem } from './order.model';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import 'rxjs/add/operator/do';

@Component({
  selector: 'mt-order', 
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;

  delivery: number = 8;

  orderId: string;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  numberPattern = /^[0-9]*$/

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuild: FormBuilder
    ) { }

  ngOnInit() {
    this.orderForm = this.formBuild.group({
      name: this.formBuild.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuild.control('', [Validators.required, Validators.email]),
      emailConfirmation: this.formBuild.control('', [Validators.required, Validators.email]),
      address: this.formBuild.control('',[Validators.required, Validators.minLength(5)]),
      number: this.formBuild.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuild.control(''),
      paymentOption: this.formBuild.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo})
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch :true}
    }

    return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems() {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increadQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItens = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
      this.orderService.checkOrder(order)
      .do((orderId: string) => this.orderId = orderId)
      .subscribe(
        (orderId: string) => {
          this.router.navigate(['/order-summary'])
          this.orderService.clear();
        }
      )
    console.log(order);
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }

}
