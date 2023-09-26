import { IoClose } from 'react-icons/io5'
import styles from '../../styles/TagInput.module.css'

const TagInput: React.FC<any> = ({
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  form.validateOnMount = true
  const tagData = field.value
  const { setFieldValue, errors } = form

  const removeTagData = (indexToRemove: number) => {
    setFieldValue(field.name, [...tagData.filter((_: string, index: number) => index !== indexToRemove)])
  }
  const addTagData = (event: any) => {
    const value = event.target.value.trim()
    if (value !== '') {
      if (errors[field.name]) {
        setFieldValue(field.name, [...tagData])
      } else {
        setFieldValue(field.name, [...tagData, value])
      }
      event.target.value = ''
    }
  }

  const handleKeyUpTag = (event: any) => {
    if (event.key === ' ') {
      addTagData(event)
    }
  }

  return (
    <>
      <div className={styles.tagInput}>
        {tagData?.length > 0 && (
          <ul className={styles.tags}>
            {tagData.map((tag: string, index: number) => (
              <li key={index} className={styles.tag}>
                <span className={styles.tagTitle}>{tag}</span>
                <span className={styles.tagCloseIcon} onClick={() => removeTagData(index)}>
                  <IoClose />
                </span>
              </li>
            ))}
          </ul>
        )}
        <input name={field.name} type='text' {...props} onKeyUp={handleKeyUpTag} />
      </div>
      {errors[field.name] && <div className='error'>{errors[field.name]}</div>}
    </>
  )
}

export default TagInput
