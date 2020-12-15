import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Note} from '../models/note';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.page.html',
  styleUrls: ['./exp.page.scss'],
})
export class ExpPage implements OnInit {
  note: Note = {
    title: '',
    content: '',
    createdAt: new Date().getTime()
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private fbService: FirebaseService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addNote() {
    this.fbService.addNote(this.note).then(() => {
      this.router.navigateByUrl('/tabs/home');
    }, err => {
    });
  }
}
