import { HiDateModule } from './datepicker/Hi-Date.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HiDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
