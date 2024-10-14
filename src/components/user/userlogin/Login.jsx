import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import InputField from '../formInputs/InputField';
import loginValidationSchema from '../../../validation/schemas/loginSchema';
import { auth, facebookProvider, googleProvider } from '../../../firebase/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa6';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValues = {
    email: '',
    password: '',
  };


  const handleSubmit = async(values) => {
    console.log('Login Data:', values);
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          const user = userCredential.user;
          if (user) {
            if (user.emailVerified) {
              navigate("/dashboard");
            } else {
              setError("Please verify your email.");
              auth.signOut();
            }
          }
    } catch (error) {
        setError(error.message)
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google User:', user);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log('Facebook User:', user);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {/* Login Page Component */}
      <section className="text-gray-600 body-font">
        <div
          className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center"
          style={{
            background:
              'url("https://www.storyboards.com/sbofe/example/peroni/peroni-canal-side-5.jpg")',
          }}
        >
          {/* Login Form Section */}
          <div className="lg:w-2/6 xl:w-2/5 md:w-2/3 bg-gray-100 rounded-lg p-8 flex flex-col lg:ml-auto w-full mt-10 lg:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Log In
            </h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <InputField label="Email" name="email" type="email" placeholder="Enter your email" />

                  <InputField label="Password" name="password" type="password" placeholder="Enter your password" />

                  <button
                    type="submit"
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Log In
                  </button>
                </Form>
              )}
            </Formik>

            {/* Link to Sign Up Page */}
            <p
              className="flex justify-center mt-4 text-indigo-500 cursor-pointer hover:underline"
              onClick={() => navigate('/signup')}
            >
              {`Don't have an account? Sign Up!`}
            </p>
            <div className="flex justify-center mt-4">
              <button onClick={handleGoogleSignIn} className="bg-blue-500 px-4 py-2 text-white text-sm font-bold border border-gray-300 rounded-md hover:bg-blue-600 flex items-center">
                  Continue with Google <FcGoogle className="ml-2" />
             </button>
          </div>
            <div className="flex justify-center mt-4">
              <button onClick={handleFacebookSignIn} className="bg-blue-500 px-4 py-2 text-white text-sm font-bold border border-gray-300 rounded-md hover:bg-blue-600 flex items-center">
                  Continue with Facebook <FaFacebook className="ml-2" />
             </button>
          </div>
          </div>

          {/* Text Section */}
          <div className="lg:w-3/5 lg:pr-0 pr-0">
            <h1 className="title-font font-medium font-bold text-5xl text-grey-800">
              Welcome Back!
            </h1>
            <p className="leading-relaxed mt-4 text-grey-800">
              Please log in to access your account and explore our platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
