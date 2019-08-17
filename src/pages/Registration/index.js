import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';
// import { Container } from './styles';

export default function Registration() {
  return (
    <>
      <Header />
      <Background />
    </>
  );
}

Registration.navigationOptions = {
  tabBarLabel: 'Registrations',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
