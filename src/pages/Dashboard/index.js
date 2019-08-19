import React, { useEffect, useState } from 'react';

import { parseISO, addDays, isBefore } from 'date-fns';
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
  const [meetupsAux, setMeetupsAux] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [readableDate, setReadableDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false); // Using Semaphores to handle infinit scrolling
  const [doMerge, setDoMerge] = useState(false); // Using Semaphores to handle infinit scrolling
  const [reload, setReload] = useState(false); // Using this to handle realoading

  useEffect(() => {
    // Using Semaphores to handle infinit scrolling
    if (loading === false && doMerge === false) {
      setMeetups(meetupsAux);
      setRefreshing(false);
    }
  }, [doMerge, loading, meetupsAux]);

  useEffect(() => {
    // Using Semaphores to handle infinit scrolling
    if (loading === false && doMerge === true) {
      // if changing page, merge both arrays
      const newList = [...meetups, ...meetupsAux];
      const meetupList = newList.filter((elem, pos, arr) => {
        return arr.indexOf(elem) === pos;
      });

      setMeetupsAux(meetupList);
      setDoMerge(false);
    }
  }, [doMerge, loading, meetups, meetupsAux]);

  useEffect(() => {
    // if reload is changed, force it to return to page 1.
    if (reload === true) {
      setCurrentPage(1);
      setReload(false);
    }

    async function loadMeetups() {
      setRefreshing(true);
      setLoading(true);
      const response = await api.get('meetups', {
        params: {
          page: currentPage,
          date: currentDate,
        },
      });

      const data = response.data.map(meetup => {
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

      setMeetupsAux(data);
      setLoading(false);
    }

    loadMeetups();
  }, [currentDate, currentPage, reload]);

  useEffect(() => {
    setReadableDate(formatDate(currentDate));
  }, [currentDate]);

  function nextDay() {
    setCurrentPage(1);
    setCurrentDate(addDays(currentDate, 1));
  }

  function previewsDay() {
    setCurrentPage(1);
    setCurrentDate(addDays(currentDate, -1));
  }

  function refresh() {
    setReload(true);
  }

  function loadMore() {
    // Using Semaphores to handle infinit scrolling
    setLoading(true);
    setDoMerge(true);
    setCurrentPage(currentPage + 1);
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
            onRefresh={refresh}
            refreshing={refreshing}
            onEndReachedThreshold={5}
            onEndReached={meetups.length / currentPage >= 10 ? loadMore : null}
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
