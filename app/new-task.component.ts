import {Component, EventEmitter} from 'angular2/core';
import {Task} from "./task.model";

@Component ({
  selector: "new-task",
  outputs: ["onSubmitNewTask"],
  templateUrl: "app/new-task.component.html"
})

export class NewTaskComponent {
  public onSubmitNewTask: EventEmitter<String>;
  constructor() {
    this.onSubmitNewTask = new EventEmitter();
  }
  addTask(userDescription: HTMLInputElement) {
    this.onSubmitNewTask.emit(userDescription.value);
    userDescription.value = "";
  }
}
