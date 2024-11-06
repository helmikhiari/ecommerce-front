import { register } from "APIS/user";
import Layout from "../layouts/Main";
import Link from "next/link";
import { useEffect, useState } from "react";
import { setData } from "reducers/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const RegisterPage = () => {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleRegister = async (e) => {
    setErrors({});
    setSuccess(false);
    e.preventDefault();
    const res = await register(data);
    if (res?.success) {
      setSuccess(true);
      setData(initialData);
    } else if (res?.email) {
      setErrors({ email: res.email });
    } else {
      setErrors({ failure: res.message });
    }
  };
  const router=useRouter();
  if (isAuthenticated) router.replace("/");
  if (isAuthenticated === null) return <h>Loading...</h>;

  if (isAuthenticated === false)
    return (
      <Layout>
        <section className="form-page">
          <div className="container">
            <div className="back-button-section">
              <Link href="/products">
                <a>
                  <i className="icon-left"></i> Back to store
                </a>
              </Link>
            </div>

            <div className="form-block">
              <h2 className="form-block__title">
                Create an account and discover the benefits
              </h2>
              <p className="form-block__description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>

              <form className="form" onSubmit={handleRegister}>
                <div className="form__input-row">
                  <input
                    className="form__input"
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={onChange}
                  />
                </div>

                <div className="form__input-row">
                  <input
                    className="form__input"
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={onChange}
                  />
                </div>

                <div className="form__input-row">
                  <input
                    className="form__input"
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={onChange}
                  />
                </div>
                {errors.email && <span color="red">{errors.email}</span>}
                <div className="form__input-row">
                  <input
                    className="form__input"
                    type="Password"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={onChange}
                  />
                </div>

                <div className="form__info">
                  <div className="checkbox-wrapper">
                    <label
                      htmlFor="check-signed-in"
                      className={`checkbox checkbox--sm`}
                    >
                      <input
                        name="signed-in"
                        type="checkbox"
                        id="check-signed-in"
                      />
                      <span className="checkbox__check"></span>
                      <p>
                        I agree to the Google Terms of Service and Privacy
                        Policy
                      </p>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn--rounded btn--yellow btn-submit"
                >
                  Sign up
                </button>
                {success && <p>User Registered with Success</p>}
                {errors.failure && <span color="red">{errors.failure}</span>}
                <p className="form__signup-link">
                  <Link href="/login">
                    <a href="#">Are you already a member?</a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    );
};

export default RegisterPage;
