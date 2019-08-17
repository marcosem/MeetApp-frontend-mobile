import React from 'react';
import { Text } from 'react-native';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Background from '~/components/Background';

export default function SignIn() {
  return (
    <Background>
      <Text>SignIn</Text>
      <Input icon="call" placeholder="Enter your name" />

      <Button>Enter</Button>
    </Background>
  );
}
