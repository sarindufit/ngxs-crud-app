import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CourseService } from './services/course.service';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';

@NgModule({
  declarations: [CoursesListComponent, CreateCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CourseService],
  bootstrap: [],
  exports: [CoursesListComponent, CreateCourseComponent]
})
export class CourseModule {}
