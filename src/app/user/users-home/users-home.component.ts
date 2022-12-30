import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss']
})
export class UsersHomeComponent implements OnInit {

 
  userDetails:any;
  constructor(private userService:UserService,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails(){
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.userDetails = data.data
      },
      error: () => console.log(this)
    })
  }

  buy(id:any){
    // let data = {
    //   id:id
    // }
    // this.bookService.buyBook(data).subscribe({
    //   next:(data) =>{
    //     console.log(data)
    //   }
    // })
  }

  return(id:any){
    // let data = {
    //   id:id
    // }
    // this.bookService.returnBook(data).subscribe({
    //   next:(data) =>{
    //     console.log(data)
    //   }
    // })
  }

  editUser(id:any)
{
  this.router.navigate(['/edit-user', id]);
}



  deleteUser(id:any){

    this.userService.deleteUserByid(id).subscribe({
      next:(data) =>{
        if(data.result){
          this.snackbar.open(data.message, "", {duration: 2000});
          this.getUserDetails();
        }      }
    })
  }
}
