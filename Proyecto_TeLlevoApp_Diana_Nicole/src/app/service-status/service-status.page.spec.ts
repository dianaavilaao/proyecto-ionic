import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceStatusPage } from './service-status.page';

describe('ServiceStatusPage', () => {
  let component: ServiceStatusPage;
  let fixture: ComponentFixture<ServiceStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
