import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RecordItem } from '../models/models';
@Injectable({providedIn:'root'})
export class RecordService { constructor(private api:ApiService){} list(delay=1200):Observable<{data:RecordItem[];meta:{count:number;delayedByMs:number;processedAt:string}}>{return this.api.get('/records',{delay});} }
