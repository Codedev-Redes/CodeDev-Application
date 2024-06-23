import { StudentService } from './../services/student.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {}
  
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

  controlTouched(controlName: string):boolean {
    const control = this.form.get(controlName);
    return control && control.touched || false;
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    this.studentService.getStudentByEmail(formValue.email)
    .subscribe({
      next: (student) => {
        if (student.password === formValue.password) {
          console.log("Bienvenido", student);
          this.router.navigate(['/courses']);
        }
      },
      error: (error) => {
        console.error('Las contraseñas no coinciden', error);
      }
    })
  }
}
