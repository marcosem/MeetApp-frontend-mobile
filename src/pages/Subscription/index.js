import React, { useEffect, useState } from 'react';
import { parseISO, isBefore } from 'date-fns';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { withNavigationFocus } from 'react-navigation';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { Container, List } from './styles';

import formatDate from '~/utils/formatDate';

import { unsubscribeMeetupRequest } from '~/store/modules/meetup/actions';

function Subscription({ isFocused }) {
  const dispatch = useDispatch();
  const [subscriptions, setSubscriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false); // Using this to handle realoading

  useEffect(() => {
    if (isFocused) {
      setReload(true);
    }
  }, [isFocused]);

  // Reload the meetups list
  useEffect(() => {
    if (reload === true) {
      setReload(false);
    }

    // Load meetups and store in a temporary array
    async function loadSubscriptions() {
      setRefreshing(true);
      // setLoading(true);
      const response = await api.get('subscriptions');

      const data = response.data.map(subscription => {
        // Replace localhost by IP address when running in Android device
        if (Platform.OS === 'android') {
          if (subscription.Meetup.banner) {
            subscription.Meetup.banner.url = subscription.Meetup.banner.url.replace(
              'localhost',
              '192.168.2.5'
            );
          }
        }

        const parsedDate = parseISO(subscription.Meetup.date);
        const formattedDate = formatDate(parsedDate, true);
        const isPast = isBefore(parsedDate, new Date());

        subscription.Meetup.formattedDate = formattedDate;
        subscription.Meetup.isPast = isPast;

        return {
          ...subscription,
        };
      });

      setSubscriptions(data);
      setRefreshing(false);
    }

    loadSubscriptions();
  }, [reload]);

  function refresh() {
    setReload(true);
  }

  function handleUnsubscribe(id, title) {
    dispatch(unsubscribeMeetupRequest(id, title));
    setReload(true);
  }

  return (
    <>
      <Header />
      <Background>
        <Container>
          <List
            data={subscriptions}
            onRefresh={refresh}
            refreshing={refreshing}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                onButtonClick={() =>
                  handleUnsubscribe(item.id, item.Meetup.title)
                }
                data={item.Meetup}
                subscribe={false}
              />
            )}
          />
        </Container>
      </Background>
    </>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
