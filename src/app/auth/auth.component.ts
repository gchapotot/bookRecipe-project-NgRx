import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  storeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(
      authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError
      });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: email,
          password: password
        }));
    } else {
      this.store.dispatch(
        new AuthActions.SignUpStart({
          email: email,
          password: password
        })
      );
    }
    form.reset();
  }

  onClose() {
    this.store.dispatch(
      new AuthActions.ClearError()
    );
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
