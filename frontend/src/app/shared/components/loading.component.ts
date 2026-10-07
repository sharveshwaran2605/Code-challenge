import {Component,Input} from '@angular/core';
@Component({selector:'mc-loading',standalone:true,template:`<div class="loading"><span class="spinner"></span><span>{{message}}</span></div>`})export class LoadingComponent{@Input()message='Loading...';}
