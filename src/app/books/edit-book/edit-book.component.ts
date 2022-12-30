import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  BookDetails:any;
  constructor(private bookService:BooksService,private snackbar: MatSnackBar,private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookDetails();
  }
  bookEditForm = new FormGroup({
    bookName: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  getBookDetails(){
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookById(id).subscribe({
      next: (data) =>{
        this.BookDetails = data.data;
        this.bookEditForm.patchValue({
          bookName:data.data.bookName,
          description:data.data.description
        });
      }
    })
  }


  updateBook(){
    const id = this.BookDetails._id;
    this.bookService.updateBookById(id, this.bookEditForm.value).subscribe({
      next:(data) => {
        if(data.result){
          this.snackbar.open(data.message, "", {duration: 2000});
          this.router.navigate(['/books-home']);
        }
      }
    })
  }
}
