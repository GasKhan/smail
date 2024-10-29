import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeEvent, CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  ClassicEditor,
  AccessibilityHelp,
  Autosave,
  BlockQuote,
  Bold,
  Essentials,
  Indent,
  IndentBlock,
  Italic,
  Link,
  Paragraph,
  SelectAll,
  Underline,
  Undo,
  type EditorConfig,
} from 'ckeditor5';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-editor',
  standalone: true,
  imports: [CommonModule, CKEditorModule, ReactiveFormsModule],
  templateUrl: './message-editor.component.html',
  styleUrl: './message-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MessageEditorComponent {
  @Input() fGroup!: FormGroup;
  @Output() onTextChanged = new EventEmitter<string>();

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
  public ngAfterViewInit(): void {
    this.config = {
      ui: {},
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'blockQuote',
          '|',
          'outdent',
          'indent',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        AccessibilityHelp,
        Autosave,
        BlockQuote,
        Bold,
        Essentials,
        Indent,
        IndentBlock,
        Italic,
        Link,
        Paragraph,
        SelectAll,
        Underline,
        Undo,
      ],
      initialData: '',
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      placeholder: 'Type or paste your email here!',
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.onTextChanged.emit(data);
  }

  constructor(private changeDetector: ChangeDetectorRef) {}
}
