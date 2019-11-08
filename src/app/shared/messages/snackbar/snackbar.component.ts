import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from '../notification.service';
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger ('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
      
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!'

  snackVisibility: string = 'hidden';

  constructor(
    private notificationService: NotificationService
  ) { } 

  ngOnInit() {
    /* O componente se inscreve no serviço de notificação para receber a mensagem de quem está publicando
    o evento notify 
    O switchMap efetua um unsubscribe do timer quando chega uma nova mensagem, se o mesmo estiver ativo, e se inscreve novamente,
    fazendo com que o timer seja executado de forma única e integral.*/

    this.notificationService.notifier
      .do(message => {
        this.message = message;
        this.snackVisibility = 'visible'
      }).switchMap(message => Observable.timer(3000))
        .subscribe(timer => this.snackVisibility = 'hidden')
  }

}

/* *** código antigo que tinha problema de concorrência de subscribes, onde um evento apagaga a mensage do outro.

this.notificationService.notifier.subscribe(
  message => {
    this.message = message;
    this.snackVisibility = 'visible'
    Observable.timer(3000).subscribe(
      timer => this.snackVisibility = 'hidden' )  })
 */