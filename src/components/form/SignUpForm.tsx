import { connect } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { ISignUpProps } from '../../models'
import { RootState } from '../../store'
import { registerRequest } from '../../store/slices/auth.slice'
import { PiSpinnerBold } from 'react-icons/pi'
import styles from '../../styles/Global.module.css'

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Your username is too short!')
    .max(50, 'Your username is too long!')
    .required('Your username is required'),
  email: Yup.string().email('Invalid email').required('Your email is required'),
  password: Yup.string()
    .min(3, 'Your password is too short!')
    .max(50, 'Your password is too long!')
    .required('Your password is required'),
})

const SignUpForm: React.FC<ISignUpProps> = ({ status, registerRequest, errors }) => {
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
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='username'>
            Username
          </label>
          <Field className={styles.formControl} id='username' name='username' type='text' />
          <ErrorMessage name='username'>{(msg) => <div className={styles.error}>{msg}</div>}</ErrorMessage>
          {status === 'failed' && errors?.username && (
            <div className={styles.error}>{`Username ${errors.username}`}</div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <Field className={styles.formControl} id='email' name='email' type='email' />
          {status === 'failed' && errors?.email && <div className={styles.error}>{`Email ${errors.email}`}</div>}
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
          Sign Up {status === 'loading' && <PiSpinnerBold className={styles.spinner} />}
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
