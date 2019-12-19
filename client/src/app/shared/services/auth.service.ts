import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IUser } from '../interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token = null;

    constructor(private http: HttpClient) {
        //
    }

    login(user: IUser): Observable<{token: string}> {
        return  this.http.post<{token: string}>('/api/auth/login', user)
            .pipe(
                tap(
                    ({token}) => {
                        sessionStorage.setItem('auth-token', token);
                        this.setToken(token);
                    }
                )
            );
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    logout() {
        this.setToken(null);
        sessionStorage.clear();
    }

    register() {}
}
