import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ISignInProps } from '../../models'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const SignInForm: React.FC<ISignInProps> = ({
  loginRequest,
  isActionLoading,
  errors: errorsResponse,
}) => {
  return (
    <Formik
      initialValues={{
        email: '123test1@gmail.com',
        password: '123',
      }}
      validationSchema={LoginSchema}
      onSubmit={({ email, password }) => {
        loginRequest({ email, password })
      }}
    >
      <Form>
        {errorsResponse && (
          <span>{JSON.stringify(errorsResponse).replace(/[^\w\s]/g, '')}</span>
        )}
        <div>
          <Field name='email' type='email' />
          <ErrorMessage name='email' component='div' />
        </div>
        <div>
          <Field name='password' type='password' />
          <ErrorMessage name='password' component='div' />
        </div>
        <button disabled={isActionLoading} type='submit'>
          Submit
        </button>
      </Form>
    </Formik>
  )
}

export default SignInForm
