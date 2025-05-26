import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposerSujetComponent } from './proposer-sujet.component';

describe('ProposerSujetComponent', () => {
  let component: ProposerSujetComponent;
  let fixture: ComponentFixture<ProposerSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposerSujetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposerSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
