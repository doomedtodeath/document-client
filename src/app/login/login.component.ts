import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  submit($event: NgForm){
    console.log($event.valid)
    if($event.valid){
      this.auth.bool = true;
      this.router.navigate(['/view'])
    }
  }

  print(e: any){
    console.log(e);
  }

}
