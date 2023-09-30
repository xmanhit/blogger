import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ISignInProps } from '../../models'
import { RootState } from '../../store'
import { loginRequest } from '../../store/slices/auth.slice'
import styles from '../../styles/Global.module.css'
import { PiSpinnerBold } from 'react-icons/pi'

const SigInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Your email is required.'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Your password is required.'),
})

const SignInForm: React.FC<ISignInProps> = ({ loginRequest, status }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SigInSchema}
      onSubmit={({ email, password }) => {
        loginRequest({ email, password })
      }}
    >
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <Field className={styles.formControl} id='email' name='email' type='email' />
          <ErrorMessage name='email'>{(msg) => <div className={styles.error}>{msg}</div>}</ErrorMessage>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='password'>
            Password
          </label>
          <Field className={styles.formControl} id='password' name='password' type='password' />
          <ErrorMessage name='password'>{(msg) => <div className={styles.error}>{msg}</div>}</ErrorMessage>
        </div>
        <button className={styles.submit} disabled={status === 'loading'} type='submit'>
          Log In {status === 'loading' && <PiSpinnerBold className={styles.spinner} />}
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
