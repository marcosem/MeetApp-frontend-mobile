import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const TitleView = styled.View`
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 10px;
  align-items: center;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin: 0 20px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { padding: 20 },
})``;
