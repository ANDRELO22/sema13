import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  eventName: string = '';
  eventPrice: number = 0;
  eventCost: number = 0;
  eventDate: string = '';
  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {}

  createEvent(
    eventName: string,
    eventPrice: number,
    eventCost: number,
    eventDate: string
  ) {
    if (
      eventName === undefined ||
      eventPrice === undefined ||
      eventCost === undefined ||
      eventDate === undefined
    ) {
      return;
    }
    this.eventService
      .createEvent(eventName, eventPrice, eventCost, eventDate)
      .then(() => {
        this.router.navigateByUrl('home');
      });
  }
}
