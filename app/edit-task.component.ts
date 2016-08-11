import {Component} from "angular2/core";
import {Task} from "./task.model";

@Component ({
  selector: "edit-task-details",
  inputs: ["task"],
  templateUrl: "app/edit-task.component.html"
})

export class EditTaskDetailsComponent {
  public task: Task;
}
