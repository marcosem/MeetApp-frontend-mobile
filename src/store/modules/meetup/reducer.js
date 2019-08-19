import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/SUBSCRIBE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@meetup/SUBSCRIBE_MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }

      case '@meetup/SUBSCRIBE_MEETUP_FAILED': {
        draft.loading = false;
        break;
      }

      case '@meetup/UNSUBSCRIBE_MEETUP_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@meetup/UNSUBSCRIBE_MEETUP_SUCCESS': {
        draft.loading = false;
        break;
      }

      case '@meetup/UNSUBSCRIBE_MEETUP_FAILED': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
