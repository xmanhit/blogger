import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { currentUserRequest, updateRequest } from '../../store/slices/auth.slice';

const UserSetting = ({
  user,
  currentUserRequest,
  updateRequest,
  isAuthenticated,
  isActionLoading,
  isLoading,
}): JSX.Element => {
  const [updatedUser, setUpdatedUser] = useState({
    image: user?.image || '',
    username: user?.username || '',
    bio: user?.bio || '',
    email: user?.email || '',
    password: '',
  });

  useEffect(() => {
    currentUserRequest();
  }, []);

  useEffect(() => {
    setUpdatedUser(prevUser => ({
      ...prevUser,
      image: user?.image || '',
      username: user?.username || '',
      bio: user?.bio || '',
      email: user?.email || '',
      password: '',
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
      email: "123test@gmail.com1",
      password: "123",
      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiMTIzNDF0ZXN0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiMTIzNDF0ZXN0In0sImlhdCI6MTY5NDk0MTU5NywiZXhwIjoxNzAwMTI1NTk3fQ.coHs4Hm9enmYSGVe1dsuO_QgsVg9sju0bCP8z79Plb4',
      // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiMTIzdGVzdEBnbWFpbC5jb20xIiwidXNlcm5hbWUiOiIxMjN0ZXN0MTEifSwiaWF0IjoxNjk1MDEwODQ3LCJleHAiOjE3MDAxOTQ4NDd9.F_dXC0FkuGfAwzjKeE7deuJ7pAjBaDNWnZdDOoCs6LQ",
      username: "123test11",
      bio: 'New biography',
      image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
    }
  };

  const handleUpdateClick = () => {
    updateRequest(updatedUserData.user);
  };
  console.log(updatedUserData, isAuthenticated)

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
        <input type="text" name="password" value={updatedUser.token} onChange={handleInputChange} />

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
