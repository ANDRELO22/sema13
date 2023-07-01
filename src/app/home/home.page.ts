import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  songList: any = [];
  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.firestoreService.getSongList().subscribe((songs) => {
      this.songList = songs;
    });
  }
}
