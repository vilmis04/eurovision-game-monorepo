export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface SignUpRequestBody extends LoginRequestBody {
  repeatPassword: string;
}
