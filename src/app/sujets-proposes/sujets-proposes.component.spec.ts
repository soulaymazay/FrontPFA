import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetsProposesComponent } from './sujets-proposes.component';

describe('SujetsProposesComponent', () => {
  let component: SujetsProposesComponent;
  let fixture: ComponentFixture<SujetsProposesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SujetsProposesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SujetsProposesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
