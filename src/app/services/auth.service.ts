import { Injectable } from '@angular/core';
import { User } from '../models/user'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router'
import { Observable,of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable()

export class AuthService {
  password:string;
  user$: Observable<User>;
  user:User;
  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr:ToastController
  ) { 
    this.user$ =this.afAuth.authState.pipe(
      switchMap(user =>{
        if(user)
        {
         return this.afs.doc('users/${user.uid}').valueChanges();
        }else{
          return of(null);
        }
      })
    );
  }// end of const

  async login(email:string ,pass:string)
{
  const loading = await this.loadingCtrl.create({
    message: 'Authenticating..',
    spinner: 'crescent',
    showBackdrop: true
  });
  loading.present();

  this.afAuth.signInWithEmailAndPassword(email,pass).then((data)=>{
    if(!data.user.emailVerified){
      loading.dismiss();
      this.toast('Please verified your email');
      this.logout();
    }
    else{
      loading.dismiss();
      this.router.navigate(['/tabs']);
    }
  })
}

logout()
{
  this.afAuth.signOut().then(()=> {
    this.router.navigate(['/login']);
  });
}
  async toast(message:string)
  {
    const toast = await this.toastr.create({
      message: message,
      position: 'top',
      color: status,
      duration: 2000
    });
    toast.present();
  }



}
