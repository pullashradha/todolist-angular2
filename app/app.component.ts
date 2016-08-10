import {Component} from "angular2/core";

@Component ({
  selector: "my-app",
  template:
    `<div class="container">
      <h1>To-Do List</h1>
      <h3> *ngFor="#task of tasks"{{task.description}}</h3>
    </div>`
})

export class Task {
  public done: boolean = false;
  constructor (public description: string, public id: number) {

  }
}

export class AppComponent {
  public tasks: Task[];
  constructor() {
    this.tasks = [
      new Task("Create To-Do List app", 0),
      new Task("Learn Kung Fu", 1),
      new Task("Rewatch all the Lord of the Rings movies", 2),
      new Task("Do the laundry", 3)
    ];
  }
}
