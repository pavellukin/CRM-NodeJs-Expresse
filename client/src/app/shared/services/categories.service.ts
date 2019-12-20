import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesPageComponent } from 'src/app/categories-page/categories-page.component';
import { ICategory } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private http: HttpClient) {}

    fetch(): Observable<ICategory[]> {
     return this.http.get<ICategory[]>('/api/category');
    }
}
