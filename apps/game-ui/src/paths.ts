export enum RootPaths {
  HOME = '/',
}

export enum HomePaths {
  GROUPS = 'groups',
  VOTING = 'voting',
  LEADERBOARD = 'leaderboard',
}

enum RootRoutes {
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
  groups: `/${HomePaths.GROUPS}`,
  voting: `/${HomePaths.VOTING}`,
  leaderboard: `/${HomePaths.LEADERBOARD}`,
};

export const endpoints = {
  login: `${RootRoutes.AUTH}/${AuthPaths.LOGIN}`,
  signUp: `${RootRoutes.AUTH}/${AuthPaths.SIGN_UP}`,
};
