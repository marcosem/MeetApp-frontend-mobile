import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Container,
  TopImage,
  Banner,
  MeetupTitle,
  MeetupDetails,
  MeetupDetailsRow,
  MeetupDetailsText,
  SubscribeButton,
} from './styles';

export default function Meetup({ data, subscribe }) {
  return (
    <Container past={data.isPast}>
      <TopImage>
        <Banner
          source={{
            uri: data.banner
              ? `${data.banner.url}`
              : 'https://images.template.net/wp-content/uploads/2017/04/13092105/FEATURE2.jpg',
          }}
        />
      </TopImage>
      <MeetupTitle>{data.title}</MeetupTitle>
      <MeetupDetails>
        <MeetupDetailsRow>
          <Icon name="event" size={14} color="#999" />
          <MeetupDetailsText>{data.formattedDate}</MeetupDetailsText>
        </MeetupDetailsRow>

        <MeetupDetailsRow>
          <Icon name="place" size={14} color="#999" />
          <MeetupDetailsText>{data.location}</MeetupDetailsText>
        </MeetupDetailsRow>

        <MeetupDetailsRow>
          <Icon name="person" size={14} color="#999" />
          <MeetupDetailsText>Organizer: {data.user.name}</MeetupDetailsText>
        </MeetupDetailsRow>
      </MeetupDetails>
      {!data.isPast && (
        <SubscribeButton loading={false} onPress={() => {}}>
          {subscribe ? 'Subscribe' : 'Cancel subscription'}
        </SubscribeButton>
      )}
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    banner: PropTypes.shape({
      url: PropTypes.string,
      id: PropTypes.number,
      path: PropTypes.string,
    }),
    formattedDate: PropTypes.string,
    isPast: PropTypes.bool,
  }).isRequired,
  subscribe: PropTypes.bool,
};

Meetup.defaultProps = {
  subscribe: true,
};
