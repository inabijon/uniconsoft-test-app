import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../auth.service';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    CheckboxModule,
    InputGroupModule,
    InputGroupAddonModule,
    TranslocoPipe,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible = false;
  private readonly fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private readonly activedRoute: ActivatedRoute = inject(ActivatedRoute);

  public isAdmin: boolean = true;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', []], // initially no validators
      // rememberMe: [false],
    });

    this.activedRoute.data.subscribe(({ role }) => {
      this.isAdmin = role == 'admin';
      // Update password validators based on isAdmin
      const passwordControl = this.loginForm.get('password');
      if (this.isAdmin) {
        this.authService.clear();
        passwordControl?.setValidators([Validators.required]);
      } else {
        this.authService.clear();
        passwordControl?.clearValidators();
      }
      passwordControl?.updateValueAndValidity();
    });
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  submit() {
    this.loginForm.markAllAsTouched();

    console.log(this.loginForm);
  }
}
