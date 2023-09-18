import { connect } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { ISignUpProps } from '../../models'
import { RootState } from '../../store'
import { registerRequest } from '../../store/slices/auth.slice'

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const SignUpForm: React.FC<ISignUpProps> = ({
  status,
  registerRequest,
  errors,
}) => {
  return (
    <Formik
      initialValues={{
        username: '123test',
        email: '123test1@gmail.com',
        password: '1234',
      }}
      validationSchema={SignUpSchema}
      onSubmit={({ username, email, password }) => {
        registerRequest({ username, email, password })
      }}
    >
      <Form>
        <div>
          <Field name='username' type='text' />
          {status === 'failed' && errors?.username && (
            <div>{`Username ${errors.username}`}</div>
          )}
          <ErrorMessage name='username' component='div' />
        </div>
        <div>
          <Field name='email' type='email' />
          {status === 'failed' && errors?.email && (
            <div>{`Email ${errors.email}`}</div>
          )}
          <ErrorMessage name='email' component='div' />
        </div>
        <div>
          <Field name='password' type='password' />
          <ErrorMessage name='password' component='div' />
        </div>
        <button disabled={status === 'loading'} type='submit'>
          Submit
        </button>
      </Form>
    </Formik>
  )
}

export default connect(
  (state: RootState) => ({
    status: state.auth.status.register,
    errors: state.auth.errors.register,
  }),
  { registerRequest }
)(SignUpForm)
