import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {}

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(9)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

  controlTouched(controlName: string):boolean {
    const control = this.form.get(controlName);
    return control && control.touched || false;
  }

  signup() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    const newStudent = {
      id: Math.random()*(1000000000 - 10) + 10,
      name: formValue.name,
      last_name: formValue.last_name,
      email: formValue.email,
      phone: formValue.phone,
      password: formValue.password
    }

    this.studentService.createStudent(newStudent)
    .subscribe({
      next: (student) => {
        console.log("Estudiante creado", student);
        localStorage.setItem('student', JSON.stringify(student));
      },
      error: (error) => {
        console.error('Error al crear el estudiante', error);
      }
    })
  }
}
