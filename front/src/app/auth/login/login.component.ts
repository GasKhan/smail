import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { startLogin } from '../store/auth.actions';
import { Router, RouterLink } from '@angular/router';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  faX = faX;

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

  closeLoginPage() {
    this.router.navigate(['/login']);
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}
}
