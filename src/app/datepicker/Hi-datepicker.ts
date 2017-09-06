import { i18n } from './i18n';
import {Component, ViewContainerRef, OnInit, Input, Output, EventEmitter, forwardRef} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as moment from 'moment-jalaali';

enum CalendarType {
  Solar,
  Gregorian
}

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HiDatePickerComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'hi-datepicker',
  templateUrl: './Hi-datepicker.component.html',
  styleUrls: ['./Hi-datepicker.css'],
  providers: [CALENDAR_VALUE_ACCESSOR]
})

export class HiDatePickerComponent implements ControlValueAccessor, OnInit {

  //====================Input==================
  @Input() class: string;
  @Input() expanded: boolean;
  @Input() opened: boolean;
  @Input() format: string;
  @Input() viewFormat: string;
  @Input() firstWeekdaySaturday: boolean;
  @Input() persianCalendar: boolean;
  @Input() time: boolean;
  @Input() alwaysOpened: boolean;
  @Input() hiddenButton: boolean;
  @Input()
  set minDate(date: HiDate){
    this._minDate = date;
    this.generateCalendar();
  }
  @Input()
  set maxDate(date: HiDate) {
    this._maxDate = date;
    this.generateCalendar();
  }
  @Input() initTime: any;
  //====================Output==================
  @Output() changeDate = new EventEmitter();
  //============================================
  private _date: any = moment();
  private _selectedDate: any = moment();
  private el: Element;
  private timeData = {hour: 10, minute: 20};
  private days: HiDatePicker[] = [];
  private _formatHeaderCalendar: string;
  private type: CalendarType;
  private isRTL: string;
  private isYearEdit: boolean = false;
  private AMOrPM: string = "am";
  private _minDate: HiDate;
  private _maxDate: HiDate;
  public tranlsate = {
    en: {
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        sun: "Sun",
        am: "AM",
        pm: "PM"
    },
    fa: {
        mon: "دوشنبه",
        tue: "سه شنبه",
        wed: "چهارشنبه",
        thu: "پنج شنبه",
        fri: "جمعه",
        sat: "شنبه",
        sun: "یک شنبه",
        am: "ق.ظ",
        pm: "ب.ظ"
    }
};

  constructor(viewContainerRef: ViewContainerRef) {
    this.el = viewContainerRef.element.nativeElement;
  }

  ngOnInit() {
    this.timeData = this.initTime || {hour: 10, minute: 20};
    this._maxDate = this._maxDate || {day: 0, month: 0, year: 0};
    this._minDate = this._minDate || {day: 0, month: 0, year: 0};
    this.persianCalendar = this.persianCalendar || false;
    this.time = this.time || false;
    this.alwaysOpened = this.alwaysOpened || false;
    if (this.alwaysOpened) this.opened = true;
    if (this.persianCalendar) {
      this.type = CalendarType.Solar;
      this.firstWeekdaySaturday = this.firstWeekdaySaturday || true;
    }
    else {
      this.type = CalendarType.Gregorian;
      this.firstWeekdaySaturday = this.firstWeekdaySaturday || false;
    }
    switch (this.type) {
      case CalendarType.Solar:
        moment.loadPersian();
        this._formatHeaderCalendar = 'jMMMM';
        this.format = this.format || 'x';
        this.viewFormat = this.viewFormat || ((this.time) ? 'jD jMMMM jYYYY h:m a' : 'jD jMMMM jYYYY');
        this.isRTL = " rtl";
        break;
      default:
        moment.locale('en');
        this._formatHeaderCalendar = 'MMMM';
        this.format = this.format || 'x';
        this.viewFormat = this.viewFormat || (this.time) ? 'D MMMM YYYY hh:mm a' : 'D MMMM YYYY';
        this.isRTL = "";
        break;
    }
    this.class = `ui-kit-calendar-container ${this.class}`;
    this.opened = this.opened || false;
    this.selectedDate = moment();
    this.value = moment()
    this.generateCalendar();

    // closed date-picker click page
    let body = document.querySelector('body');
    body.addEventListener('click', e => {
      if (!this.opened || !e.target) {
        return;
      }
      if (this.el !== e.target && !this.el.contains((<any>e.target))) {
        this.close();
      }
    }, false);
  }

  get value(): any {
    return this._date;
  }

  set value(value: any) {
    this._date = value;
  }

  get selectedDate() {
    return this._selectedDate;
  }

  set selectedDate(value: any) {
    this._selectedDate = value;
    this.onChange(this._selectedDate.format(this.format));
  }

  get year() {
    switch (this.type) {
      case CalendarType.Solar:
        return this.value.jYear();
      default:
        return this.value.year();
    }
  }

