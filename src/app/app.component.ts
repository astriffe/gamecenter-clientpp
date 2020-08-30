import {Component, OnDestroy} from '@angular/core';
import 'moment-timezone';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public loading: boolean;
  private destroy$ = new Subject<void>();

  private supportedRouterEvents = [NavigationStart, NavigationEnd, NavigationCancel, NavigationError];

  constructor(private router: Router) {
    router.events.pipe(
      filter(routerEvent => !!this.supportedRouterEvents.find(supportedEvent => routerEvent instanceof supportedEvent)),
      takeUntil(this.destroy$)
    ).subscribe(routerEvent => {
      routerEvent instanceof NavigationStart ? this.loading = true : this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}

