import {Component} from "angular2/core";
import {Task} from "./task.model";

@Component ({
  selector: "task-display",
  inputs: ["task"],
  templateUrl: "app/task.component.html"
})

export class TaskComponent {
  public task: Task;
  toggleDone(setCompleteness: boolean) {
    this.task.done = setCompleteness;
  }
}
