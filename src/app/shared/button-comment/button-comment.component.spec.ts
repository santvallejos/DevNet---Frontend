import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCommentComponent } from './button-comment.component';

describe('ButtonCommentComponent', () => {
  let component: ButtonCommentComponent;
  let fixture: ComponentFixture<ButtonCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
