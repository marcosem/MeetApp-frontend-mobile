import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';
import {
  Container,
  Form,
  Separator,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

function Profile({ isFocused }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  useEffect(() => {
    if (isFocused) {
      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [isFocused]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <>
      <Header />
      <Background>
        <Container>
          <Form>
            <FormInput
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Enter your full name"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />

            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Enter your e-mail"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />

            <Separator />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Enter your current password"
              ref={oldPasswordRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Enter your new password"
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              value={password}
              onChangeText={setPassword}
            />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Confirm your new password"
              ref={confirmPasswordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <SubmitButton loading={false} onPress={handleSubmit}>
              Save changes
            </SubmitButton>

            <LogoutButton onPress={handleLogout}>Sign Out</LogoutButton>
          </Form>
        </Container>
      </Background>
    </>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'My profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Profile);
