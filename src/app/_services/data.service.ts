import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  farmers$ = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) { }

  getFarmers() {
    
  }
}
