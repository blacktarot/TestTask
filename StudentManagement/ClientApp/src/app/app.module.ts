import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule, AppRoutingModule],
    declarations: [AppComponent, StudentsComponent, StudentAddEditComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }