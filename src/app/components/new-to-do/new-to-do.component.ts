import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-new-to-do',
  templateUrl: './new-to-do.component.html',
  styleUrls: ['./new-to-do.component.scss']
})
export class NewToDoComponent implements OnInit {
  addingItem: boolean = false

  constructor(private todoService: ToDoService) { }

  ngOnInit(): void {
  }

  addItem(): void {
    this.addingItem = true
  }

  save(e: Todo): void {
    this.todoService.addItem(e)
    this.addingItem = false
  }

  cancel(e: any): void {
    this.addingItem = false
  }

}
