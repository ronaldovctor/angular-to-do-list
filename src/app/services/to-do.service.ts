import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  items: string[] = ['Item 1', 'Item 2']

  private todoCollection: AngularFirestoreCollection<Todo> = this.afs.collection('to-do-items')

  constructor(private afs: AngularFirestore) { }

  getItems(): Observable<Todo[]>{
    return this.todoCollection.valueChanges()
  }

  addItem(todo: Todo): void{
    const td = { ...todo, id: this.afs.createId() }
    this.todoCollection.doc(td.id).set(td)
  }

  delItem(id: string): void {
    this.todoCollection.doc(id).delete()
  }

  updateItem(todo: Todo): void {
    this.todoCollection.doc(todo.id).set(todo)
  }
}
