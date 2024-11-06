import { useRouter } from "next/router";
import Layout from "../../layouts/Main";
import Link from "next/link";
import { useEffect, useState } from "react";
import { resetPassword } from "APIS/user";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [errors, setErrors] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);


  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const res = await resetPassword(token, newPassword);
    if (res?.success) {
      setSuccess(res.success);
    } else if (res?.password) {
      setErrors({ password: res.password });
    } else if (res?.failure) {
      setErrors({ failure: res.failure });
    }
  };


useEffect(()=>{
  if(success)
  {
    setTimeout(()=>(router.replace('/login')),2000);
  }
},[success])

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a>
                <i className="icon-left"></i> Back to shop
              </a>
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Reset your password?</h2>
            <p className="form-block__description">Choose a strong password</p>

            <form className="form" onSubmit={handlePasswordChange}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {/* {errors.password &&  (
                  <p className="message message--error">
                    This field is required
                  </p>
                )} */}
              </div>
              <div className="form__input-row">
                <input
                  className="form__input"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                />
                {errors.password && (
                  <p className="message message--error">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Reset password
              </button>
            </form>
            {success && <p className="message error--success">Password Changed Successfully,Redirecting to Login Page</p>}
            {errors.failure && (
              <p className="message message--error">{errors.failure}</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResetPassword;
