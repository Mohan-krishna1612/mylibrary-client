import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  hide = true;


  constructor(private userService: UserService,private snackbar: MatSnackBar,private router: Router, private route: ActivatedRoute) {

   }
   userData:any;
   updateUserForm = new FormGroup({
    fullName: new FormControl('',[Validators.required, Validators.pattern('[A-Za-z0-9_@./#&+-]{1,150}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.pattern('^.{8,15}$')]),
  });

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    let id = this.route.snapshot.paramMap.get('id') ;
    this.userService.getUserByID(id).subscribe({
      next:(data) => {
        this.userData = data.data;

        this.updateUserForm.patchValue({

          fullName:data.message.fullName,
          email:data.message.email
        });
      },
      error: () => console.log(this)
    })
  }

  get signup(){
    return this.updateUserForm.controls;
  }

  updateUser(){
    let id = this.route.snapshot.paramMap.get('id')

    this.userService.updateUserDetails(id, this.updateUserForm.value).subscribe({
      next: (data) =>{
        if(data.result){
          this.snackbar.open(data.message, "", {duration: 2000});
          this.router.navigate(['/books-home']);
        }
      }
    })
  }


}
