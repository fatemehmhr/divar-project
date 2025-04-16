import { sendOtp } from "services/auth";

import styles from "./SendOtpForm.module.css";

function SendOtpForm({ setStep, mobile, setMobile }) {

    const submitHandler = async (event) => {
        event.preventDefault();
        //console.log(mobile) // الان شماره ی موبایل را دریافت می کند

        if (mobile.length !== 11) return;

        //validation 

        const { response, error } = await sendOtp(mobile);

        // بررسی خطای انقضای کد از سمت سرور

        if (response) setStep(2);

        if (error) console.log(error.response.data.message) //متنی که از سمت سرور می آید

        // console.log({ response, error })

    }

    return (
        <form onSubmit={submitHandler} className={styles.form} >
            <p>ورود به حساب کاربری</p>
            <span>برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید.کد تایید به این شماره پیامک خواهد شد.</span>
            <label htmlFor="input">
                شماره موبایل خود را وارد کنید.
            </label>
            <input
                type="text"
                id="input"
                placeholder="شماره موبایل"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <button type="submit" >ارسال کد تایید</button>
        </form>
    )
}

export default SendOtpForm