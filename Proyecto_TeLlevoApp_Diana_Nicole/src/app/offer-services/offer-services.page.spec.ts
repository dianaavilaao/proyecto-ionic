import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferServicesPage } from './offer-services.page';

describe('OfferServicesPage', () => {
  let component: OfferServicesPage;
  let fixture: ComponentFixture<OfferServicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
