import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAcceptPage } from './user-accept.page';

describe('UserAcceptPage', () => {
  let component: UserAcceptPage;
  let fixture: ComponentFixture<UserAcceptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAcceptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
