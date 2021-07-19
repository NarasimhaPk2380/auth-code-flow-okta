export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IRegistrationResponse {
  id: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ISession {
  sessionId: string;
  userId: string;
  userEmail: string;
}
