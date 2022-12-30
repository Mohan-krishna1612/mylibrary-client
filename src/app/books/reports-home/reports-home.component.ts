import { BooksService } from 'src/app/services/books.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.scss']
})
export class ReportsHomeComponent implements OnInit {

  reportsData:any;
  constructor(private bookService:BooksService) { }

  ngOnInit(): void {
    this.getReports();
  }
  getReports(){
    this.bookService.getReportData().subscribe({
      next:(data) => {
        if(data){
          this.reportsData = data.data.reverse();
        }
      }
    })
  }

}
