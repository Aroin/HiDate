import { HiDatePickerComponent } from './Hi-datepicker';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
var HiDateModule = (function () {
    function HiDateModule() {
    }
    return HiDateModule;
}());
export { HiDateModule };
HiDateModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
/** @nocollapse */
HiDateModule.ctorParameters = function () { return []; };
//# sourceMappingURL=Hi-Date.module.js.map