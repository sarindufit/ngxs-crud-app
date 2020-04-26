import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Course } from './../model/course.model';
import { AddCourse, UpdateCourse, GetCourses, DeleteCourse, SetSelectedCourse } from './../store/course.actions';
import { CourseService } from './../services/course.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export class CourseStateModel {
    courses: Course[];
    areCoursesLoaded: boolean;
}

@State<CourseStateModel>({
    name: 'courses',
    defaults: {
      courses: [],
      areCoursesLoaded: false
    }
})
export class CourseState {

    constructor(private courseService: CourseService, private router: Router) {
    }

    @Selector()
    static getCoursesList(state: CourseStateModel) {
        return state.courses;
    }

    @Selector()
    static areCoursesLoaded(state: CourseStateModel) {
        return state.areCoursesLoaded;
    }

    @Action(GetCourses)
    getCourses({getState, setState}: StateContext<CourseStateModel>) {
      return this.courseService.getAllCourses().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            courses: result,
            areCoursesLoaded: true
          });
        })
      );
    }

    @Action(DeleteCourse)
    deleteCourse({getState, setState}: StateContext<CourseStateModel>, {id}: DeleteCourse) {
      return this.courseService.deleteCourse(id).pipe(
        tap(result => {
          const state = getState();
          const filteredArray = state.courses.filter(item => item.id !== id);
          setState({
            ...state,
            courses: filteredArray,
          });
        })
      );
    }

    @Action(UpdateCourse)
    updateCourse({getState, setState}: StateContext<CourseStateModel>, {payload, id}: UpdateCourse) {
      return this.courseService.updateCourse(id, payload).pipe(
        tap(result => {
          const state = getState();
          const coursesList = [...state.courses];
          const courseIndex = coursesList.findIndex(item => item.id === id);
          coursesList[courseIndex] = result;

          setState({
            ...state,
            courses: coursesList,
          });
        })
      );
    }

    @Action(AddCourse)
    addTodo({getState, patchState}: StateContext<CourseStateModel>, {payload}: AddCourse) {
        return this.courseService.createCourse(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                courses: [...state.courses, result]
            });
            this.router.navigateByUrl('/courses');
        }));
    }
}
