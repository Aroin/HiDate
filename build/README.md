# HiDatepicker
Hi datepicker is Angular datepicker component.

[![NPM](https://nodei.co/npm/hi-date.png?downloads=true&stars=true)](https://nodei.co/npm/hi-date/)

## [Demo](https://aroin.github.io/hidate-demo/)

Check out [the live demo](https://aroin.github.io/hidate-demo/).

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

#### Properties (optional)
**`class`** - [**`?string`**] 

String that sets class for ui datepicker. (defaults to null - blue color)
```
  success = green
  warning = yelow
  danger  = red
```
**`persianCalendar`** - [**`?boolean`**] 

Boolean that sets jalaali calendar for datepicker and persian language UI.(defaults to false)

**`time`** - [**`?boolean`**] 

Boolean that sets Timepicker active.(defaults to false)


**`opended`** - [**`?boolean`**] 

Boolean that sets open datepicker.(defaults to false)


**`alwaysOpened`** - [**`?boolean`**] 

Boolean that sets always opened datepicker.(defaults to false)

**`firstWeekdaySaturdat`** - [**`?boolean`**] 

Boolean that sets for start datepicker as Saturday.(defaults to false)

**`expanded`** - [**`?boolean`**] 

Boolean that sets expanded datepicker.(defaults to false)


**`format`** - [**`?boolean`**] 

Boolean that sets ngModel format output [time format standard].(defaults to false)

Example : 
```
  Year : YYYY 2017
  Year : jYYYY 1397
  Month : MM Aug
  Month : jMM مرداد
```

**`viewFormat`** - [**`?boolean`**] 

Boolean that sets format view on datepicker [time format standard].(defaults to false)

**`offAMOrPM`** - [**`?boolean`**] 

Boolean that sets turn off AM or PM mode when time property active.(defaults to false)

**`minDate`** - [**`?HiDate`**] 

HiDate that sets minimum select date.(defaults to null)

**`maxDate`** - [**`?HiDate`**] 

HiDate that sets maximum select date.(defaults to null)


## HiDate 
```ts
/**
 * for example :
 *
 * { 'year': 1395, 'month': 7, 'day': 8 }
 */

interface HiDate{
    day: number;
    month: number;
    year: number;
}
```