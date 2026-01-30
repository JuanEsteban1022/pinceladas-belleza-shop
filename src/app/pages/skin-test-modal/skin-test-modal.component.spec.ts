import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinTestModalComponent } from './skin-test-modal.component';

describe('SkinTestModalComponent', () => {
  let component: SkinTestModalComponent;
  let fixture: ComponentFixture<SkinTestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinTestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkinTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
