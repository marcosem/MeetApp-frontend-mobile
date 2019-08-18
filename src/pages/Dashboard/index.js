import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { Container, TitleView, Arrow, Title, List } from './styles';

const data = [1, 2, 3, 4, 5];

export default function Dashboard() {
  return (
    <>
      <Header />
      <Background>
        <Container>
          <TitleView>
            <Arrow onPress={() => {}}>
              <Icon name="chevron-left" size={30} color="#fff" />
            </Arrow>
            <Title>18 de Agosto</Title>
            <Arrow onPress={() => {}}>
              <Icon name="keyboard-arrow-right" size={30} color="#fff" />
            </Arrow>
          </TitleView>
          <List
            data={data}
            keyExtractor={item => String(item)}
            renderItem={({ item }) => <Meetup data={item} />}
          />
        </Container>
      </Background>
    </>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
