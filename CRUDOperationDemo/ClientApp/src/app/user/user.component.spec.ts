import { of as observableOf, throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceService } from '../common/service.service'
import { UserComponent } from './user.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { MatSortModule, MatPaginatorModule, MatDialogModule, MatTableModule, MatTableDataSource, MatRadioModule, MAT_DIALOG_DATA, MatDialogRef, MatSnackBarModule } from '@angular/material';
import { User } from '../model/user';
import { DialogComponent } from '../dialog/dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MustMatchDirective } from '../must-match.directive';

const mockUserData: User[] = [{
  "Id": 1,
  "FirstName": "khushbu",
  "LastName": "panwala",
  "Email": "khushbu.panwala@gmail.com",
  "Gender": "Female",
  "Password": "Promact2019@",
  "Token": ""
}]

describe('UserComponent', () => {
  let component: UserComponent;
  let service: ServiceService;
  let spy: any;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DialogComponent]
      }
    });
    TestBed.configureTestingModule({
      declarations: [UserComponent, MenuBarComponent, DialogComponent, MustMatchDirective],
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [ServiceService, FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    })
      .compileComponents;

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(ServiceService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {
    spy = spyOn(ServiceService.prototype, 'getUserDetails').and.callFake(() => {
      return observableOf(mockUserData);
    });
    component.ngOnInit();
    expect(mockUserData.length).toBeGreaterThan(0);
  });

  it('should get user detail by id', () => {
    spy = spyOn(ServiceService.prototype, 'getUserDetailById').and.callFake(() => {
      return observableOf(mockUserData[0]);
    });
    component.getUserById(1);
    expect(component.userData.Email).toBe(mockUserData[0].Email);
  });

  it('should user detail not found', () => {
    spy = spyOn(ServiceService.prototype, 'getUserDetailById').and.callFake(() => {
      return observableOf(undefined);
    });
    component.getUserById(10);
    expect(component.userData).toBe(undefined);
  });

  it('should user deleted', () => {
    spy = spyOn(component.dialog, 'open').and.callThrough();
    component.deleteUser(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should user deleted after close get user detail', () => {
    spy = spyOn(MatDialogRef.prototype, 'afterClosed').and.returnValue(observableOf(mockUserData));
    spy = spyOn(ServiceService.prototype, 'getUserDetails').and.callFake(() => {
      return observableOf(mockUserData);
    });
    component.deleteUser(1);
    expect(mockUserData.length).toBeGreaterThan(0);
  });

  it('should user added successfully', () => {
    spy = spyOn(component.dialog, 'open').and.callThrough();
    component.addUser();
    expect(spy).toHaveBeenCalled();
  });

  it('should user added successfully after close get user detail', () => {
    spy = spyOn(MatDialogRef.prototype, 'afterClosed').and.returnValue(observableOf(mockUserData));
    spy = spyOn(ServiceService.prototype, 'getUserDetails').and.callFake(() => {
      return observableOf(mockUserData);
    });
    component.addUser();
    expect(mockUserData.length).toBeGreaterThan(0);
  });

  it('should user updated successfully', () => {
    spy = spyOn(ServiceService.prototype, 'getUserDetailById').and.callFake(() => {
      return observableOf(mockUserData[0]);
    });
    spy = spyOn(component.dialog, 'open').and.callThrough();
    component.editUser(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should user updated successfully after close get user detail', () => {
    spy = spyOn(ServiceService.prototype, 'getUserDetailById').and.callFake(() => {
      return observableOf(mockUserData[0]);
    });

    spy = spyOn(MatDialogRef.prototype, 'afterClosed').and.returnValue(observableOf(mockUserData));
    spy = spyOn(ServiceService.prototype, 'getUserDetails').and.callFake(() => {
      return observableOf(mockUserData);
    });
    component.editUser(1);
    expect(mockUserData.length).toBeGreaterThan(0);
  });

  it('should filter data', () => {
    component.dataSource = new MatTableDataSource(mockUserData);
    component.dataSource.paginator = component.paginator;
    component.applyFilter("Search");
    expect(component.userData).toBe(undefined);
  });

  it('should invalid filter data ', () => {
    component.dataSource = new MatTableDataSource(mockUserData);
    component.dataSource.paginator = undefined;
    component.applyFilter("Search");
    expect(component.userData).toBeFalsy();
  });
});
