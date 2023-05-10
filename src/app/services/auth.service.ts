import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  bool = false;

  constructor() { }

  getAuthStatus(){
    return this.bool;
  }
}
