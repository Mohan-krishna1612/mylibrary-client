import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  hide = true;


  constructor(private userService: UserService,private snackbar: MatSnackBar,private router: Router) {

   }

   profileForm = new FormGroup({
    fullName: new FormControl('',[Validators.required, Validators.pattern('[A-Za-z0-9_@./#&+-]{1,150}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern('^.{8,15}$')]),
  });

  ngOnInit(): void {
  }
  get signup(){
    return this.profileForm.controls;
  }

  Signup(){
    if (this.profileForm.valid){
      const user = {
        fullName: this.profileForm.value.fullName,
        email : this.profileForm.value.email,
        password: this.profileForm.value.password,

      };
    
      this.userService.signup(user).subscribe({
        next:(data) =>{
          if (!data.result){
            this.snackbar.open('User is Already Registered Or Invalid Creditentials', "", {duration: 2000});
          }else{
            console.log(data);
            this.snackbar.open('User created Successfully!!', "", {duration: 2000});
            this.router.navigate(['/users-home']);

          }
        },
        error:() =>{console.log(this)}
        
      })

    }
  }

}
