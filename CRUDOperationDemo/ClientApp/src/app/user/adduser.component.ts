import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser-detail',
  templateUrl: './adduser.component.html',
})
export class AddUserComponent implements OnInit {

  userId: number;
  userDetail: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) { }

  ngOnInit() {
    if (history.state.id !== 0) {
      this.getUserById(history.state.id);
    }
    else {
      this.userDetail = new User();
      this.userDetail.id = 0;
      this.userDetail.gender = "Female";
    }
  }

  /**
   * get user by id
   * @param userId: user id
   */
  getUserById(userId: number) {
    this.http.post<User[]>('https://localhost:44315/api/UserDetail/GetUserDetailById', userId).subscribe(result => {
      this.userDetail = result;
    }, error => console.error(error));
  }

  /**
   * save or update user 
   */
  saveUser() {
    let userData = new User();
    userData.Id = this.userDetail.id;
    userData.FirstName = this.userDetail.firstName;
    userData.LastName = this.userDetail.lastName;
    userData.Email = this.userDetail.email;
    userData.Gender = this.userDetail.gender;
    userData.Password = this.userDetail.password;
    //if user id is 0 then add operation performed else update operation performed
    if (this.userDetail.id === 0) {
      this.http.post<User[]>('https://localhost:44315/api/UserDetail/AddUser', userData).subscribe(data => {
        if (data) {
          this.userDetail = data;
          alert("Record Added Successfully!!!");
        }
        else {
          alert("Sorry!!! Record not added");
        }
        this.router.navigateByUrl('userDetail');
      });
    }
    else {
      this.http.post<User[]>('https://localhost:44315/api/UserDetail/UpdateUser', userData).subscribe(data => {
        if (data) {
          this.userDetail = data;
          alert("Record Updated Successfully!!!");
        }
        else {
          alert("Sorry!!! Record not updated");
        }
        this.router.navigateByUrl('userDetail');
      });
    }
  }

  /*Cancel method
   *redirect to user detail page
   */
  cancel() {
    this.router.navigateByUrl('userDetail');
  }
}

