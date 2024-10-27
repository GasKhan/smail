import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faReply, faReplyAll, faStar } from '@fortawesome/free-solid-svg-icons';
import { Message } from '../../models/message.model';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Store } from '@ngrx/store';
import { StoreState } from '../../store';
import { tap } from 'rxjs/internal/operators/tap';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { changeIsMessageWatched } from '../store/messages.actions';
import { getFormattedDate } from '../../../helpers/getFormattedDate';

@Component({
  selector: 'app-show-message',
  standalone: true,
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: './show-message.component.html',
  styleUrl: './show-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMessageComponent {
  faStar = faStar;
  faReply = faReply;
  faReplyAll = faReplyAll;
  message$!: Observable<Message | undefined>;

  getFormattedDate = getFormattedDate;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<StoreState>
  ) {
    this.message$ = activatedRoute.params.pipe(
      switchMap((params) => {
        const id = +params['id'];
        return this.store.select((state) =>
          state.messages.messages.find((mes) => {
            return mes.emailId === id;
          })
        );
      }),
      tap((message) => {
        // console.log('dispatching change wathced');
        if (message && !message.isWatched)
          this.store.dispatch(
            changeIsMessageWatched({
              messageIds: [message.emailId],
              changeIsWatchedTo: true,
            })
          );
      })
    );
  }
}
