import styles from '../../styles/User.module.css'

const UserLoading = () => {
    return (
        <>
        
            <div className={styles.userLayout}>
           
        
                <div className={styles.userContainer}>
                    <div className={styles.userTop}>
                        <span className={styles.userAvatar}>
                        <div className={styles.img}></div>
                        </span>
                        <div className={styles.userAction}>
                        </div>
                    </div>
                    <div className={styles.userDetail} data-status-checked="true">
                        <div className={styles.userUserName}>
                        <h1 className={styles.name}></h1>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default UserLoading