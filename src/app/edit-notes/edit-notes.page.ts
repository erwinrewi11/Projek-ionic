import { Component, OnInit } from '@angular/core';
import {Note} from '../models/Note';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.page.html',
  styleUrls: ['./edit-notes.page.scss'],
})
export class EditNotesPage implements OnInit {
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
      this.fbService.getNote(id).subscribe(noteData => {
        this.note = noteData;
      });
    }
  }

  updateNote() {
    this.fbService.updateNote(this.note).then(() => {
     this.router.navigate(['/tabs/home']);
    }, err => {
    });
  }
}
