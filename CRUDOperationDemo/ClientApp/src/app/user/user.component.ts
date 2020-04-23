import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  userDetails: User[];
  //userDetail = new User();
  userDetail: any;
  userId: number;

  constructor(private http: HttpClient, private router: Router) {
    //, @Inject('BASE_URL') baseUrl: string
    //http.get<User[]>(baseUrl + '/api/UserDetail/GetUserDetails').subscribe(result => {

  }


  ngOnInit() {
    this.getUsers();
  }
  /**
   *get user details  
   */
  getUsers() {
    this.http.get<User[]>('https://localhost:44315' + '/api/UserDetail/GetUserDetails').subscribe(result => {
      this.userDetails = result;
    }, error => console.error(error));
  }

  /**
   * add User
   * @param id: product id
   */
  addUser() {
    this.router.navigateByUrl('\addUser', { state: { id: 0 } });
  }


  /**
   * edit User
   * @param userId: user id
   */
  editUser(userId: number) {
    this.router.navigateByUrl('\addUser', { state: { id: userId } });
  }


  /**
   * Delete User 
   * @param userId: user id
   */
  deleteUser(userId: number) {
    this.http.post<User[]>('https://localhost:44315/api/UserDetail/DeleteUser', userId).subscribe(result => {
      alert("Record Deletedd Successfully!!!!");
      this.getUsers();
    }, error => console.error(error));

  }


}

