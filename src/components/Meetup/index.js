import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function Meetup() {
  return (
    <Container>
      <TopImage>
        <Banner
          source={{
            uri:
              'https://images.template.net/wp-content/uploads/2017/04/13092105/FEATURE2.jpg',
          }}
        />
      </TopImage>
      <MeetupTitle>Meetup de React Native</MeetupTitle>
      <MeetupDetails>
        <MeetupDetailsRow>
          <Icon name="event" size={14} color="#999" />
          <MeetupDetailsText>24 de Junho, às 20h</MeetupDetailsText>
        </MeetupDetailsRow>

        <MeetupDetailsRow>
          <Icon name="place" size={14} color="#999" />
          <MeetupDetailsText>Rua Guilherme Gembala, 260</MeetupDetailsText>
        </MeetupDetailsRow>

        <MeetupDetailsRow>
          <Icon name="person" size={14} color="#999" />
          <MeetupDetailsText>Organizador: Marcos Mathias</MeetupDetailsText>
        </MeetupDetailsRow>
      </MeetupDetails>
      <SubscribeButton loading={false} onPress={() => {}}>
        Subscribe
      </SubscribeButton>
    </Container>
  );
}
