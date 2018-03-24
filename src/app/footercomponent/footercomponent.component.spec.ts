import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercomponentComponent } from './footercomponent.component';

describe('FootercomponentComponent', () => {
  let component: FootercomponentComponent;
  let fixture: ComponentFixture<FootercomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootercomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
