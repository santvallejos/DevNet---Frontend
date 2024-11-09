import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLikeComponent } from './button-like.component';

describe('ButtonLikeComponent', () => {
  let component: ButtonLikeComponent;
  let fixture: ComponentFixture<ButtonLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
