# HiDatepicker
Hi datepicker is Angular datepicker component.


## Installation:

Install hi-date via `npm`

````shell
npm install hi-date --save
````

## Integration

```ts
// app.module.ts
import { HiDateModule } from 'hi-date';

@NgModule({
  ...
  imports: [ HiDateModule ]
  ...
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  date: any;

  constructor() {
  }
}

// app.component.html
<hi-datepicker [(ngModel)]="date" [expanded]="true" [persianCalendar]="true"></hi-datepicker>
```

## Demo
[Demo](https://aroin.github.io/hidate-demo/)
