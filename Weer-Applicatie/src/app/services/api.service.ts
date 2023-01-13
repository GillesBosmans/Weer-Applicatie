import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  readonly #apiKey = environment.API_KEY;
  readonly #baseURL = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  getWeerDataByLatLong(latitude: number, longitude: number): Observable<any> {
    let url = `${this.#baseURL}weather?lat=${latitude}&lon=${longitude}&units=metric&exlude=minutely,hour,alert&lang=nl&appid=${this.#apiKey}`;
    return this.http.get(url)
  }
  getLatitudeLongitude(location: string): Observable<any> {
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${this.#apiKey}`
    return this.http.get(url)
  }
  getWeerDataBySearchLocation(location: string): Observable<any> {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&exlude=minutely,hour,alert&lang=nl&appid=${this.#apiKey}`
    return this.http.get(url)
  }

}
