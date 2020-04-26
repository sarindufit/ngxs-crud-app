import { AddCourse } from './../../store/course.actions';
import { Course } from './../../model/course.model';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }

    const course: Course = {id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description};
    this.store.dispatch(new AddCourse(course));
  }

}
