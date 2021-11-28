class Event {
  constructor(eventId, eventName, imageUrl, eventType, eventTime, eventLocation, interestedUsers, goingUsers) {
    this.eventId = eventId;
    this.imageUrl = imageUrl;
    this.eventName = eventName;
    this.eventType = eventType;
    this.eventTime = eventTime;
    this.eventLocation = eventLocation;
    this.interestedUsers = interestedUsers
    this.goingUsers = goingUsers
  }
}

export default Event;