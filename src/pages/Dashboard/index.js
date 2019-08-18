import React, { useEffect, useState } from 'react';

import { parseISO, addDays, isSameDay, isBefore } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { Container, TitleView, Arrow, Title, List } from './styles';

import formatDate from '~/utils/formatDate';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [readableDate, setReadableDate] = useState('');

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const dataFiltered = response.data.filter(meetup => {
        const parsedDate = parseISO(meetup.date);
        return isSameDay(parsedDate, currentDate);
      });

      const data = dataFiltered.map(meetup => {
        // Replace localhost by IP address when running in Android device
        if (Platform.OS === 'android') {
          if (meetup.banner) {
            meetup.banner.url = meetup.banner.url.replace(
              'localhost',
              '192.168.2.5'
            );
          }
        }

        const parsedDate = parseISO(meetup.date);
        const formattedDate = formatDate(parsedDate, true);
        const isPast = isBefore(parsedDate, new Date());

        return {
          ...meetup,
          formattedDate,
          isPast,
        };
      });

      setMeetups(data);
    }

    loadMeetups();
  }, [currentDate]);

  useEffect(() => {
    setReadableDate(formatDate(currentDate));
  }, [currentDate]);

  function nextDay() {
    setCurrentDate(addDays(currentDate, 1));
  }

  function previewsDay() {
    setCurrentDate(addDays(currentDate, -1));
  }

  return (
    <>
      <Header />
      <Background>
        <Container>
          <TitleView>
            <Arrow onPress={previewsDay}>
              <Icon name="chevron-left" size={30} color="#fff" />
            </Arrow>
            <Title>{readableDate}</Title>
            <Arrow onPress={nextDay}>
              <Icon name="keyboard-arrow-right" size={30} color="#fff" />
            </Arrow>
          </TitleView>
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Meetup data={item} subscribe />}
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
