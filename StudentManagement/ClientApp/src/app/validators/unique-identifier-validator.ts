import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { StudentService } from '../services/student.service';

export function availableIdentifierValidator(_studentService: StudentService, studentId: number ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return timer(500).pipe(
            switchMap(() => {
                if (!control.value) {
                    return of(null)
                }
                return _studentService.isIdentifierAvailable(control.value, studentId).pipe(
                    map(isUnique => !isUnique ? { uniqueIdentifier: true } : null)
                );
            })
        )
    }
}