import * as Yup from 'yup';

const signupValidationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  export default signupValidationSchema