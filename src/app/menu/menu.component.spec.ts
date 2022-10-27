import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuComponent } from './menu.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {

    const DishServiceStub = {
      getDishes: function(): Observable<Dish[]> {
        return of(DISHES);
      }
    };

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        FlexLayoutModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent}])
      ],
      
      declarations: [ MenuComponent ],
      providers: [
        { provide: DishService, useValue: DishServiceStub},
        { provide: 'BaseURL', useValue: baseURL}
      ]
    })
    .compileComponents();

    const dishservice = TestBed.get(DishService);

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dishes items should be 4', () => {
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipakoda');
    expect(component.dishes[3].featured).toBeFalsy();
  });
});
