import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model"
import { Injectable } from "@angular/core";
import { NotificationService } from "app/shared/messages/notification.service";

@Injectable()
export class ShoppingCartService {
 
    public items: CartItem[] = [];
    
    clear() {
        this.items = []
    }

    constructor(
        private notificationService: NotificationService
    ) {}
    
    addItem(item: MenuItem){
        let foundItem = this.items.find((mItem) =>
        mItem.menuItem.id === item.id);

        if (foundItem) {
            this.increaseQty(foundItem)
        } else {
            this.items.push(new CartItem(item));
        }
        /* o método puiblica a mensagem pelo evento [notify] para quem estiver inscrito pode receber
        a mensagem */
        this.notificationService.notify(`Você adicionou o item ${item.name}`);
    }
    
    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1);
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`);
    }
    
    total(): number { 
        return this.items
            .map(item => item.value())
            .reduce((prev, value) => prev + value, 0);
    }

    increaseQty(item: CartItem) {
        item.quantity = item.quantity + 1;
    }
    
    decreaseQty(item: CartItem) {
        item.quantity = item.quantity - 1;
        if (item.quantity === 0) {
            this.removeItem(item);
        }
    }
}