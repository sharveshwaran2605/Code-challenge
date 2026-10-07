import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar.component';
import { AuthService } from './core/services/auth.service';
@Component({selector:'mc-root',standalone:true,imports:[RouterOutlet,NavbarComponent],template:`<div class="app-shell"><mc-navbar></mc-navbar><main class="page"><router-outlet></router-outlet></main></div>`})
export class AppComponent { constructor(public auth:AuthService){} }
