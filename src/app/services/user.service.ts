import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.URL;
  constructor(private http: HttpClient) { }
  
  signup(data:any){
    // const req = new HttpRequest('POST', `${this.baseUrl}auth/signup`, data, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    console.log(data,"calling here")
    return this.http.post<any>(`${this.baseUrl}user/createuser`,data); 
   }

    Login(form:any){
     return this.http.post<any>(`${this.baseUrl}user/login`, form);
    }

    getUserByID(id:any){
      return this.http.get<any>(`${this.baseUrl}user/getUserData/${id}`);
    }

    updateUserDetails(id:any,data:any){
      return this.http.put<any>(`${this.baseUrl}user/updateUserData/${id}`,data);
    }

    getAllUsers(){
      return this.http.get<any>(`${this.baseUrl}user/getalluserdata`);
    }

    deleteUserByid(id:any){
      return this.http.delete<any>(`${this.baseUrl}user/deleteuserbyid/${id}`);
    }

    loggedIn(){
      if(localStorage.getItem('mbltoken')){
        return true;
      }else{
        return false
      }
    }

    getrole(){
      return localStorage.getItem('lbrrole');
      }
}
