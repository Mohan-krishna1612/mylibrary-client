import { BooksService } from 'src/app/services/books.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardContent:any;

  constructor(private bookService:BooksService) { }

  ngOnInit(): void {
    this.getDashBoardData();
  }
  getDashBoardData(){
    this.bookService.getDashBoardData().subscribe({
      next:(data) => {
        if(data.result){
          console.log(data.data)
          this.dashboardContent = data.data
        }
      }
    });
  }

}
