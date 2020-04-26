import { Course } from './../model/course.model';

export class AddCourse {
  static readonly type = '[Course ] Add';

  constructor(public payload: Course ) {
  }
}

export class GetCourses {
  static readonly type = '[Course] Get';
}

export class UpdateCourse {
  static readonly type = '[Course] Update';

  constructor(public payload: Course, public id: string) {
  }
}

export class DeleteCourse {
  static readonly type = '[Course] Delete';

  constructor(public id: string) {
  }
}
