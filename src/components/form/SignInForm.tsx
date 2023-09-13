import { Form } from 'react-router-dom';

const SignInForn = () => {
  return (
    <Form method='post'>
      <input type='email' name='email' defaultValue={'123@gmail.com'} />
      <input type='text' name='password' defaultValue={'123456'} />
      <button type='submit'>Login</button>
    </Form>
  );
};

export default SignInForn;
