import { Injectable } from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject:BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(TestData.tasks)
  categorySubject = new BehaviorSubject<Category[]>(TestData.categories)

  constructor() { }

  fillCategories(){
    this.categorySubject.next(TestData.categories)
  }

  fillTasks(){
    this.tasksSubject.next(TestData.tasks)
  }

  fillTasksByCategory(category:Category){
    const tasks = TestData.tasks.filter(task=>task.category === category)
    this.tasksSubject.next(tasks)
  }
}
