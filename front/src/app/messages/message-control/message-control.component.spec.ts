import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageControlComponent } from './message-control.component';

describe('MessageControlComponent', () => {
  let component: MessageControlComponent;
  let fixture: ComponentFixture<MessageControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
