// ok
export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

// ok
export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

// ok
export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password },
  };
}

// ok
export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

// ok
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
