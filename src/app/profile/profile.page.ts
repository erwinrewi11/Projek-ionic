import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AboutPageModule } from '../about/about.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  constructor(private afAuth:AngularFireAuth,
    private router:Router) { }

  ngOnInit() {

  }
  logout()
  {
    this.afAuth.signOut().then(()=> {
      this.router.navigate(['/login']);
    })
  }
  About(){
    this.router.navigateByUrl('/about');
  }
}
