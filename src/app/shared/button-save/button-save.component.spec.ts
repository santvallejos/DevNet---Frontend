import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSaveComponent } from './button-save.component';

describe('ButtonSaveComponent', () => {
  let component: ButtonSaveComponent;
  let fixture: ComponentFixture<ButtonSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
