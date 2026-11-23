import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/tasks';
  private readonly http = inject(HttpClient);

  // Retrieve all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Create a new task
  createTask(task: { title: string; description?: string; completed?: boolean }): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Update an existing task
  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  // Delete a task by ID
  deleteTask(id: string): Observable<{ message: string; task: Task }> {
    return this.http.delete<{ message: string; task: Task }>(`${this.apiUrl}/${id}`);
  }
}
