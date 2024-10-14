import React from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebaseConfig';
import { setSubscription } from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SubscriptionModal = ({ setIsModalOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelection = async (option) => {
    dispatch(setSubscription(option));

    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { subscription: option });
        console.log('Subscription updated successfully');
        navigate('/login');
      } else {
        console.error('No authenticated user found');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }

    setIsModalOpen(false);
  };

  const handleSkip = () => {
    navigate('/login')
  };

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4">
      <div className="bg-gray-900 p-6 rounded-lg text-center max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">Subscribe to a plan to add more storyboards and generate more images</h2>
        <div className="flex justify-around mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-blue-500 w-5/12">
            <div className="h-16 w-16 bg-blue-500 mx-auto mb-4 rounded-lg"></div>
            <ul className="text-left">
              <li className="flex items-center text-white"><span className="text-green-500 mr-2">✓</span> Feature 1</li>
              <li className="flex items-center text-white"><span className="text-green-500 mr-2">✓</span> Feature 2</li>
              <li className="flex items-center text-red-500"><span className="mr-2">✗</span> Feature 3</li>
              <li className="flex items-center text-red-500"><span className="mr-2">✗</span> Feature 4</li>
              <li className="flex items-center text-red-500"><span className="mr-2">✗</span> Feature 5</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500 w-5/12">
            <div className="h-16 w-16 bg-yellow-500 mx-auto mb-4 rounded-lg"></div>
            <ul className="text-left">
              <li className="flex items-center text-white"><span className="text-green-500 mr-2">✓</span> Feature 1</li>
              <li className="flex items-center text-white"><span className="text-green-500 mr-2">✓</span> Feature 2</li>
              <li className="flex items-center text-white"><span className="text-green-500 mr-2">✓</span> Feature 3</li>
              <li className="flex items-center text-white"><span className="text-green-500 mr-2">✓</span> Feature 4</li>
              <li className="flex items-center text-white"><span className="text-green-500 mr-2">✓</span> Feature 5</li>
            </ul>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4 w-full"
          onClick={() => handleSelection('Subscription')}
        >
          Choose Plan
        </button>
        <button
          className="text-blue-400 hover:underline"
          onClick={handleSkip}
        >
          Skip and continue with free
        </button>
      </div>
    </div>
  );
};

export default SubscriptionModal;