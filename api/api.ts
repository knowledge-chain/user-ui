import { IForgotPassword, ILogin, IResendEmail, IResetPassword, ISignup, IVerifyEmail } from "./api.interface";
import { axiosInstance } from "./axios";

// Auth
export const Signup = (body: ISignup) => {
  return axiosInstance().post("/user/sign-up", body);
};

export const VerifyEmail = (body: IVerifyEmail) => {
  return axiosInstance().post("/user/verify-email", body);
};

export const ResendEmail = (body: IResendEmail) => {
  return axiosInstance().post("/user/resend-email", body);
};

export const Login = (body: ILogin) => {
  return axiosInstance().post("/user/login", body);
};

export const ForgotPassword = (body: IForgotPassword) => {
  return axiosInstance().post("/user/forgot-password", body);
};

export const ResetPassword = (body: IResetPassword) => {
  return axiosInstance().post("/user/reset-password", body)
}

export const GetProfile = () => {
  return axiosInstance().get("/user/profile");
};

export const EditProfile = (body: any) => {
  return axiosInstance().post("/user/edit-profile", body);
};


//TIER 2 API

//Fetch tier course

export const GetTier2Courses = (query: {
  page: string;
  limit: string;
  search?: string;
}) => {
  return axiosInstance().get(`user/courses?page=${query.page}&limit=${query.limit}&search=${query.search || ""}`);
};


export const GetSingleTireTwoCourse = (courseId: string) => {
  return axiosInstance().get(`/user/course/${courseId}`);
};

export const GetMyTier2Courses = (query: {
  page: string
  limit: string
  search?: string
}) => {
  return axiosInstance().get(`/user/tier2/my-tier2-courses?page=${query.page}&limit=${query.limit}&search=${query.search || ""}`)
}


export const GetTier2Coursese = (query: {
  page: string;
  limit: string;
  search?: string;
}) => {
  return axiosInstance().get(`/tier2/my-tier2-courses?page=${query.page}&limit=${query.limit}&search=${query.search || ""}`);
};

// 2. next lesson
export const GetNextLesson = (courseId: string) => {
  return axiosInstance().get(`/user/tier2/get-next-lesson/${courseId}`);
};

// 3. completed lessons
export const GetCompletedLessons = (courseId: string) => {
  return axiosInstance().get(`/user/tier2/completed-course/${courseId}`);
};

// 4. not completed lessons
export const GetNotCompletedLessons = (courseId: string) => {
  return axiosInstance().get(`/user/tier2/notcompleted-course/${courseId}`);
};

// 5. complete lesson
export const CompleteLesson = (body: {
  courseId: string;
  lessonId: string;
}) => {
  return axiosInstance().post(`/user/tier2/complete-lesson`, body);
};

export const MintCertificate = (body: { courseId: string }) => {
  return axiosInstance().post("user/tier2/certificate", body);
};

export const GetCertificate = (courseId: string) => {
  return axiosInstance().get(`user/tier2/certificate/${courseId}`);
};


//tier 2 plan api

export const GetTier2Plans = () => {
  return axiosInstance().get('/user/tier2/plans')
}

export const SubscribeTier2Plan = (body: {
  planId: string
  callbackUrl: string
}) => {
  return axiosInstance().post('/user/tier2/subcribe', body)
}

export const VerifyTier2Payment = (body: {
  billingId: string
  reference: string
}) => {
  return axiosInstance().post('/user/tier2/verify-payment', body)
}

export const GetOutstandingBills = () => {
  return axiosInstance().get('/user/tier2/outstanding-bill')
}

export const PayOutstandingBill = (body: {
  billId: string
  callbackUrl: string
}) => {
  return axiosInstance().post('/user/tier2/pay-bill', body)
}

