import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedServicePage } from './selected-service.page';

describe('SelectedServicePage', () => {
  let component: SelectedServicePage;
  let fixture: ComponentFixture<SelectedServicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
