import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClose,
  faDownLeftAndUpRightToCenter,
  faTrash,
  faUpRightAndDownLeftFromCenter,
  faWindowMinimize,
} from '@fortawesome/free-solid-svg-icons';
import { SendMessageToggleService } from '../../sendMessage-toggle.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageEditorComponent } from '../message-editor/message-editor.component';
import { MessagesApiService } from '../messagesApi.service';

enum APPEARANCE_OPTIONS {
  regular,
  wide,
  minimized,
}

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgClass,
    ReactiveFormsModule,
    MessageEditorComponent,
  ],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendMessageComponent implements OnInit {
  messageForm!: FormGroup;
  APPEARANCE_OPTIONS = APPEARANCE_OPTIONS;
  popupAppearance = APPEARANCE_OPTIONS.regular;

  faMinimize = faWindowMinimize;
  faClose = faClose;
  faResizeUp = faUpRightAndDownLeftFromCenter;
  faResizeDown = faDownLeftAndUpRightToCenter;

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      sendTo: ['', Validators.required],
      title: '',
      body: ['', Validators.required],
    });
  }

  resizePopup(appearance: APPEARANCE_OPTIONS) {
    if (this.popupAppearance === appearance)
      this.popupAppearance = APPEARANCE_OPTIONS.regular;
    else this.popupAppearance = appearance;
  }

  closeSendMessage() {
    this.toggleSendMessageService.closeSendMessage();
  }

  sendMessage(event: Event) {
    event.preventDefault();
    // this.messageApiService.sendMessage();
    this.toggleSendMessageService.closeSendMessage();
  }

  editTextBody(editedText: string) {
    if (!this.messageForm.controls['body'].touched)
      this.messageForm.controls['body'].markAsTouched();

    this.messageForm.get('body')?.setValue(editedText);
  }

  constructor(
    private toggleSendMessageService: SendMessageToggleService,
    private fb: FormBuilder,
    private messageApiService: MessagesApiService
  ) {}
}
