import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  constructor(private bookService:BooksService,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
  }

  bookForm = new FormGroup({
    bookName: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  createBook(){
    this.bookService.createBook(this.bookForm.value).subscribe({
      next:(data) =>{
        if(data.result){
          this.snackbar.open(data.message, "", {duration: 2000});
          this.router.navigate(['/books-home']);
        }
      },
      error: () => console.log(this)
    })
  }


}
