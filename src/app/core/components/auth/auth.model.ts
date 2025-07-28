export interface ILoginModel {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  exp: string;
}

export interface IChooseMainRole {
  username: string;
  mainRole: string;
}

export interface IFetchPersonDataFromGCP {
  birthDate: string;
  documentType: number;
  seria: string;
  number: string;
}

export interface IRegisterModel {
  username: string;
  password: string;
  verificationCode: string;
  uid: string;
}

export interface IResetPasswordModel {
  userName: string;
  password: string;
  verificationCode: string;
}
