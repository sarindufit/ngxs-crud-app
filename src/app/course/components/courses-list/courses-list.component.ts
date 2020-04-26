import { tap } from 'rxjs/operators';
import { Course } from './../../model/course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GetCourses, DeleteCourse, UpdateCourse } from './../../store/course.actions';
import { CourseState } from './../../store/course.state';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html'
})
export class CoursesListComponent implements OnInit, OnDestroy {

  @Select(CourseState.getCoursesList) courses$: Observable<Course[]>;

  @Select(CourseState.areCoursesLoaded) areCoursesLoaded$;

  courseToBeUpdated: Course;

  isUpdateActivated = false;

  areCoursesLoadedSub: Subscription;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.areCoursesLoadedSub = this.areCoursesLoaded$.pipe(
      tap((areCoursesLoaded) => {
        if (!areCoursesLoaded) {
          this.store.dispatch(new GetCourses());
        }
      })
    ).subscribe(value => {
      console.log(value);
    });
  }

  ngOnDestroy() {
    this.areCoursesLoadedSub.unsubscribe();
  }

  deleteCourse(courseId: string) {
    this.store.dispatch(new DeleteCourse(courseId));
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = {...course};
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm) {
    this.store.dispatch(new UpdateCourse(updateForm.value, this.courseToBeUpdated.id));

    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }
}
