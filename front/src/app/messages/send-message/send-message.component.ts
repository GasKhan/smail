import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClose,
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter,
  faWindowMinimize,
} from '@fortawesome/free-solid-svg-icons';
import { SendMessageToggleService } from '../../sendMessage-toggle.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageEditorComponent } from '../message-editor/message-editor.component';
import { MessagesApiService } from '../messagesApi.service';
import { AddFileComponent } from '../add-file/add-file.component';
import { MessageToSend } from '../../models/message.model';
import { Store } from '@ngrx/store';
import { sendMessage } from '../store/messages.actions';

enum APPEARANCE_OPTIONS {
  regular,
  wide,
  minimized,
}

interface MessageForm {
  sendTo: string;
  title: string;
  body: string;
  file: File | null;
}

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgClass,
    ReactiveFormsModule,
    MessageEditorComponent,
    AddFileComponent,
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
    const initialFormValues: MessageForm = {
      sendTo: '',
      title: '',
      body: '',
      file: null,
    };
    this.messageForm = this.fb.group({
      sendTo: [initialFormValues.sendTo, Validators.required],
      title: initialFormValues.title,
      body: [initialFormValues.body, Validators.required],
      file: initialFormValues.file,
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
    const emailData: MessageToSend = {
      title: this.messageForm.get('title')?.value,
      textBody: this.messageForm.get('body')?.value,
      recipientEmail: this.messageForm.get('sendTo')?.value,
    };
    this.store.dispatch(sendMessage({ messageData: emailData }));
    this.messageForm.reset();
    this.toggleSendMessageService.closeSendMessage();
  }

  addFile(file: File) {
    this.messageForm.controls['file'].setValue(file);
    console.log(this.messageForm.controls['file'].value);
  }

  constructor(
    private toggleSendMessageService: SendMessageToggleService,
    private fb: FormBuilder,
    private store: Store
  ) {}
}
