import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LoginResponse, User } from '../models/models';

@Injectable({providedIn:'root'})
export class AuthService {
  private readonly tokenKey='mc_token'; private readonly userKey='mc_user';
  private userSubject = new BehaviorSubject<User|null>(this.readUser());
  readonly user$ = this.userSubject.asObservable();
  constructor(private api:ApiService) {}
  login(login:string,password:string,role:string):Observable<LoginResponse>{
    return this.api.post<LoginResponse>('/auth/login',{login,password,role}).pipe(tap(r=>{localStorage.setItem(this.tokenKey,r.token);localStorage.setItem(this.userKey,JSON.stringify(r.user));this.userSubject.next(r.user);}));
  }
  logout(){localStorage.removeItem(this.tokenKey);localStorage.removeItem(this.userKey);this.userSubject.next(null);}
  token(){return localStorage.getItem(this.tokenKey);}
  isLoggedIn(){return !!this.token();}
  currentUser(){return this.userSubject.value;}
  isAdmin(){return this.currentUser()?.role==='admin';}
  private readUser():User|null{try{return JSON.parse(localStorage.getItem(this.userKey)||'null') as User|null;}catch{return null;}}
}