  set year(year: number) {
    switch (this.type) {
      case CalendarType.Solar:
        if (this.value.jYear() > year)
          this.subtract(this.value.jYear() - year, 'jYear');
        else if (this.value.jYear() < year) {
          this.add(year - this.value.jYear(), 'jYear');
        }
        break;
      default:
        if (this.value.year() > year)
          this.subtract(this.value.year() - year, 'year');
        else if (this.value.year() < year) {
          this.add(year - this.value.year(), 'year');
        }
        break;
    }
    this.generateCalendar();
  }

  subtract(count: number, type: string): void {
    this.value = this.value.subtract(count, type);
    this.generateCalendar();
  }

  add(count: number, type: string): void {
    this.value = this.value.add(count, type);
    this.generateCalendar();
  }

  get hour() {
    if (this.timeData.hour < 13) {
      this.AMOrPM = 'am';
      return this.timeData.hour;
    }
    else {
      this.AMOrPM = 'pm';
      return this.timeData.hour - 12;
    }
  }

  set hour(hour: number) {
    if (hour >= 0 && hour < 12) {
      if (this.AMOrPM == 'am')
        this.timeData.hour = hour;
      else
        this.timeData.hour = hour + 12;
      this.changeTime();
    }
  }

  get minute() {
    return this.timeData.minute;
  }

  set minute(minute: number) {
    if (minute >= 0 && minute < 60) {
      this.timeData.minute = minute;
      this.changeTime();
    }
  }

  changeTime(): void {
    let currentDay = this.days.filter(day => {
      if (day.selected == true) return true;
    })[0];
    if (currentDay == undefined) currentDay = this.days.filter(day => {
      if (day.today == true) return true;
    })[0];
    let selectedDate = moment();
    switch (this.type) {
      case CalendarType.Solar:
        selectedDate = moment(`${currentDay.day}.${currentDay.month}.${currentDay.year} ${this.timeData.hour}:${this.timeData.minute}`, 'jDD.jMM.jYYYY HH:mm');
        break;
      case CalendarType.Gregorian:
        selectedDate = moment(`${currentDay.day}.${currentDay.month}.${currentDay.year} ${this.timeData.hour}:${this.timeData.minute}`, 'DD.MM.YYYY HH:mm');
        break;
    }
    this.selectedDate = selectedDate;
  }

  generateCalendar() {
    switch (this.type) {
      case CalendarType.Solar:
        this.jalaliGenerateCalendar();
        break;
      case CalendarType.Gregorian:
        this.miladiGenerateCalendar();
        break;
      default:
        this.miladiGenerateCalendar();
    }
  }

  jalaliGenerateCalendar() {
    let date = moment(this._date);
    let month = date.jMonth();
    let year = date.jYear();
    let n: number = 1;
    let firstWeekDay = date.jDate(1).day();
    let lastDayMonth = moment.jDaysInMonth(year, month);

    if (this.firstWeekdaySaturday) {
      n = ((firstWeekDay + 6) % 6) * -1;
    } else {
      n = (((firstWeekDay + 6) % 6) - 2) * -1;
    }
    let dd = (lastDayMonth + (Math.abs(n) + 1)) % 7 ;
    let dayInit = dd > 0 ? lastDayMonth + (7 - dd) : lastDayMonth;


    this.days = [];
    for (let i = n; i <= dayInit; i += 1) {
      let currentDate = moment(`${i}.${month + 1}.${year}`, 'jDD.jMM.jYYYY');
      let today = (moment().isSame(currentDate, 'day') && moment().isSame(currentDate, 'month')) ? true : false;
      let selected : boolean = (this.selectedDate && this.selectedDate.isSame(currentDate,'day')) ? true : false;

      if (i > 0 && i <= lastDayMonth) {
        this.days.push(this.checkValidDate({
          day: i,
          month: month + 1,
          year: year,
          enabled: true,
          today: today,
          selected: selected
        }));
      } else {
        this.days.push({
          day: null,
          month: null,
          year: null,
          enabled: false,
          today: false,
          selected: false
        });
      }
    }
  }

  checkValidDate(d: HiDatePicker): HiDatePicker {
    if (this.checkChecker(this._maxDate) && this.checkChecker(this._minDate)) {
      if (this.validMinDate(d) && this.validMaxDate(d)) return d;
      else {
        d.enabled = false;
        return d;
      }

    } else if (this.checkChecker(this._minDate)) {
      if (this.validMinDate(d)) return d;
      else {
        d.enabled = false;
        return d;
      }

    } else if (this.checkChecker(this._maxDate)) {
      if (this.validMaxDate(d)) return d;
      else {
        d.enabled = false;
        return d;
      }
    }
    return d;
  }

