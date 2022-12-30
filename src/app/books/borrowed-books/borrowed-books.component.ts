import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.scss']
})
export class BorrowedBooksComponent implements OnInit {
  role = localStorage.getItem('lbrrole');
  booksDetails:any;
  constructor(private bookService:BooksService,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.getBookDetails();
  }
  getBookDetails(){
    this.bookService.getMyBooks().subscribe({
      next: (data) => {
        console.log(data)
        this.booksDetails = data.data
      },
      error: () => console.log(this)
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

}
