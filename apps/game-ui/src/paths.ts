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
  GROUP = '/group',
}

enum AuthPaths {
  SIGN_UP = 'sign-up',
  LOGIN = 'login',
  LOGOUT = 'logout',
  IS_AUTHENTICATED = 'is-authenticated',
}

enum GroupPaths {
  ID = ':id',
}

export const paths = {
  home: RootPaths.HOME,
  login: `/${AuthPaths.LOGIN}`,
  signUp: `/${AuthPaths.SIGN_UP}`,
  groups: `/${HomePaths.GROUPS}`,
  group: `${HomePaths.GROUPS}/${GroupPaths.ID}`,
  voting: `/${HomePaths.VOTING}`,
  leaderboard: `/${HomePaths.LEADERBOARD}`,
};

export const endpoints = {
  authDomain: {
    login: `${RootRoutes.AUTH}/${AuthPaths.LOGIN}`,
    signUp: `${RootRoutes.AUTH}/${AuthPaths.SIGN_UP}`,
    logout: `${RootRoutes.AUTH}/${AuthPaths.LOGOUT}`,
    isAuthenticated: `${RootRoutes.AUTH}/${AuthPaths.IS_AUTHENTICATED}`,
  },
  groupDomain: {
    groups: RootRoutes.GROUP,
  },
};
