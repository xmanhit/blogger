const SignUpForm: React.FC = () => {
  return (
    <form method='post'>
      <input type='text' name='username' defaultValue={'123'} />
      <input type='email' name='email' defaultValue={'123@gmail.com'} />
      <input type='text' name='password' defaultValue={'123456'} />
      <button type='submit'>Register</button>
    </form>
  );
};

export default SignUpForm;
