import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserApiService } from '../userApi.service';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { login, startLogin } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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

  loginUser() {
    if (this.loginForm.valid)
      this.store.dispatch(
        startLogin({
          userData: {
            email: this.loginForm.get('email')?.value,
            password: this.loginForm.get('password')?.value,
          },
        })
      );
  }
  constructor(private fb: FormBuilder, private store: Store) {}
}
