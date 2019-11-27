import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentService } from '../services/student.service';
import { StudentEdit } from '../models/student-edit';
import { availableIdentifierValidator } from '../validators/unique-identifier-validator';
import { Gender } from '../models/gender';

@Component({
    selector: 'app-student-add-edit',
    templateUrl: './student-add-edit.component.html',
    styleUrls: ['./student-add-edit.component.css'],
    providers: [StudentService]
})
export class StudentAddEditComponent implements OnInit {
    actionType: string;
    studentId: number;
    studentForm: FormGroup;
    genders: Gender[];

    get gender() { return this.studentForm.get('gender'); }
    get surname() { return this.studentForm.get('surname'); }
    get name() { return this.studentForm.get('name'); }
    get patronymic() { return this.studentForm.get('patronymic'); }
    get identifier() { return this.studentForm.get('identifier'); }

    constructor(private studentService: StudentService, private formBuilder: FormBuilder,
        private avRoute: ActivatedRoute, private router: Router) {
        this.studentForm = this.formBuilder.group(
            {
                studentId: null,
                gender: [null, [Validators.required]],
                surname: ['', [Validators.required, Validators.maxLength(40)]],
                name: ['', [Validators.required, Validators.maxLength(40)]],
                patronymic: [null, [Validators.maxLength(60)]],
                identifier: [null, [Validators.minLength(6), Validators.maxLength(16)]]
            });
        this.studentService.getGenders().subscribe(data => this.genders = data);
    }

    ngOnInit(): void {
        let id: number = this.avRoute.snapshot.params['id'];
        if (id) {
            this.initEdit(id);
        }
        else {
            this.initAdd();
        }
    }

    initEdit(id: number): void {
        this.actionType = 'Edit';
        this.studentService.getStudent(id)
            .subscribe(data => (
                this.studentId = data.id,
                this.identifier.setAsyncValidators(availableIdentifierValidator(this.studentService, this.studentId)),
                this.studentForm.patchValue({
                    gender: data.gender,
                    surname: data.surname,
                    name: data.name,
                    patronymic: data.patronymic,
                    identifier: data.identifier
                })));
    }

    initAdd(): void {
        this.actionType = 'Add';
        this.identifier.setAsyncValidators(availableIdentifierValidator(this.studentService, null));
    }

    onSubmit(): void {
        if (!this.studentForm.valid) {
            return;
        }

        let student: StudentEdit = {
            id: this.studentId,
            gender: this.gender.value,
            surname: this.nullIfEmpty(this.surname.value),
            name: this.nullIfEmpty(this.name.value),
            patronymic: this.nullIfEmpty(this.patronymic.value),
            identifier: this.nullIfEmpty(this.identifier.value)
        };

        if (this.actionType === 'Add') {
            this.studentService.createStudent(student)
                .subscribe(() => {
                    this.router.navigate(['/']);
                })
        }

        if (this.actionType === 'Edit') {
            this.studentService.updateStudent(student)
                .subscribe(() => {
                    this.router.navigate(['/']);
                })
        }
    }

    private nullIfEmpty(string: string): string | null {
        return (string) ? string : null;
    }

    cancel(): void {
        this.router.navigate(['/']);
    }
}
