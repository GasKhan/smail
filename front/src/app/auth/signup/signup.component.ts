import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs/operators';
import { UserApiService } from '../userApi.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  signUpUser() {
    if (this.signupForm.valid) {
      this.userApiService
        .signup({
          userData: {
            username: this.signupForm.get('username')?.value,
            email: this.signupForm.get('email')?.value,
            password: this.signupForm.get('password')?.value,
          },
        })
        .pipe(tap(() => this.signupForm.reset()))
        .subscribe((r) => console.log(r));
    }
  }

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService
  ) {}
}
