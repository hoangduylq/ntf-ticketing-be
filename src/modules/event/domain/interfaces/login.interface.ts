export interface ILogin {
  accessToken: string;
  payload: {
    email: string;
    name: string;
    role: string;
  };
}
