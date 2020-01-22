import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
    tokenExpirationDuration: any;

    constructor(
        private store: Store<fromApp.AppState>
    ) { }

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationDuration = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, expirationDuration);
    }

    clearLougoutTimer() {
        if (this.tokenExpirationDuration) {
            clearTimeout(this.tokenExpirationDuration);
            this.tokenExpirationDuration = null;
        }
    }
}