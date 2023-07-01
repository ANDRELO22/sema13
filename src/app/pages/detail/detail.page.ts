import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import Song from 'src/app/song.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  song: any = {};
  songId: any;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public router: Router
  ) {}

  ngOnInit() {
    this.songId = this.route.snapshot.paramMap.get('id');
    this.songInfo();
  }

  async songInfo() {
    this.song = await (
      await this.firestoreService.getSongDetail(this.songId)
    ).data();
  }

  async deleteSong(song: Song) {
    this.song.id = this.songId;
    const alert = await this.alertController.create({ message: 'Are you sure you want to delete the song?', buttons: [
      {
        text: 'Cancel', role: 'cancel', handler: blah => {
          console.log('Confirun Cancel: blah');
        },
      },
      {
        text: 'Okay', handler: async () => {
          await this.firestoreService.deleteSong(song);
          this.router.navigateByUrl('');
        },
      },
    ] })
    await alert.present();
  }
}
