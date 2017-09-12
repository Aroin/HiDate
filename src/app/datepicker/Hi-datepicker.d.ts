import {ViewContainerRef, OnInit} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";
export declare const CALENDAR_VALUE_ACCESSOR: any;

export declare class HiDatePickerComponent implements ControlValueAccessor, OnInit {

    class: string;
    expanded: boolean;
    opened: boolean;
    format: string;
    viewFormat: string;
    firstWeekdaySaturday: boolean;
    persianCalendar: boolean;
    time: boolean;
    alwaysOpened: boolean;
    hiddenButton: boolean;
    maxDate: HiDate;
    minDate: HiDate;
    initTime: any;
    offAMOrPM: boolean;

    private _date;
    private _selectedDate;
    private el;
    private timeData;
    private days;
    private _formatHeaderCalendar;
    private type;
    private isRTL;
    private meridian;

    constructor(viewContainerRef: ViewContainerRef);

    selectedDate: any;
    date: any;

    ngOnInit(): void;

    generateCalendar(): void;

    miladiGenerateCalendar(): void;

    jalaliGenerateCalendar(): void;

    checkValidDate(d: HiDatePicker): HiDatePicker;

    validMaxDate(d: HiDatePicker): boolean;

    validMinDate(d: HiDatePicker): boolean;

    selectDate(e: MouseEvent, i: number): void;

    prevMonth(): void;

    nextMonth(): void;

    writeValue(value: any): void;

    registerOnChange(fn: any): void;

    registerOnTouched(fn: any): void;

    toggle(): void;

    open(): void;

    close(): void;

    onChange(): void;

    onTouched(): void;
}
