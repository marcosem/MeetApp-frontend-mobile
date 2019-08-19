import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';

import { subscribeMeetupSuccess, subscribeMeetupFailed } from './actions';

// ////////////////////////////////////////////////////////////////////////////
// Subscribe to a meetup
//
export function* subscribeMeetup({ payload }) {
  try {
    const { id, title } = payload;

    yield call(api.post, `meetups/${id}/subscribe`);

    Alert.alert(
      'Meetup Subscription',
      `You are successfully subscribed to meetup: '${title}'!`
    );

    yield put(subscribeMeetupSuccess());
  } catch (err) {
    if (err.response) {
      Alert.alert(
        'Meetup Subscription failed',
        `Error: ${err.response.data.error}`
      );
      console.tron.error(err.response.data.error);
    } else {
      Alert.alert(
        'Meetup Subscription failed',
        'Unable to subscribe to this meetup!'
      );
      console.tron.error(err);
    }

    yield put(subscribeMeetupFailed());
  }
}

export default all([
  takeLatest('@meetup/SUBSCRIBE_MEETUP_REQUEST', subscribeMeetup),
]);
