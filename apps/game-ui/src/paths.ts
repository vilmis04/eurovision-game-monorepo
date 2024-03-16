enum RootPaths {
  HOME = '/',
  AUTH = '/auth',
}

enum AuthPaths {
  SIGN_UP = 'sign-up',
  LOGIN = 'login',
}

export const paths = {
  home: RootPaths.HOME,
  login: `/${AuthPaths.LOGIN}`,
  signUp: `/${AuthPaths.SIGN_UP}`,
};

export const endpoints = {
  login: `${RootPaths.AUTH}/${AuthPaths.LOGIN}`,
  signUp: `${RootPaths.AUTH}/${AuthPaths.SIGN_UP}`,
};
