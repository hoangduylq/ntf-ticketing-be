export interface ILogin {
  accessToken: string;
  payload: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
