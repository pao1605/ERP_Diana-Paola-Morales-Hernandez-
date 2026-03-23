import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser = signal<any>(this.getStoredUser());

  userSignal = this.currentUser.asReadonly();

  login(user:any){
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(){
    return this.currentUser();
  }

  logout(){
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  private getStoredUser(){
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

}