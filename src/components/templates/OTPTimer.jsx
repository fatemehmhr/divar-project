import { sendOtp } from 'services/auth';
import toast from 'react-hot-toast';
import useOTPTimer from 'src/hooks/useOtpTimer';

const OTPTimer = ({ mobile }) => {
    const {
      formattedTime,
      isExpired,
      isLoading,
      startTimer,
      setIsLoading
    } = useOTPTimer(120); // 20 ثانیه زمان انقضا
  
    const handleResendOTP = async () => {
      if (isLoading) return;
      
      setIsLoading(true);
      try {
        const { error } = await sendOtp(mobile);
        
        if (error) {
          toast.error(error.response?.data?.message || 'خطا در ارسال مجدد کد');
          return;
        }
  
        startTimer();
        toast.success('کد جدید ارسال شد');
      } catch (err) {
        toast.error('خطا در ارتباط با سرور');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
        {!isExpired ? (
          <p>زمان باقیمانده: {formattedTime}</p>
        ) : (
          <div>
            <button
              onClick={handleResendOTP}
              disabled={isLoading}
            >
              {isLoading ? 'در حال ارسال...' : 'ارسال مجدد کد'}
            </button>
            <p style={{ marginTop: "0.5rem" }}>کد منقضی شده است!</p>
          </div>
        )}
      </div>
    );
  };

export default OTPTimer;

/////////////////////// راه 1////////////////////////////////////////////////

// import { useState, useEffect, useCallback } from 'react';
// import toast from "react-hot-toast";
// import { sendOtp } from 'services/auth';

// const OTPTimer = ({ mobile, onExpire, onNewOtpSent }) => {

//   const [timeLeft, setTimeLeft] = useState(20);
//   const [isLoading, setIsLoading] = useState(false);

//   const formatTime = useCallback((seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   }, []);

//   const handleResendOTP = useCallback(async () => {
//     if (timeLeft > 0 || isLoading) return;
    
//     setIsLoading(true);
//     try {
//       const { error } = await sendOtp(mobile);
      
//       if (error) {
//         toast.error('خطا در ارسال مجدد کد');
//         return;
//       }

//       setTimeLeft(20);
//       onNewOtpSent?.();
//       toast.success('کد جدید ارسال شد');
//     } catch (err) {
//       toast.error('خطا در ارتباط با سرور');
//       console.error('Error resending OTP:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [mobile, timeLeft, isLoading, onNewOtpSent]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       onExpire?.();
//       return;
//     }

//     const timerId = setInterval(() => {
//       setTimeLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timerId);
//   }, [timeLeft, onExpire]);

//   return (
//     <div>
//       {timeLeft > 0 ? (
//         <p>
//           زمان باقیمانده: <time>{formatTime(timeLeft)}</time>
//         </p>
//       ) : (
//         <div >
//           <button
//             onClick={handleResendOTP}
//             disabled={isLoading}
//             aria-label="ارسال مجدد کد تأیید"
//           >
//             {isLoading ? 'در حال ارسال...' : 'ارسال مجدد کد'}
//           </button>
//           <p style={{marginTop:"0.5rem"}} role="alert">کد منقضی شده است!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OTPTimer;


//////////////////////راه دوم///////////////////////////////

// import { useState, useEffect } from 'react';
// import toast from "react-hot-toast";
// import { sendOtp } from 'services/auth';

// const OTPTimer = ({ mobile, onExpire, onNewOtpSent }) => {

//     const [timeLeft, setTimeLeft] = useState(20); // 10 ثانیه
//     const [canResend, setCanResend] = useState(false);
//     const [isExpired, setIsExpired] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;  
//     };





//     useEffect(() => {
//         if (timeLeft <= 0 && !isExpired) {
//             setIsExpired(true);
//             setCanResend(true);
//             onExpire?.();
//         }
//         const timer = setInterval(() => {
//             setTimeLeft(prevTime => prevTime - 1);
//         }, 1000);
    
//         return () => clearInterval(timer);
//     }, [timeLeft, isExpired, onExpire]);





//     const handleResendOTP = async () => {
//         if (!canResend || isLoading) return;
//         setIsLoading(true);
//         try {
//             const { response, error } = await sendOtp(mobile);
//             if (error) {
//                 toast.error('خطا در ارسال مجدد کد');
//                 return;
//             }

//             setTimeLeft(20);
//             setIsExpired(false);
//             setCanResend(false);
//             toast.success('کد جدید ارسال شد');
//             onNewOtpSent(); // اطلاع به والد
//         } catch (err) {
//             toast.error('خطا در ارتباط با سرور');
//         } finally {
//             setIsLoading(false);
//         }
//     };





//     return (
//         <div className="otp-timer">
//             {!isExpired ? (
//                 <p>زمان باقیمانده: {formatTime(timeLeft)}</p>
//             ) : (
//                 <>
//                     <button
//                         onClick={handleResendOTP}
//                         className="resend-btn"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? 'در حال ارسال...' : 'ارسال مجدد کد'}
//                     </button>
//                     <p style={{ color: "red", marginTop: "10px" }}>کد منقضی شده است!</p>

//                 </>
//             )}
//             </div>
//     );
// };

// export default OTPTimer;


