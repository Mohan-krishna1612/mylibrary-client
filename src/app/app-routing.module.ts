import { AuthGuard } from './guards/auth.guard';
import { ReportsHomeComponent } from './books/reports-home/reports-home.component';
import { ReportComponent } from './books/report/report.component';
import { BorrowedBooksComponent } from './books/borrowed-books/borrowed-books.component';
import { UsersHomeComponent } from './user/users-home/users-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { BooksHomeComponent } from './books/books-home/books-home.component';
import { CreateBookComponent } from './books/create-book/create-book.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { LoginComponent } from './user/login/login.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'create-user', component:CreateUserComponent,canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'edit-user/:id', component:EditUserComponent,canActivate: [AuthGuard]},
  {path: 'create-book', component:CreateBookComponent,canActivate: [AuthGuard]},
  {path: 'books-home', component:BooksHomeComponent,canActivate: [AuthGuard]},
  {path: 'edit-book/:id', component:EditBookComponent,canActivate: [AuthGuard]},
  {path: 'dashboard', component:DashboardComponent,canActivate: [AuthGuard]},
  {path: 'users-home', component:UsersHomeComponent,canActivate: [AuthGuard]},
  {path: 'my-books', component:BorrowedBooksComponent,canActivate: [AuthGuard]},
  {path: 'report/:id', component: ReportComponent,canActivate: [AuthGuard]},
  {path:'reports-home', component:ReportsHomeComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
