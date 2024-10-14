import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth, googleProvider, facebookProvider } from '../../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import InputField from '../formInputs/InputField';
import signupValidationSchema from '../../../validation/schemas/signupSchema';
import { setUserDetails } from '../../../redux/userSlice';
import SubscriptionModal from '../modal/SubscriptionModal';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please choose another.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/weak-password':
        return 'The password is too weak. Please use at least 6 characters.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  const onSubmit = async (values) => {
    console.log('Form Data:', values);
    setErrorMessage('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      if (user) {
        // Use setDoc to create/update the user document with the user's UID
        await setDoc(doc(db, 'users', user.uid), {
          name: values.name,
          email: values.email,
          subscription: "", // Initialize subscription as empty or default
        });
        await sendEmailVerification(user);
        alert('Registration successful! Please verify your email');

        // Store user details in Redux
        dispatch(setUserDetails(values));

        // Open the subscription modal
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage(getErrorMessage(error.code));
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      console.log("jjjjjjjjjjjjjjjj");
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result,"kkkkkkkkkkkkkkkkkkk");

      const user = result.user;
      console.log(user,'hiiiiiiiiiiiiiii')

      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        subscription: "", 
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google Sign-Up:", error);
  setErrorMessage(error.message);
    }
  };


  const handleFacebookSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        subscription: "",
      });
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };


  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center"
       style={{
        background:
          'url("https://www.storyboards.com/sbofe/example/peroni/peroni-canal-side-5.jpg")',
      }}
      >
        <div className="lg:w-3/5 lg:pr-0 pr-0">
          <h1 className="title-font    font-bold text-5xl text-gray-850">
          Sign up for Storyboords
          </h1>
          
        </div>
        <div className="lg:w-2/6 xl:w-2/5 md:w-2/3 bg-gray-100 rounded-lg p-8 flex flex-col lg:ml-auto w-full mt-10 lg:mt-0">

          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

          <Formik initialValues={initialValues} validationSchema={signupValidationSchema} onSubmit={onSubmit}>
            <Form>
              <InputField label="Full Name" name="name" type="text" placeholder="Enter your name" />
              <InputField label="Email" name="email" type="email" placeholder="Enter your email" />
              <InputField label="Password" name="password" type="password" placeholder="Enter your password" />
              <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Submit
              </button>
            </Form>
          </Formik>

          <p className="flex justify-center opacity-30 cursor-pointer mt-4" onClick={() => navigate('/login')}>
            Already have an account? Login!
          </p>
          <div className="flex justify-center mt-4">
              <button onClick={handleGoogleSignUp} className="bg-blue-500 px-4 py-2 text-white text-sm font-bold border border-gray-300 rounded-md hover:bg-blue-600 flex items-center">
                  Signup with Google <FcGoogle className="ml-2" />
             </button>
          </div>
          <div className="flex justify-center mt-4">
              <button onClick={handleFacebookSignUp} className="bg-blue-500 px-4 py-2 text-white text-sm font-bold border border-gray-300 rounded-md hover:bg-blue-600 flex items-center">
                  Signup with Facebook <FaFacebook className="ml-2" />
             </button>
          </div>
        </div>

        {isModalOpen && <SubscriptionModal setIsModalOpen={setIsModalOpen} />}
      </div>
    </section>
  );
}

export default SignUp;
