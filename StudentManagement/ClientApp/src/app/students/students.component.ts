import { Component, OnInit } from '@angular/core';

import { StudentService } from '../services/student.service';
import { StudentDisplay } from '../models/student-display';
import { Gender } from '../models/gender';

@Component({
    providers: [StudentService],
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
    genders: Gender[];
    students: StudentDisplay[];
    filteredStudents: StudentDisplay[];
    sortBy: string;
    sortReverse: boolean = false;

    constructor(private studentService: StudentService) { }

    ngOnInit():void {
        this.loadStudents();
    }

    loadStudents(): void {
        this.studentService.getGenders().subscribe(data => this.genders = data);
        this.studentService.getStudents().subscribe(data => { this.students = data; this.filteredStudents = data });
    }

    deleteStudent(id: number): void {
        const answer = confirm('Do you want to delete student?');
        if (answer) {
            this.studentService.deleteStudent(id).subscribe((data) => {
                this.loadStudents();
            })
        }
    }

    sortStudents(property: string): void {
        this.sortBy = property;
        this.sortReverse = !this.sortReverse;
        this.filteredStudents.sort(this.compare(property));       
    }

    compare(property: string) {
        let sortOrder = this.sortReverse ? -1 : 1;
        return function (a: any, b: any) {
            let result = (a[property] == null && b[property] != null) ? -1 : (a[property] != null && b[property] == null) ? 1 : (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    filterStudents(search: string, gender: number):void {
        this.filteredStudents = this.students
            .filter(s => (!(gender) || (s.gender == gender)))
            .filter(s =>
            Object.keys(s).some(k => {
                if (typeof s[k] === 'string')
                    return s[k].toLowerCase().includes(search.toLowerCase());
            })
        );
    }

    getGenderName(value: number): string {
        return this.genders.find(g => g.value == value).name;
    }
}
