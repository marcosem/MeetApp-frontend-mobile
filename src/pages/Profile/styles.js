import styled from 'styled-components/native';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0 15px;
`;

export const Form = styled.ScrollView.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #e5556e;
`;

export const LogoutButton = styled(Button)`
  margin-top: 20px;
  background: #d55059;
  height: 42px;
`;
