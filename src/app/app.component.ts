import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/Todo';
import { ToDoService } from './services/to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do-list';
  items: string[] = []
  $items?: Observable<Todo[]>

  constructor(private todoService: ToDoService) {
    this.items = todoService.items
  }

  ngOnInit(): void {
    this.$items = this.todoService.getItems()
  }

  check(): void {
    alert('This come from APP COMPONENTS')
  }

  del(id: string): void {
    this.todoService.delItem(id)
  }

  update(todo: Todo): void {
    this.todoService.updateItem(todo)
  }
}
