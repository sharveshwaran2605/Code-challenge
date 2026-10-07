import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/models';
@Injectable({providedIn:'root'})
export class UserService {
  constructor(private api:ApiService){}
  me():Observable<User>{return this.api.get<User>('/users/me');}
  list():Observable<User[]>{return this.api.get<User[]>('/users');}
  create(user:unknown):Observable<User>{return this.api.post<User>('/users',user);}
  update(id:string,user:unknown):Observable<User>{return this.api.put<User>(`/users/${id}`,user);}
  remove(id:string):Observable<void>{return this.api.delete<void>(`/users/${id}`);}
}
