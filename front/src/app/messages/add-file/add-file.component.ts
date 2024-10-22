import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-file',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './add-file.component.html',
  styleUrl: './add-file.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFileComponent {
  file: File | null = null;
  faPaperclip = faPaperclip;

  @Output() onFileAdded = new EventEmitter<File>();

  addFile(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      this.file = files[0];
      this.onFileAdded.emit(this.file);
    }
  }
}
