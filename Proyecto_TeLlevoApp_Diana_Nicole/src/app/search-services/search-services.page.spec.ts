import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchServicesPage } from './search-services.page';

describe('SearchServicesPage', () => {
  let component: SearchServicesPage;
  let fixture: ComponentFixture<SearchServicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
