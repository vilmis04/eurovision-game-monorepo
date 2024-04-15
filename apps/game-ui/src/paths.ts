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
  ADMIN = '/admin',
}

enum AuthPaths {
  SIGN_UP = 'sign-up',
  LOGIN = 'login',
  LOGOUT = 'logout',
  IS_AUTHENTICATED = 'is-authenticated',
}

enum GroupPaths {
  ID = ':id',
  CREATE = 'create',
  INVITE = 'join/:inviteCode',
  JOIN = 'join',
}

export const paths = {
  home: RootPaths.HOME,
  login: `/${AuthPaths.LOGIN}`,
  signUp: `/${AuthPaths.SIGN_UP}`,
  groups: `/${HomePaths.GROUPS}`,
  group: {
    build: (id: number) => `/${HomePaths.GROUPS}/${id}`,
    url: `/${HomePaths.GROUPS}/${GroupPaths.ID}`,
  },
  groupCreate: `/${HomePaths.GROUPS}/${GroupPaths.CREATE}`,
  joinGroup: `/${HomePaths.GROUPS}/${GroupPaths.INVITE}`,
  voting: `/${HomePaths.VOTING}`,
  leaderboard: `/${HomePaths.LEADERBOARD}`,
};

export const endpoints = {
  generalInfoDomain: {
    admin: RootRoutes.ADMIN,
  },
  authDomain: {
    login: `${RootRoutes.AUTH}/${AuthPaths.LOGIN}`,
    signUp: `${RootRoutes.AUTH}/${AuthPaths.SIGN_UP}`,
    logout: `${RootRoutes.AUTH}/${AuthPaths.LOGOUT}`,
    isAuthenticated: `${RootRoutes.AUTH}/${AuthPaths.IS_AUTHENTICATED}`,
  },
  groupDomain: {
    groups: RootRoutes.GROUP,
    group: {
      build: (id: number) => `${RootRoutes.GROUP}?id=${id}`,
    },
    deleteGroup: {
      build: (id: number) => `${RootRoutes.GROUP}/${id}`,
    },
    createInvitationLink: {
      build: (id: number) => `${RootRoutes.GROUP}/${id}/generate-invite`,
    },
    joinGroup: {
      build: () => `${RootRoutes.GROUP}/${GroupPaths.JOIN}`,
    },
  },
};
