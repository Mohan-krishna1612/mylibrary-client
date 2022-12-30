import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl = environment.URL;

  constructor(private http: HttpClient) { }

  createBook(form:any){
    return this.http.post<any>(`${this.baseUrl}book/createbook`, form);
   }

   getBookById(id:any){
    return this.http.get<any>(`${this.baseUrl}book/getbookbyid/${id}`);
   }

   updateBookById(id:any, data:any){
    return this.http.put<any>(`${this.baseUrl}book/editbookbyid/${id}`,data);
   }

   getAllBooks(){
    return this.http.get<any>(`${this.baseUrl}book/getallbooks`);
   }

   getDashBoardData(){
    return this.http.get<any>(`${this.baseUrl}book/getdashboarddata`);

   }

   buyBook(id:any){
    return this.http.post<any>(`${this.baseUrl}book/buybook/${localStorage.getItem('mbltoken')}`, id);
   }

   returnBook(id:any){
    return this.http.post<any>(`${this.baseUrl}book/returnbook/${localStorage.getItem('mbltoken')}`,id);
   }

   deleteBook(id:any){
    return this.http.delete<any>(`${this.baseUrl}book/deletebookbyid/${id}`);
   }
   
   getAvailBooks(){
    return this.http.get<any>(`${this.baseUrl}book/getavailbooks`);
   }

   getMyBooks(){
      return this.http.get<any>(`${this.baseUrl}book/getmybooks/${localStorage.getItem('mbltoken')}`);
   }

   submitReport(data:any){
    return this.http.post<any>(`${this.baseUrl}book/reportbook`, data);
   }

   getReportData(){
    return this.http.get<any>(`${this.baseUrl}book/getreports`);
   }
}
