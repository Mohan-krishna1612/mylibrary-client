import { BooksService } from 'src/app/services/books.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private bookService:BooksService,private route: ActivatedRoute,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
  }

  reportForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required]),

  });

  submitReport(){
    let data = {
      title:this.reportForm.value.title,
      description:this.reportForm.value.title,
      bookName:this.route.snapshot.paramMap.get('id'),
      reportedUserName:localStorage.getItem('lbrusername')
    }
    this.bookService.submitReport(data).subscribe({
      next:(data) => {
        if(data.result){
          this.snackbar.open(data.message, "", {duration: 2000});
          this.router.navigate(['/books-home']);
        }
      }
    });
  }

}
