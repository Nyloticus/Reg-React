import styles from "../Auth.module.css";
import img1 from '../../../assets/images/backgrounds/login-bg.svg';
import React from "react";


export const AuthCard = ({children}: { children: React.JSX.Element | React.JSX.Element[] }) => {
    return (
        <div className={styles.container}>
            <div className={styles.authImg}>
                <div className={styles.backgroundImg}>
                    <img
                        src={img1}
                        alt="bg"
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                        }}
                    />
                </div>

            </div>
            <div className={styles.auth_form_container}>
                <h1>
                    Welcome
                </h1>
                <div className={styles.auth_form}>
                    {children}
                </div>
            </div>

        </div>
    )
}