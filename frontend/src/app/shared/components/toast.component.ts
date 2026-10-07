import {Component,Input} from '@angular/core';import {NgIf} from '@angular/common';
@Component({selector:'mc-toast',standalone:true,imports:[NgIf],template:`<div *ngIf="message" class="toast" [class.error]="error">{{message}}</div>`})export class ToastComponent{@Input()message='';@Input()error=false;}
