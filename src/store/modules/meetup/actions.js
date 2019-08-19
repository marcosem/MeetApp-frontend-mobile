export function subscribeMeetupRequest(id, title) {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_REQUEST',
    payload: { id, title },
  };
}

export function subscribeMeetupSuccess() {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_SUCCESS',
  };
}

export function subscribeMeetupFailed() {
  return {
    type: '@meetup/SUBSCRIBE_MEETUP_FAILED',
  };
}
