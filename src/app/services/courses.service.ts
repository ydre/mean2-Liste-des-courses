import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoursesService {

  constructor(private http: Http) { }

  getAllCourses(){
  	return this.http.get('/api/v1/courses')
  		.map(res => res.json());
  }

  saveCourse(course){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post("/api/v1/course", JSON.stringify(course), {headers: headers})
  		.map(res => res.json());;
  }

  updateCourse(course){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.put("/api/v1/course/"+course._id, JSON.stringify(course), {headers: headers})
  		.map(res => res.json());;
  }

  deleteCourse(id){
  	return this.http.delete('/api/v1/course/'+id)
  		.map(res => res.json());
  }
}
