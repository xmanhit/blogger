import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { PiSpinnerBold } from 'react-icons/pi'

import { RootState } from '../../store'
import { IUserSettingProps } from '../../models'
import { resetStatusUpdateUser, updateUserRequest } from '../../store/slices/auth.slice'
import { textAreaAdjust } from '../../utils'
import styles from '../../styles/User.module.css'

const userSettingSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .max(30, 'Password must be at most 30 characters'),
  image: Yup.string(),
  bio: Yup.string().max(500, 'Bio must be at most 500 characters'),
})

const userSettingForm: React.FC<IUserSettingProps> = ({
  status,
  user,
  resetStatusUpdateUser,
  updateUserRequest,
  errors,
}) => {
  const navigate = useNavigate()
  const isUpdateUserSuccess = status.update === 'successed'

  useEffect(() => {
    if (isUpdateUserSuccess) {
      resetStatusUpdateUser()
      navigate(`/me`, { replace: true })
    }
  }, [isUpdateUserSuccess])

  return (
    <Formik
      initialValues={{
        username: user?.username || '',
        password: '',
        email: user?.email || '',
        image: user?.image || '',
        bio: user?.bio || '',
      }}
      validationSchema={userSettingSchema}
      onSubmit={(user) => {
        updateUserRequest({ user })
      }}
    >
      <>
        {errors?.update?.status && (
          <div className={styles.errorResponse}>
            <strong className={styles.title}>Unable to update.</strong>
            <p>{errors?.update?.data}.</p>
          </div>
        )}
        <Form className={styles.userSettingForm}>
          <div className={styles.userSetting}>
            <h2>User</h2>
            <div className={styles.userSettingField}>
              <label className={styles.labelSetting}>Name</label>
              <Field className={styles.inputSetting} placeholder='John Doe' type='text' name='username' id='username' />
              <ErrorMessage className={styles.error} component='div' name='username' />
            </div>
            <div className={styles.userSettingField}>
              <label className={styles.labelSetting}>Email</label>
              <Field
                className={styles.inputSetting}
                placeholder='john.doe@example.com'
                type='text'
                name='email'
                id='email'
              />
              <ErrorMessage className={styles.error} component='div' name='email' />
            </div>
            <div className={styles.userSettingField}>
              <label className={styles.labelSetting}>Password</label>
              <Field
                className={styles.inputSetting}
                placeholder='Password'
                type='password'
                name='password'
                id='password'
              />
              <ErrorMessage className={styles.error} component='div' name='password' />
            </div>
            <div className={styles.userSettingField}>
              <label className={styles.labelSetting}>Bio</label>
              <Field
                as='textarea'
                name='bio'
                id='bio'
                className={styles.inputSetting}
                placeholder='Bio'
                cols={30}
                rows={8}
                onKeyUp={textAreaAdjust}
              />
              <ErrorMessage className={styles.error} component='div' name='bio' />
            </div>
            <div className={styles.userSettingField}>
              <Field
                className={`${styles.inputSetting} ${styles.fieldImage}`}
                component={fieldImage}
                name='image'
                id='image'
              />
            </div>
            <div className={styles.userSettingField}>
              <button disabled={status.update === 'loading'} type='submit' className={styles.buttonSetting}>
                Save Profile Infomation {status.update === 'loading' && <PiSpinnerBold className={styles.spinner} />}
              </button>
            </div>
          </div>
        </Form>
      </>
    </Formik>
  )
}

const fieldImage: React.FC<any> = ({ field, form, ...props }) => {
  const { value, name } = field
  const { errors, setFieldValue } = form

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFieldValue(name, reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <label className={styles.labelSetting}>Profile image</label>
      <div className={styles.userAvatarRowSetting}>
        <span className={styles.userAvatarSetting}>
          <img alt='Image' src={value} className={styles.imgSetting} loading='lazy' />
        </span>
        <input {...props} accept='image/*' type='file' name='image' onChange={handleImageChange} />
        {errors[name] && <div className='error'>{errors[name]}</div>}
      </div>
    </>
  )
}

export default connect(
  (state: RootState) => ({
    status: state.auth.status,
    user: state.auth.currentUser,
    errors: state.auth.errors,
  }),
  { resetStatusUpdateUser, updateUserRequest }
)(userSettingForm)
