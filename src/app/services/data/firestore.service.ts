import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import Song from '../../song.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(public firestore: Firestore) {}

  createSong(song: Song) {
    const placeRef = collection(this.firestore, 'songList');
    return addDoc(placeRef, song);
  }

  getSongList(): Observable<Song[]> {
    const placeRef = collection(this.firestore, 'songList');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Song[]>;
  }

  getSongDetail(songId: string) {
    const placeDocRef = doc(this.firestore, `songList/${songId}`);
    return getDoc(placeDocRef);
  }

  deleteSong(song: Song) {
    const placeDocRef = doc(this.firestore, `songList/${song.id}`);
    return deleteDoc(placeDocRef);
  }
}
