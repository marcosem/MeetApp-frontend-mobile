import React from 'react';
import PropTypes from 'prop-types';
import { View, BackHandler, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

export default function BackHandlerListener({ signed }) {
  const dispatch = useDispatch();

  if (Platform.OS === 'android') {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (signed) {
        dispatch(signOut());
        return true;
      }
      BackHandler.exitApp();
      return false;
    });
  }

  return <View />;
}

BackHandlerListener.propTypes = {
  signed: PropTypes.bool.isRequired,
};
