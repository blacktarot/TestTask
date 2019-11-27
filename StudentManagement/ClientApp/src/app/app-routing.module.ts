import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsComponent } from './students/students.component';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';

const routes: Routes = [
    { path: '', component: StudentsComponent, pathMatch: 'full' },
    { path: 'add', component: StudentAddEditComponent },
    { path: 'student/edit/:id', component: StudentAddEditComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
