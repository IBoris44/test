import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from './../../../shared/services/auth.service';
import { User } from './../../../shared/classes/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>();

  public form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
      ])
    });
  }

  public login(): void {
    const loginData = this.form.value;
    this.authService.login(loginData)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user: User) => {
        this.authService.setUser(user);
        this.router.navigate(['dashboard']);
      });
  }
}
