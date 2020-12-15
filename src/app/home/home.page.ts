import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private notes: Observable<Note[]>;
  searchArr=[];
  resultArr=[];

  constructor
  (
    private fbService: FirebaseService,
  ) {}


  loadData(event){
    setTimeout(()=> {
      console.log('Done');
      event.target.complete();
      
    },500);
  }

  ngOnInit():void{
    this.notes = this.fbService.getNotes();
  }
}
