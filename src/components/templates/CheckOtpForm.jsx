import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { getProfile } from "services/user";
import { setCookie } from "utils/cookie";
import OTPTimer from "./OTPTimer";
import toast from "react-hot-toast";
import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ mobile, setStep }) {
  
  const [code, setCode] = useState(''); //کدی که کاربر وارد می کند
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const navigate = useNavigate();
  const { refetch } = useQuery(["profile"], getProfile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otpExpired) {
      toast.error('کد منقضی شده است. لطفاً کد جدیدی دریافت کنید.');
      return;
    }

    /////////////////کدی که کاربر وارد می کند////////////
    if (code.length !== 5) {
      toast.error('کد تأیید باید ۵ رقمی باشد');
      return;
    }


    setIsSubmitting(true);

    try {
      const { response, error } = await checkOtp(mobile, code);
      // console.log('response:', response);

      if (response) {
        setCookie(response.data);
        toast.success('ورود با موفقیت انجام شد');
        await refetch();
        navigate("/");
      } 
      else{
        toast.error('کد را به درستی وارد کنید')
      }
      // else if (error) {

      //   // بررسی خطای انقضای کد از سمت سرور
      //   if (error.response?.data?.message?.includes('expired')) {
      //     setOtpExpired(true);
      //     toast.error('کد منقضی شده است');
      //   } else {
      //     toast.error(error.response?.data?.message || 'کد وارد شده نامعتبر است');
      //   }
      // }
    } catch (err) {
      console.error('خطا در تأیید کد:', err);
      toast.error('خطا در ارتباط با سرور');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewOtpSent = () => {
    setOtpExpired(false);
    setCode('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>تایید کد اس‌ام‌اس شده</p>
      <span className={styles.subtitle}>کد پیامک شده به شماره {mobile} را وارد کنید.</span>

      <label htmlFor="otp-input" className={styles.label}>
        کد تایید را وارد کنید
      </label>
      <input
        id="otp-input"
        type="text"
        inputMode="numeric"
        pattern="\d{5}"
        placeholder="کد ۵ رقمی"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
        className={styles.input}
        disabled={otpExpired}
        aria-invalid={otpExpired}
      />

      <div className={styles.timerWrapper}>
        <OTPTimer
          mobile={mobile}
          onExpire={() => setOtpExpired(true)}
          onNewOtpSent={handleNewOtpSent}
        />
      </div>

      <div>
        <button
          className={styles.login}
          type="submit"
          disabled={isSubmitting || otpExpired || code.length !== 5}
        >
          {isSubmitting ? 'در حال بررسی...' : 'ورود'}
        </button>
        <button
          type="button"
          onClick={() => setStep(1)}
          className={styles.backButton}
        >
          تغییر شماره موبایل
        </button>
      </div>
    </form>
  );
}

export default CheckOtpForm;

//////////////////////راه دوم///////////////////////////////

// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

// import { checkOtp } from "services/auth";
// import { getProfile } from "services/user";
// import { setCookie } from "utils/cookie";

// import styles from "./CheckOtpForm.module.css";
// import OTPTimer from "./OTPTimer";
// import toast from "react-hot-toast";

// function CheckOtpForm({ code, setCode, mobile, setStep }) {

//   const [isOtpExpired, setIsOtpExpired] = useState(false);
//   const [otpSent, setOtpSent] = useState(false); // حالت جدید برای ردیابی ارسال OTP
//   //////////////////////////////////////////////////////////////////

//   const navigate = useNavigate();

//   const { refetch } = useQuery(["profile"], getProfile);

//   const handleNewOtpSent = () => {
//     setIsOtpExpired(false);
//     setCode('');
//     setOtpSent(true);
//   };



//   const submitHandler = async (event) => {
//     event.preventDefault();

//     if (isOtpExpired) {
//       toast.error('کد منقضی شده است لطفا کد جدیدی دریافت کنید.');
//       return;
//     }

//     if (code.length !== 5) {
//       toast.error('کد تأیید باید ۵ رقمی باشد');
//       return;
//     }

//     const { response, error } = await checkOtp(mobile, code);
//     if (response) {
//       setCookie(response.data);
//       navigate("/");
//       refetch();
//     } else if (error) {
//       console.log(error.response.data.message);
//     }
//   };



//   useEffect(() => {
//     if (otpSent) {
//       setOtpSent(false);
//     }
//   }, [otpSent]);


//   return (
//     <form onSubmit={submitHandler} className={styles.form} >
//       <p>تایید کد اس ام اس شده</p>
//       <span>کد پیامک شده به شماره ی {mobile} را وارد کنید.</span>

//       <label htmlFor="input">کد تایید را وارد کنید</label>
//       <input
//         type="text"
//         id="input"
//         placeholder="کد تایید"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//       />

//       <section>
//         <button type="submit">ورود</button>
//         <button onClick={() => setStep(1)} className={styles.backButton} >تغییر شماره ی  موبایل</button>
//       </section>

//       <div className={styles.resend}>
//         <OTPTimer
//           mobile={mobile}
//           onExpire={() => setIsOtpExpired(true)}
//           onNewOtpSent={handleNewOtpSent}
//         />
//       </div>

//     </form>
//   )
// }

// export default CheckOtpForm