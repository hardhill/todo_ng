import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category']
  dataSource!: MatTableDataSource<Task>  // контейнер - источник данных для таблицы
  @ViewChild(MatPaginator,{static:false}) paginator!:MatPaginator
  @ViewChild(MatSort,{static:false}) sort!:MatSort

  tasks!: Task[]

  constructor(private dataHandler: DataHandlerService) {

  }

  ngOnInit() {
    this.dataHandler. tasksSubject.subscribe(tasks => this.tasks = tasks);
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  ngAfterViewInit() {
    this.addTablebjects()
  }


  // в зависимости от статуса задачи - вернуть цвет названия
  getPriorityColor(task: Task) {

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';

  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private refreshTable() {

    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
    this.addTablebjects()
    this.dataSource.sortingDataAccessor = (task, colName):any => {
      switch (colName) {
        case 'priority':{
          return task.priority ? task.priority.id : null
        }
        case 'category':{
          return task.category ? task.category?.title : null
        }
        case 'date':{
          return task.date ? task.date : null
        }
        case 'title':{
          return task.title
        }
      }
    }


  }

  private addTablebjects() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }
}
