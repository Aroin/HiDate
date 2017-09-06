import { HiDatePickerComponent } from './Hi-datepicker';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HiDatePickerComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        HiDatePickerComponent,
        FormsModule
    ]
})
export class HiDateModule { }