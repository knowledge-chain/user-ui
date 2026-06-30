export interface ISignup {
  email: string;
  password: string;
}

export interface IVerifyEmail {
  email: string;
  otp: string;
}

export interface IResendEmail {
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  email: string
  otp: string
  password: string
}


export interface ILesson {
  _id: string;
  title: string;
  wordContent: string;
  duration: number;
}

export interface ISection {
  _id: string;
  title: string;
  order: number;
  lessons: ILesson[];
}

export interface ICourseDetail {
  _id: string;
  title: string;
  description: string;
  picture: string;
  price: number;
  totalLessons: number;
  totalDuration: number;
  sections: ISection[];
}