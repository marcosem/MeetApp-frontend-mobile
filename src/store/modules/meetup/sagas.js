import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';

import {
  subscribeMeetupSuccess,
  subscribeMeetupFailed,
  unsubscribeMeetupSuccess,
  unsubscribeMeetupFailed,
} from './actions';

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

// ////////////////////////////////////////////////////////////////////////////
// Subscribe to a meetup
//
export function* unsubscribeMeetup({ payload }) {
  try {
    const { id, title } = payload;

    yield call(api.delete, `subscriptions/${id}`);

    Alert.alert(
      'Meetup Usubscription',
      `You successfully unsubscribed from meetup: '${title}'!`
    );

    yield put(unsubscribeMeetupSuccess());
  } catch (err) {
    if (err.response) {
      Alert.alert(
        'Meetup Unsubscription failed',
        `Error: ${err.response.data.error}`
      );
      console.tron.error(err.response.data.error);
    } else {
      Alert.alert(
        'Meetup Unsubscription failed',
        'Unable to unsubscribe from this meetup!'
      );
      console.tron.error(err);
    }

    yield put(unsubscribeMeetupFailed());
  }
}

export default all([
  takeLatest('@meetup/SUBSCRIBE_MEETUP_REQUEST', subscribeMeetup),
  takeLatest('@meetup/UNSUBSCRIBE_MEETUP_REQUEST', unsubscribeMeetup),
]);
