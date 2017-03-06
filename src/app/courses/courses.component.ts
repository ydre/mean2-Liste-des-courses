import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/Course';

@Component({
  moduleId: module.id,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

	courses: Course[];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = [];

  	this.coursesService.getAllCourses().subscribe(courses => {
  		this.courses = courses;
  	});
  }


  addCourse(event, courseContenu){
    var result;
    var newCourse = {
      contenu: courseContenu.value,
      finito: false
    };

    result = this.coursesService.saveCourse(newCourse);
    result.subscribe(newCourse => {
      this.courses.push(newCourse);
      courseContenu.value = "";
    });
  }

  setEditState(course, state){
    if(state){
      course.isEditMode = state;
    }else{
      delete course.isEditMode;
    }
  }


  updateStatus(course){
    var _course = {
      _id: course._id,
      contenu: course.contenu,
      finito: !course.finito
    };

    this.coursesService.updateCourse(_course)
      .subscribe(data => {
        course.finito = !course.finito;
      });
  }

 


  updateCourseContenu(event, course){
    if(event.which === 13){
      course.contenu = event.target.value;
      var _course = {
        _id: course._id,
        contenu: course.contenu,
        finito: course.finito
      };

      this.coursesService.updateCourse(_course)
        .subscribe(data => {
          this.setEditState(course, false);
        });
    }
  }

  deleteCourse(course){
    var courses = this.courses;
    this.coursesService.deleteCourse(course._id)
      .subscribe(data => {
        if(data.n == 1){
          for(var i =0; i < courses.length; i++){
            if(courses[i]._id == course._id){
              courses.splice(i, 1);
            }
          };
        }
      });
  }
}
