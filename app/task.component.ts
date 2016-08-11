import {Component} from "angular2/core";
import {Task} from "./task.model";

@Component ({
  selector: "task-display",
  inputs: ["task"],
  template:
  `
  <div>
    <input *ngIf="task.done === true" type="checkbox" checked (click)="toggleDone(false)"/>
    <input *ngIf="task.done === false" type="checkbox" (click)="toggleDone(true)"/>
    <h2>{{task.description}}</h2>
  </div>
  `
})

export class TaskComponent {
  public task: Task;
  toggleDone(setCompleteness: boolean) {
    this.task.done = setCompleteness;
  }
}
