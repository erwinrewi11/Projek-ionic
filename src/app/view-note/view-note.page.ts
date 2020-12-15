import { Component, OnInit } from '@angular/core';
import {Note} from '../models/Note';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {
  note: Note = {
    id: '',
    title: '',
    content: '',
    createdAt: ''
  };
  constructor(
    private activatedRoute: ActivatedRoute, 
    private fbService: FirebaseService, 
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fbService.getNote(id).subscribe(notess => {
        this.note = notess
      });
    }
  }

  deleteNote() {
    this.fbService.deleteNote(this.note.id).then(() => {
      this.router.navigateByUrl('/tabs/home');
    }, err => {
    });
  }
}
