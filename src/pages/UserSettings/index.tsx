import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { currentUserRequest, updateRequest } from '../../store/slices/auth.slice';
import axios from 'axios';
const UserSetting = ({
  user,
  currentUserRequest,
  updateRequest,
  isAuthenticated,
  isActionLoading,
  isLoading,
}): JSX.Element => {
  const [updatedUser, setUpdatedUser] = useState({
    email: user?.email || '',
    password: '',
    username: user?.username || '',
    bio: user?.bio || '',
    image: user?.image || '',
  });

  useEffect(() => {
    currentUserRequest();
  }, []);

  useEffect(() => {
    setUpdatedUser(prevUser => ({
      ...prevUser,
      email: user?.email || '',
      password: '',
      username: user?.username || '',
      bio: user?.bio || '',
      image: user?.image || '',
      
    }));
  }, [user])
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updatedUserData = {
    user: {
      email: "123test1@gmail.com",
      password: "123",
      // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiMTIzdGVzdEBnbWFpbC5jb20xIiwidXNlcm5hbWUiOiIxMjN0ZXN0MTEifSwiaWF0IjoxNjk1MDEwODQ3LCJleHAiOjE3MDAxOTQ4NDd9.F_dXC0FkuGfAwzjKeE7deuJ7pAjBaDNWnZdDOoCs6LQ",
      username: "123test1",
      bio: 'New biography12',
      image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
    }
  };

  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiMTIzdGVzdDFAZ21haWwuY29tIiwidXNlcm5hbWUiOiIxMjN0ZXN0MSJ9LCJpYXQiOjE2OTUwMTcyOTYsImV4cCI6MTcwMDIwMTI5Nn0.n5gyHYPpb0HENo4y_I_Swd6Tn1sLZ217GChSNcruaus'
  ;

  // State to track the result of the update
  const [updateResult, setUpdateResult] = useState(null);

  // Function to handle the update when the button is clicked
  // const handleUpdateClick = () => {
  //   axios
  //     .put('https://api.realworld.io/api/user', updatedUserData, {
  //       headers: {       
  //         Authorization: `Bearer ${authToken}`, // Include your authentication token if required
  //       },
  //     })
  //     .then((response) => {
  //       // Handle the successful response here
  //       console.log('User updated successfully', response);
  //       setUpdateResult('User updated successfully');
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occur during the request
  //       console.error('Error updating user', error);
  //       setUpdateResult('Error updating user');
  //     });
  // };

  const handleUpdateClick = () => {
    updateRequest(updatedUser);
  };
  console.log(updatedUser, isAuthenticated)

  console.log('User:', user);

  return (
    <>
      <div>UserSetting</div>
      <h1>ABC</h1>

      <>
        <input type="text" name="image" value={updatedUser.image} onChange={handleInputChange} />
        <input type="text" name="username" value={updatedUser.username} onChange={handleInputChange} />
        <textarea name="bio" cols="30" rows="10" value={updatedUser.bio} onChange={handleInputChange}></textarea>
        <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />
        <input type="text" name="password" value={updatedUser.password} onChange={handleInputChange} />

        <button onClick={handleUpdateClick}>Submit to update</button>
      </>
    </>
  );
};

export default connect(
  (state: RootState) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    isActionLoading: state.auth.isActionLoading,
    isLoading: state.auth.isLoading,
  }),
  { currentUserRequest, updateRequest }
)(UserSetting);
