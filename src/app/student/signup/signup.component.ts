import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(9)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  signup() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
