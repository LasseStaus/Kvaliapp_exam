class Event {

  constructor(eventId, eventName, imageUrl, eventType, eventTime, eventLocation) {
    this.eventId = eventId;
    this.imageUrl = imageUrl;
    this.eventName = eventName;
    this.eventType = eventType;
    this.eventTime = eventTime;
    this.eventLocation = eventLocation;

  }

}

export default Event;