  checkChecker(d: HiDate): boolean {
    if (d.year == 0 && d.month == 0 && d.day == 0) return false;
    return true;
  }

  validMaxDate(d: HiDatePicker): boolean {
    if (d.year < this._maxDate.year) return true;
    else if (d.year == this._maxDate.year && d.month < this._maxDate.month) return true;
    else if (d.year == this._maxDate.year && d.month == this._maxDate.month && d.day <= this._maxDate.day) return true;
    else false;
  }

  validMinDate(d: HiDatePicker): boolean {
    if (d.year > this._minDate.year) return true;
    else if (d.year == this._minDate.year && d.month > this._minDate.month) return true;
    else if (d.year == this._minDate.year && d.month == this._minDate.month && d.day >= this._minDate.day) return true;
    else false;
  }

  miladiGenerateCalendar() {
    let date = moment(this._date);
    let month = date.month();
    let year = date.year();
    let n: number = 1;
    let firstWeekDay = date.date(1).day() as number;
    let lastDayMonth = date.daysInMonth();

    n = (firstWeekDay - 1) * -1;

    let dayInit = lastDayMonth + Math.abs(n);

    this.days = [];
    for (let i = n; i <= dayInit; i += 1) {
      let currentDate = moment(`${i}.${month + 1}.${year}`, 'DD.MM.YYYY');
      let today = (moment().isSame(currentDate, 'day') && moment().isSame(currentDate, 'month')) ? true : false;
      let diff = this.selectedDate.diff(currentDate, 'day');
      let selected = (diff == 0) ? true : false;

      if (i > 0 && i <= lastDayMonth) {
        this.days.push({
          day: i,
          month: month + 1,
          year: year,
          enabled: true,
          today: today,
          selected: selected
        });
      } else {
        this.days.push({
          day: null,
          month: null,
          year: null,
          enabled: false,
          today: false,
          selected: selected
        });
      }
    }
  }

  selectDate(e: MouseEvent, i: number, enabled: boolean) {
    if (enabled) {
      e.preventDefault();
      let date: HiDatePicker = this.days[i];
      let selectedDate = moment();
      switch (this.type) {
        case CalendarType.Solar:
          if (this.time)
            selectedDate = moment(`${date.day}.${date.month}.${date.year} ${this.timeData.hour}:${this.timeData.minute}`, 'jDD.jMM.jYYYY HH:mm');
          else
            selectedDate = moment(`${date.day}.${date.month}.${date.year}`, 'jDD.jMM.jYYYY');
          break;
        case CalendarType.Gregorian:
          if (this.time)
            selectedDate = moment(`${date.day}.${date.month}.${date.year} ${this.timeData.hour}:${this.timeData.minute}`, 'DD.MM.YYYY HH:mm');
          else
            selectedDate = moment(`${date.day}.${date.month}.${date.year}`, 'DD.MM.YYYY');
          break;
      }
      this.selectedDate = selectedDate;
      this.changeDate.emit(this.value);
      this.close();
      this.generateCalendar();
    }
  }

  prevMonth() {
    switch (this.type) {
      case CalendarType.Solar:
        this.value = this.value.add(1, 'jMonth');
        this.generateCalendar();
        break;
      default:
        this.value = this.value.subtract(1, 'month');
        this.generateCalendar();
        break;
    }
  }

  nextMonth() {
    switch (this.type) {
      case CalendarType.Solar:
        this.value = this.value.subtract(1, 'jMonth');
        this.generateCalendar();
        break;
      default:
        this.value = this.value.add(1, 'month');
        this.generateCalendar();
        break;
    }
  }

  writeValue(value: any) {
    if (value != null || value != undefined || (this.format == "x" || this.format == "X") ? moment(parseInt(value)).isValid() : moment(value, this.format).isValid()) {
      this.selectedDate = (this.format == "x" || this.format == "X") ? moment(parseInt(value)) : moment(value, this.format);
      this.value = (this.format == "x" || this.format == "X") ? moment(parseInt(value)) : moment(value, this.format);
    } else if (value == null || value == undefined) {
      this.selectedDate = moment();
      this.value = moment();
    }
  }

  registerOnChange(fn: (value: any) => any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any) {
    this.onTouched = fn;
  }

  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  toggle() {
    if (!this.alwaysOpened)
      this.opened = !this.opened;
  }

  open() {
    this.opened = true;
  }

  close() {
    if (!this.alwaysOpened)
      this.opened = false;
  }

  AMPM() {
    if (this.AMOrPM == 'am') {
      this.AMOrPM = 'pm';
      this.timeData.hour = this.timeData.hour + 12;
    }
    else {
      this.AMOrPM = 'am';
      this.timeData.hour = this.timeData.hour - 12;
    }
    this.changeTime();
  }
}

