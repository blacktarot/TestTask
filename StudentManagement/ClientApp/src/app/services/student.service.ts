import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { StudentEdit } from '../models/student-edit';
import { StudentDisplay } from '../models/student-display';
import { Gender } from '../models/gender';

@Injectable()
export class StudentService {

    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    private url = "/api/students";


    constructor(private http: HttpClient) {
    }

    getStudents(): Observable<StudentDisplay[]> {
        return this.http.get<StudentDisplay[]>(this.url)
            .pipe(retry(1), catchError(this.errorHandler));
    }

    getStudent(id: number): Observable<StudentEdit> {
        return this.http.get<StudentEdit>(this.url + '/' + id)
            .pipe(retry(1), catchError(this.errorHandler));
    }

    createStudent(student: StudentEdit): Observable<StudentEdit> {
        return this.http.post<StudentEdit>(this.url, student)
            .pipe(retry(1), catchError(this.errorHandler));;
    }

    updateStudent(student: StudentEdit): Observable<StudentEdit> {
        return this.http.put<StudentEdit>(this.url + '/' + student.id, student)
            .pipe(retry(1), catchError(this.errorHandler));
    }

    deleteStudent(id: number): Observable<StudentEdit> {
        return this.http.delete<StudentEdit>(this.url + '/' + id)
            .pipe(retry(1), catchError(this.errorHandler));
    }

    isIdentifierAvailable(identifier: string, studentId?: number): Observable<boolean> {
        return this.http.post<boolean>(this.url + '/isidentifieravailable', { studentId, identifier }, { headers: this.httpHeaders })
            .pipe(retry(1), catchError(this.errorHandler));
    }

    getGenders(): Observable<Gender[]> {
        return this.http.get<Gender[]>(this.url + '/genders')
            .pipe(retry(1), catchError(this.errorHandler));
    }

    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = error.error.message;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
