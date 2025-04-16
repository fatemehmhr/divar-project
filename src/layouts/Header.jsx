import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import DropdownMenu from "components/templates/DropdownMenu";


function Header() {




    return (
        <header className={styles.header} >
            <div >
                <Link to="/" className={styles.divar}>
                    <img src="divar.svg" />
                </Link>
                <span>
                    <img src="location.svg" />
                    <p>تهران</p>
                </span>
            </div>
            <div>
                <DropdownMenu />
                {/* <Link to="/auth" className={styles.profile} >
                    <img src="profile.svg" />
                    <p>دیوار من</p>
                </Link> */}
                <Link to="/dashboard" className={styles.button} >
                    ثبت آگهی
                </Link>


            </div>
        </header>
    )
}

export default Header 