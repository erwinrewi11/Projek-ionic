import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController,ToastController } from '@ionic/angular'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name:string;
  email:string;
  password:string;
  confirmationPassword:string;

  passwordMatch: boolean;

  constructor
  (
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastr:ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async register()
  {
    if(this.name && this.email && this.password)
    {
      const loading = await this.loadingCtrl.create({
        message:'Loading...',
        spinner:'crescent',
        showBackdrop: true
      });
      loading.present();

      this.afAuth.createUserWithEmailAndPassword(this.email, this.password).then((data)=> {
        this.afs.collection('users').doc(data.user.uid).set({
          'userId':data.user.uid,
          'name': this.name,
          'email': this.email,
          'createdAt': Date.now()
        });

        data.user.sendEmailVerification();
      }).then(()=>{
        loading.dismiss();
        this.toast('Registration Success!', 'success');
        this.router.navigate(['/login']);
      })
      .catch((error)=>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    }else{
      this.toast('Please Fill The Forms', 'danger');
    }
  }

  checkPassword()
  {
    if(this.password == this.confirmationPassword)
    {
      this.passwordMatch = true;
    } else{
      this.passwordMatch = false;
    }
  }

  async toast(message,status)
  {
    const toast= await this.toastr.create({
      message: message,
      position:'top',
      color:status,
      duration: 2000
    });

    toast.present();
  }
  back(){
    this.router.navigate(['/login']);
}
}
