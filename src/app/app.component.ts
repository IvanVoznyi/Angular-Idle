import { Component, OnInit } from '@angular/core';
import { auditTime, filter, fromEvent, interval, map, merge, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  idleMinutes = 0.5;

  ngOnInit(): void {
    const events = ['click', 'scroll', 'mousemove', 'keydown', 'wheel', 'resize']

    const observableEvents = events.map((event) => fromEvent(document, event))

    const seconds = 60;

    merge(...observableEvents).pipe(
      auditTime(500),
      switchMap(() => interval(1000).pipe(take(seconds * this.idleMinutes))),
      map(tick => tick + 1),
      filter(tick => tick === seconds * this.idleMinutes)
    ).subscribe(() => {
      alert(`The site was inactive for ${this.idleMinutes} minute${this.idleMinutes > 1 ? 's' : ''}`)
    });
  }
}
