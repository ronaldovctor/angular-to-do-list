import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Todo } from 'src/app/models/Todo';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  faCheck = faCheck
  faTrashCan = faTrashCan

  @Input() checkbox?: boolean
  @Input() content?: Todo

  @Output() saveItem: EventEmitter<Todo> = new EventEmitter<Todo>()
  @Output() checkItem: EventEmitter<Todo> = new EventEmitter<Todo>()
  @Output() delItem: EventEmitter<string> = new EventEmitter<string>()
  @Output() updateItem: EventEmitter<Todo> = new EventEmitter<Todo>()

  @ViewChild('myInput') input?: ElementRef

  isChecked: boolean = false
  todo!: Todo
  todoForm!: FormGroup

  constructor(private todoService: ToDoService) {
  }

  ngOnInit(): void {
    if(this.content)
      this.todo = this.content!
    else
      this.todo = {
        id: '',
        text: '',
        isChecked: false
      }

    this.todoForm = new FormGroup({
      id: new FormControl(this.todo.id || ''),
      text: new FormControl('', Validators.required)
    })
  }

  ngAfterViewInit(): void {
    if(this.content)
      this.input!.nativeElement.value = this.content.text
  }

  check(): void {
    const todo: Todo = {...this.todo, isChecked: !this.todo.isChecked}
    this.checkItem.emit(todo)
  }

  save(): void {
    if(this.todoForm.get('text')?.valid){
      const todo: Todo = {
        text: this.todoForm.get('text')?.value!,
        isChecked: false,
        id: ''
      }
      this.saveItem.emit(todo)
    }
  }

  del(): void {
    this.delItem.emit(this.todoForm.get('id')!.value!)
  }
}
