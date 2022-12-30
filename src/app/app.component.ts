import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-library';

  constructor(private userService: UserService,private snackbar: MatSnackBar,private router: Router) {}
  loggedIn: boolean = false;
  ngOnInit(): void {
    this.isloggedIn();
  }
  role:any;
  isloggedIn(){
  this.loggedIn = this.userService.loggedIn();
    this.role = this.userService.getrole();
  }
 
  username = localStorage.getItem('lbrusername');

  logout(){
    localStorage.removeItem("mbltoken");
    localStorage.removeItem("lbrusername");
    localStorage.removeItem("lbrrole");
    this.snackbar.open('Logged Out Successfully!!', "", {duration: 2000});
    this.isloggedIn();
    this.role = this.userService.getrole();
    this.router.navigate(["/login"]);
  }
}
