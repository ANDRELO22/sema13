import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { deleteDoc, doc, getDoc, runTransaction } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(public firestore: Firestore, private authService: AuthService) {}

  async createEvent(
    eventName: string,
    eventPrice: number,
    eventCost: number,
    eventDate: string,
  ) {
    let user = await this.authService.getUser();
    const placeRef = collection(this.firestore, `userProfile/${user?.uid}/eventList`);
    return addDoc(placeRef, {
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1,
    });
  }

  getEventList() {
    let user = this.authService.getUser();
    const placeRef = collection(this.firestore, `userProfile/${user?.uid}/eventList`);
    return collectionData(placeRef, { idField: 'id' });
  }

  getEventDetail(eventId: string) {
    let user = this.authService.getUser();
    const placeDocRef = doc(this.firestore, `userProfile/${user?.uid}/eventList/${eventId}`);
    return getDoc(placeDocRef);
  }
  async addGuest (guestName: string, eventId: string, eventPrice: number) {
    let user = this.authService.getUser();
    const sfDocRef = doc(this.firestore, `userProfile/${user?.uid}/eventList/${eventId}`);
    const placeRef = collection(this.firestore, `userProfile/${user?.uid}/eventList/${eventId}/guestList`);

    try{
      await runTransaction(this.firestore, async (transaction) => {
       const sfDoc = await transaction.get(sfDocRef);

     if (!sfDoc.exists()) {
       throw "Document does not exist!";
     }


   const newRevenue = sfDoc.data()['revenue']+ eventPrice;
    transaction.update(sfDocRef, { revenue: newRevenue });
   });

   addDoc (placeRef, {guestName: guestName})
   } catch (error) {
   console.log(error);
}
 }
}

