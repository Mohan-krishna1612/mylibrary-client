import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-home',
  templateUrl: './books-home.component.html',
  styleUrls: ['./books-home.component.scss']
})
export class BooksHomeComponent implements OnInit {
  role = localStorage.getItem('lbrrole');
  booksDetails:any;
  constructor(private bookService:BooksService,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    if(this.role != 'Admin'){
      this.getBookDetails();
    }else{
      this.getAllBookDetails();
    }
  }
  getBookDetails(){
    this.bookService.getAvailBooks().subscribe({
      next: (data) => {
        this.booksDetails = data.data
      },
      error: () => console.log(this)
    })
  }
  getAllBookDetails(){
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.booksDetails = data.data
      },
      error: () => console.log(this)
    })
  }

  buy(id:any){
    let data = {
      id:id
    }
    this.bookService.buyBook(data).subscribe({
      next:(data) =>{
        this.getBookDetails();
        this.snackbar.open(data.message, "", {duration: 2000});
        this.router.navigate(['/my-books'])
      }
    })
  }

  return(id:any){
    let data = {
      id:id
    }
    this.bookService.returnBook(data).subscribe({
      next:(data) =>{

        if(data.result){
          this.snackbar.open(data.message, "", {duration: 2000});
          this.router.navigate(['/books-home']);
        }
      }
    })
  }
  deleteBook(id:any){

    this.bookService.deleteBook(id).subscribe({
      next:(data) =>{
        if(data.result){
          this.snackbar.open(data.message, "", {duration: 2000});
          this.getBookDetails();
        }      }
    })
  }

  editBook(id:any){
    this.router.navigate(['/edit-book', id])
  }

  submitReport(name:any){
    this.router.navigate(['/report', name]);
  }

}
