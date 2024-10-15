import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesListItemComponent } from './messages-list-item.component';

describe('MessagesListItemComponent', () => {
  let component: MessagesListItemComponent;
  let fixture: ComponentFixture<MessagesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
