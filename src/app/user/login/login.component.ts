import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private userService: UserService,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  Login(){
    this.userService.Login(this.profileForm.value).subscribe({
      next:(data) =>{
        localStorage.setItem('mbltoken',data.token);
        localStorage.setItem('lbrusername',data.userName);
        localStorage.setItem('lbrrole',data.role);
        this.snackbar.open('Logged In Successfully!!', "", {duration: 2000});

        if(data.role === "Admin"){
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/dashboard']);
          })
        }else{
          this.router.navigate(['/books-home'])
        }
      },
      error:() => console.log(this)
    })
  }

}
