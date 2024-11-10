import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNavegationComponent } from './button-navegation.component';

describe('ButtonNavegationComponent', () => {
  let component: ButtonNavegationComponent;
  let fixture: ComponentFixture<ButtonNavegationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonNavegationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonNavegationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
