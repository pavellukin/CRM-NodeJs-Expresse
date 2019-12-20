import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { ICategory } from '../shared/interfaces';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  loading = false;
  categories: ICategory[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.loading = true;
    this.categoriesService.fetch().subscribe(categories => {
      this.loading = false;
      this.categories = categories;
    });
  }

}
