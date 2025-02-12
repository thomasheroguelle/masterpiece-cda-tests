import { Component } from '@angular/core';
import { Exercices } from '../../../interfaces/Exercices';
import { ExercicesDbService } from '../../services/json-web-server/exercises/exercicesdb.service';
import { ExercisesLocalStorageService } from '../../services/local-storage/exercises/exerciseslocalstorage.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  exerciceList: Exercices[] = [];
  showModal = false;
  selectedOption = new FormControl<Exercices[]>([]);
  btnDisabled = true;

  constructor(
    private exercisesDb: ExercicesDbService,
    private exercisesLocalStorage: ExercisesLocalStorageService,
  ) {}

  ngOnInit() {
    return this.exercisesDb.getExercices().subscribe((data: Exercices[]) => {
      this.exerciceList = data;
      console.log(data);
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  addExercice() {
    const choosenEx = this.selectedOption.value;
    console.log(choosenEx);

    if (choosenEx) {
      this.exercisesLocalStorage.saveExercice(choosenEx);

      this.updateButtonState();
    }
  }

  submit() {
    this.toggleModal();
    this.selectedOption.reset();
  }

  updateButtonState(): void {
    const isLocalStorageEmpty = this.exercisesLocalStorage.getExercices();
    this.btnDisabled = isLocalStorageEmpty.length === 0;
  }
}
