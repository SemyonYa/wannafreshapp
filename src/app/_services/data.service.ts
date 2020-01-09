import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Farmer } from '../_models/farmer';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  farmers$ = new BehaviorSubject<Farmer[]>([]);

  constructor(private http: HttpClient) { }

  getFarmers() {
    this.http.get(environment.host + '/data/farmers')
      .pipe(
        map(
          (data: any[]) => data.map(f => new Farmer(f.id, f.name, f.description, f.email, f.min_cost, f.delivery, f.img))
        )
      )
      .subscribe(
        (data: Farmer[]) => {
          this.farmers$.next(data);
        }
      );
  }
}
