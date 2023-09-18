import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ISignInProps } from '../../models'
import { RootState } from '../../store'
import { loginRequest } from '../../store/slices/auth.slice'

const SigInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const SignInForm: React.FC<ISignInProps> = ({
  loginRequest,
  status,
  errors,
}) => {
  return (
    <Formik
      initialValues={{
        email: '123test1@gmail.com',
        password: '123',
      }}
      validationSchema={SigInSchema}
      onSubmit={({ email, password }) => {
        loginRequest({ email, password })
      }}
    >
      <Form>
        {status === 'failed' && errors && (
          <span>{`${Object.keys(errors)[0]} ${
            errors[Object.keys(errors)[0] as keyof typeof errors]
          }`}</span>
        )}
        <div>
          <Field name='email' type='email' />
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
    status: state.auth.status.login,
    errors: state.auth.errors.login,
  }),
  { loginRequest }
)(SignInForm)
