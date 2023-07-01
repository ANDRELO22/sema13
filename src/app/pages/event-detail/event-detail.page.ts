import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  currentEvent: any = {};
  eventId: any;

 public guestName = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventInfo();
  }

  async eventInfo() {
    this.currentEvent = await (
      await this.eventService.getEventDetail(this.eventId)
    ).data();
  }
  addGuest(guestName: string) {
    this.eventService
    .addGuest(guestName, this.eventId, this.currentEvent.price)
    .then(() => {
    this.guestName ='';
    this.eventInfo();
    });
  }
}
