import { useState } from 'react';
import Layout from '../layouts/Main';
import Link from 'next/link';
import { forgotPassword } from 'APIS/user';



const ForgotPassword = () => {
 const [email,setEmail]=useState('');
 const [errors,setErrors]=useState({})
 const [success,setSuccess]=useState(false);
const handleEmailChange=(e)=>setEmail(e.target.value);

const handleForgotPassword=async(e)=>
{
  e.preventDefault();
  const res=await forgotPassword(email);
  if (res?.success)
  {
    setSuccess(true);
  }
  else if (res?.email)
  {
    setErrors({email:res.email});
  }
}

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a><i className="icon-left"></i> Back to shop</a>
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Forgot your password?</h2>
            <p className="form-block__description">Enter your email or phone number and recover your account</p>
            
            <form className="form" onSubmit={handleForgotPassword}>
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  placeholder="email" 
                  type="text" 
                  name="email"
                 value={email}
                 onChange={handleEmailChange}
                />
              </div>
              {errors.email&&(<p className='message message--error'>
                {errors.email}
              </p>)}
              
             

              <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Reset password</button>
            </form>
            {success&&(<p className='message message--success'>A link has sent to {email}</p>)}
          </div>

        </div>
      </section>
    </Layout>
  )
}
  
export default ForgotPassword