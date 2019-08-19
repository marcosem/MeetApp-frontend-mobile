import React, { useEffect, useState } from 'react';

import { parseISO, addDays, isBefore } from 'date-fns';
import { Platform, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { Container, TitleView, Title, List } from './styles';

import formatDate from '~/utils/formatDate';

import { subscribeMeetupRequest } from '~/store/modules/meetup/actions';

function Dashboard({ isFocused }) {
  const dispatch = useDispatch();

  const [meetups, setMeetups] = useState([]); // meetup list
  const [meetupsAux, setMeetupsAux] = useState([]); // Temporary meetup list

  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
  const [readableDate, setReadableDate] = useState(''); // Readable date of current date
  const [currentPage, setCurrentPage] = useState(1); // Define the current page
  const [refreshing, setRefreshing] = useState(false); // Handle screen refreshing
  const [loading, setLoading] = useState(false); // Using Semaphores to handle infinit scrolling
  const [doMerge, setDoMerge] = useState(false); // Using Semaphores to handle infinit scrolling
  const [reload, setReload] = useState(false); // Using this to handle realoading

  // Store to Meetup list the temporary list
  useEffect(() => {
    // Using Semaphores to handle infinit scrolling
    if (loading === false && doMerge === false) {
      setMeetups(meetupsAux);
      setRefreshing(false);
    }
  }, [doMerge, loading, meetupsAux]);

  // If meetup list is different of temporary list, merge them both in a single one
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
    if (isFocused) {
      setReload(true);
    }
  }, [isFocused]);

  // Reload the meetups list
  useEffect(() => {
    // if reload is changed, force it to return to page 1.
    if (reload === true) {
      setCurrentPage(1);
      setReload(false);
    }

    // Load meetups and store in a temporary array
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
  }, [currentDate, currentPage, isFocused, reload]);

  // Update date to be readable on title bar
  useEffect(() => {
    setReadableDate(formatDate(currentDate));
  }, [currentDate]);

  // Go to next Day
  function nextDay() {
    setCurrentPage(1);
    setCurrentDate(addDays(currentDate, 1));
  }

  // Go to previews day
  function previewsDay() {
    setCurrentPage(1);
    setCurrentDate(addDays(currentDate, -1));
  }

  // Refresh screen
  function refresh() {
    setReload(true);
  }

  function loadMore() {
    // Using Semaphores to handle infinit scrolling
    setLoading(true);
    setDoMerge(true);
    setCurrentPage(currentPage + 1);
  }

  function handleSubscribe(id, title) {
    dispatch(subscribeMeetupRequest(id, title));
  }

  return (
    <>
      <Header />
      <Background>
        <Container>
          <TitleView>
            <TouchableOpacity onPress={previewsDay}>
              <Icon name="chevron-left" size={30} color="#fff" />
            </TouchableOpacity>
            <Title>{readableDate}</Title>
            <TouchableOpacity onPress={nextDay}>
              <Icon name="keyboard-arrow-right" size={30} color="#fff" />
            </TouchableOpacity>
          </TitleView>
          <List
            data={meetups}
            onRefresh={refresh}
            refreshing={refreshing}
            onEndReachedThreshold={5}
            onEndReached={meetups.length / currentPage >= 10 ? loadMore : null}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                onButtonClick={() => handleSubscribe(item.id, item.title)}
                data={item}
                subscribe
              />
            )}
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

export default withNavigationFocus(Dashboard);
