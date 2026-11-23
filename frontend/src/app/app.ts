import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Gestion des tâches';
  private readonly taskService = inject(TaskService);

  tasks: Task[] = [];
  formData: { title: string; description: string } = {
    title: '',
    description: ''
  };

  editingTaskId: string | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadTasks();
  }

  // Fetch all tasks from backend
  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des tâches:', err);
        this.errorMessage = 'Impossible de charger les tâches. Vérifiez que le serveur backend est démarré.';
        this.isLoading = false;
      }
    });
  }

  // Submit form for either creation or modification
  onSubmit(): void {
    const trimmedTitle = this.formData.title.trim();
    if (!trimmedTitle) {
      this.errorMessage = 'Veuillez saisir un titre pour la tâche.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    if (this.editingTaskId) {
      // Update existing task
      this.taskService
        .updateTask(this.editingTaskId, {
          title: trimmedTitle,
          description: this.formData.description.trim()
        })
        .subscribe({
          next: (updated) => {
            this.tasks = this.tasks.map((t) => (t._id === updated._id ? updated : t));
            this.successMessage = 'Tâche modifiée avec succès !';
            this.cancelEdit();
            this.clearAlertsAfterDelay();
          },
          error: (err) => {
            console.error('Erreur lors de la modification:', err);
            this.errorMessage = 'Erreur lors de la modification de la tâche.';
          }
        });
    } else {
      // Create new task
      this.taskService
        .createTask({
          title: trimmedTitle,
          description: this.formData.description.trim(),
          completed: false
        })
        .subscribe({
          next: (created) => {
            this.tasks.unshift(created);
            this.formData = { title: '', description: '' };
            this.successMessage = 'Tâche ajoutée avec succès !';
            this.clearAlertsAfterDelay();
          },
          error: (err) => {
            console.error("Erreur lors de l'ajout:", err);
            this.errorMessage = "Erreur lors de l'ajout de la tâche.";
          }
        });
    }
  }

  // Load task into the form for editing
  startEdit(task: Task): void {
    if (!task._id) return;
    this.editingTaskId = task._id;
    this.formData = {
      title: task.title,
      description: task.description || ''
    };
    this.errorMessage = '';
    this.successMessage = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Cancel edit mode and reset form
  cancelEdit(): void {
    this.editingTaskId = null;
    this.formData = {
      title: '',
      description: ''
    };
  }

  // Toggle completion status
  toggleTaskStatus(task: Task): void {
    if (!task._id) return;
    const newStatus = !task.completed;

    this.taskService.updateTask(task._id, { completed: newStatus }).subscribe({
      next: (updated) => {
        this.tasks = this.tasks.map((t) => (t._id === updated._id ? updated : t));
        this.successMessage = updated.completed
          ? 'Tâche marquée comme terminée !'
          : 'Tâche reprise !';
        this.clearAlertsAfterDelay();
      },
      error: (err) => {
        console.error('Erreur lors du changement de statut:', err);
        this.errorMessage = 'Erreur lors du changement de statut de la tâche.';
      }
    });
  }

  // Delete a task
  deleteTask(task: Task): void {
    if (!task._id) return;
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la tâche "${task.title}" ?`)) {
      return;
    }

    this.taskService.deleteTask(task._id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
        if (this.editingTaskId === task._id) {
          this.cancelEdit();
        }
        this.successMessage = 'Tâche supprimée avec succès !';
        this.clearAlertsAfterDelay();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        this.errorMessage = 'Erreur lors de la suppression de la tâche.';
      }
    });
  }

  private clearAlertsAfterDelay(): void {
    setTimeout(() => {
      this.successMessage = '';
    }, 3500);
  }
}
