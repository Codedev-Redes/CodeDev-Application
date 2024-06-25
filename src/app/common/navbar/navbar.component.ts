import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesId } from '../../courses/interfaces/auth.interface';
import { CourseService } from '../../courses/services/course.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public active: boolean = false;

  categories: CategoriesId[] = []; 

  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  onClick() {
    this.active = !this.active;
  }

  ngOnInit() {
    this.courseService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  logOut() {
    localStorage.removeItem('student');
    this.router.navigate(['/login']);
  }

  goToCategory(category: CategoriesId) {
    this.router.navigate(['courses/categories'], { queryParams: { id: category._id} });
  }

}
