import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  height: 345px;
  background: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
  opacity: ${props => (props.past ? 0.7 : 1)};
`;

export const TopImage = styled.View`
  height: 150px;
  align-items: center;
`;

export const Banner = styled.Image`
  height: 100%;
  width: 100%;
  background: #d8d8d8;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const MeetupTitle = styled.Text`
  margin: 15px 20px 10px 20px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

export const MeetupDetails = styled.View`
  margin-left: 30px;
`;

export const MeetupDetailsRow = styled.View`
  padding-left: 5px;
  margin: 2px 5px 2px 5px;
  flex-direction: row;
  width: 195px;
`;

export const MeetupDetailsText = styled.Text`
  padding-left: 5px;
  font-size: 13px;
  color: #999;
`;

export const SubscribeButton = styled(Button)`
  margin: 20px 20px 10px 20px;
`;
