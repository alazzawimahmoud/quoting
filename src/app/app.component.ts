import { Component, OnInit, Inject} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  url = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1';
  qoute$;
  modes = [
    {name : 'fancy-mode'},
    {name : 'normal-mode'},
    {name : 'dark-mode'}
  ];
  activeMode : any = {name: 'fancy-mode'};
  constructor (private http: Http) {}
  switchMode(selectedMode) {
    document.body.classList.remove(this.activeMode.name);
    this.activeMode = selectedMode;
    document.body.classList.toggle(this.activeMode.name);
  }
  ngOnInit(){
    this.switchMode(this.activeMode);
    const headers = new Headers({ 'X-Mashape-Key': 'BZ2aO1hLwhmshyVeJxLqoa9pev9Cp1XsDCQjsnWApMQfHvJ0Pv', 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const getQoute$ = this.http.get(this.url, options);
    const initial$ = Observable.from(getQoute$);
    const fromInterval$ = Observable.interval(15000).switchMap(() => getQoute$);
    return this.qoute$ = Observable.merge(initial$, fromInterval$).map(d => d.json()[0]);
  }

}
