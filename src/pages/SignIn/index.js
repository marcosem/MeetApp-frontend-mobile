import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn() {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Enter your e-mail"
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Enter your password"
          />

          <SubmitButton onPress={() => {}}>Enter</SubmitButton>
        </Form>

        <SignLink onPress={() => {}}>
          <SignLinkText>Create Free Account</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
