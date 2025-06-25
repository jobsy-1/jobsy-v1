// src/pages/SignUpPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SignUpPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreedToTerms: false,
    userType: null, // 'hire' or 'work'
  });

  // OTP flow states
  const [otpSent, setOtpSent] = useState(false); // Tracks if OTP has been *successfully* sent
  const [otpCode, setOtpCode] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false); // Controls OTP input UI visibility
  const [resendCooldown, setResendCooldown] = useState(0); // Cooldown in seconds
  const resendTimerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isAccountCreated, setIsAccountCreated] = useState(false); // New state to track account creation

  // --- Effect to check if user is already logged in and redirect ---
  useEffect(() => {
    async function checkAuthAndRedirect() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error: fetchProfileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        if (profile) {
          console.log('User already signed in, profile exists. Redirecting to dashboard.');
          navigate('/dashboard');
        } else if (fetchProfileError && fetchProfileError.code === 'PGRST116') {
          console.log('User signed in, no profile found. Redirecting to complete profile.');
          navigate('/complete-profile');
        } else if (fetchProfileError) {
            console.error('Error checking profile existence:', fetchProfileError);
            setError(t('An error occurred while checking your profile.'));
        }
      }
    }
    checkAuthAndRedirect();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
         checkAuthAndRedirect();
      }
    });

    return () => {
      subscription.unsubscribe();
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
      }
    };
  }, [navigate, t]);


  // Effect to manage the resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      resendTimerRef.current = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    } else {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
        resendTimerRef.current = null;
      }
    }
    return () => {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
      }
    };
  }, [resendCooldown]);


  const handleNext = () => {
    setError(null);

    if (currentStep === 1) {
      if (!formData.email || !formData.password) {
        setError(t('Please enter both email and password.'));
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
          setError(t('Please enter a valid email address.'));
          return;
      }
       if (formData.password.length < 6) {
           setError(t('Password must be at least 6 characters long.'));
           return;
       }
    } else if (currentStep === 2) {
      if (!formData.agreedToTerms) {
        setError(t('You must agree to the terms and conditions.'));
        return;
      }
    } else if (currentStep === 3) {
        if (!formData.userType) {
            setError(t('Please choose whether you want to hire or find a job.'));
            return;
        }
        // Removed: setCurrentStep(currentStep + 1); // User wants to explicitly press 'Next'
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setError(null);
    setSuccessMessage(null);
    setOtpSent(false);
    setShowOtpInput(false);
    setResendCooldown(0); // Clear cooldown on back
    setIsAccountCreated(false); // Reset account created state on back
    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
      resendTimerRef.current = null;
    }
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUserTypeSelect = (type) => {
      setFormData(prevState => ({ ...prevState, userType: type }));
      // Do NOT call setCurrentStep here, user will click 'Next'
  };

  // Helper function to send OTP
  const sendOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(t('Attempting to send verification code...'));

    try {
      const { error: otpSendError } = await supabase.auth.signInWithOtp({
          email: formData.email,
          options: {
              channel: 'email',
          }
      });

      if (otpSendError) {
          console.error('Supabase OTP Send Error:', otpSendError);
          if (otpSendError.message.includes('For security purposes, you can only request this after')) {
            setError(t('Too many requests. Please wait a moment and try again.'));
            const match = otpSendError.message.match(/after (\d+) seconds/);
            const cooldownTime = match ? parseInt(match[1], 10) : 60;
            setResendCooldown(cooldownTime);
          } else {
            setError(t(otpSendError.message || 'Failed to send verification code. Please try again.'));
          }
          setLoading(false);
          setOtpSent(false); // Mark as not sent if there was an error
          return false; // Indicate failure
      }

      setOtpSent(true); // Mark OTP as truly sent if successful
      setSuccessMessage(t('Verification code sent to your email. Please enter it below. (check your spam box if you don\'t see it)'));
      setResendCooldown(60); // Start 60-second cooldown after successful send
      setLoading(false);
      return true; // Indicate success

    } catch (unexpectedError) {
      console.error('Unexpected Error during OTP Send:', unexpectedError);
      setError(t('An unexpected error occurred while sending the code. Please try again.'));
      setLoading(false);
      setOtpSent(false); // Mark as not sent on unexpected error
      return false; // Indicate failure
    }
  };

  // New handler for OTP verification
  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
          email: formData.email,
          token: otpCode,
          type: 'email'
      });

      if (verifyError) {
          console.error('Supabase OTP Verification Error:', verifyError);
          setError(t(verifyError.message));
          setLoading(false);
          return;
      }

      if (data && data.user) {
          const user = data.user;
          setSuccessMessage(t('Verification successful! Checking your profile...'));

          const { data: profile, error: fetchProfileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();

          if (profile) {
            console.log('OTP verified, profile exists. Redirecting to dashboard.');
            setTimeout(() => { navigate('/dashboard'); }, 1500);
          } else if (fetchProfileError && fetchProfileError.code === 'PGRST116') {
            console.log('OTP verified, no profile found. Redirecting to complete profile.');
            setTimeout(() => { navigate('/complete-profile'); }, 1500);
          } else if (fetchProfileError) {
              console.error('Error checking profile existence after OTP verification:', fetchProfileError);
              setError(t('An error occurred after verification. Please try logging in.'));
              setLoading(false);
          }
      } else {
          console.warn('OTP verification did not return a user object.');
          setError(t('OTP verification failed. Please try again.'));
          setLoading(false);
      }

    } catch (unexpectedError) {
      console.error('Unexpected Error during OTP Verification:', unexpectedError);
      setError(t('An unexpected error occurred during OTP verification. Please try again.'));
      setLoading(false);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // This handles the *initial* account creation with email and password
    // This part should only run ONCE to create the account.
    if (!isAccountCreated) {
        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: { user_type: formData.userType },
                }
            });

            if (signUpError) {
                console.error('Supabase Sign Up Error:', signUpError);
                setError(t(signUpError.message));
                setLoading(false);
                return;
            }

            if (data && data.user) {
                setIsAccountCreated(true); // Mark account as created
                setShowOtpInput(true); // Always show OTP input immediately after account creation
                setSuccessMessage(t('Account created successfully! Please click "Send Verification Code" to receive your code.'));
                // Do NOT call sendOtp here, user will explicitly click "Send Verification Code"
            } else {
                console.warn('Sign up did not return a user object after creation.');
                setError(t('Registration failed. Please try again.'));
            }

        } catch (unexpectedError) {
            console.error('Unexpected Error during Sign Up:', unexpectedError);
            setError(t('An unexpected error occurred during registration. Please try again.'));
        } finally {
            setLoading(false);
        }
    }
  };


  return (
    <div className="min-h-screen bg-[#fefef2] flex flex-col items-center justify-center p-6 relative">
      {/* Jobsy Logo Link (text-based, styled like header, links to /auth/login) */}
      <div className="absolute top-4 left-6 z-20">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-[#60a09b] flex-shrink-0">
          <span>{t('Jobsy')}</span>
        </Link>
      </div>

      <div className="w-full max-w-md mt-16 md:mt-0">
        <h1 className="text-3xl font-bold text-center text-[#60a09b] mb-8">
          {currentStep === 1 && t('Sign Up')}
          {currentStep === 2 && t('Terms and Conditions')}
          {currentStep === 3 && t('Choose Your Path')}
          {currentStep === 4 && t('Complete Registration')}
        </h1>

         <div className="mb-8 text-center text-lg font-semibold text-gray-600">
            {t('Step {{currentStep}} of 4', { currentStep: currentStep })}
         </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* --- Step 1: Email and Password --- */}
          {currentStep === 1 && (
            <>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="inline-block mb-2">
                  <span className="px-4 py-1 bg-[#E6E6FA] font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    {t('Email Address')}
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#A8E6CE] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                  placeholder={t('Enter your email')}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="inline-block mb-2">
                   <span className="px-4 py-1 bg-[#FADADD] text-[#A35C60] font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    {t('Password')}
                   </span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#FFDEAD] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                  placeholder={t('Create a password')}
                  required
                />
              </div>
            </>
          )}

          {/* --- Step 2: Terms and Conditions --- */}
          {currentStep === 2 && (
            <>
              <div className="border rounded-lg p-4 h-40 overflow-y-auto bg-white text-gray-700 text-sm">
                <p className="font-semibold mb-2">{t('Jobsy Terms and Conditions')}</p>
                <p>{t('At [jobsy], our mission is to support freelancers by providing a platform that connects talent with opportunity. We are proud to offer a space where independent professionals can showcase their skills, build connections, and grow their careers.')}</p>
                <br />
                <p>{t('However, it’s important to clarify the nature of our role. While we facilitate discovery and connection, we are not involved in the details of any agreements, communications, payments, or outcomes between freelancers and their clients.')}</p>
                <br />
                <p>{t('In simpler terms:')}</p>
                <br />
                <p>{t('We are not responsible for project terms, deliverables, or payment disputes.')}</p>
                <br />
                <p>{t('We do not mediate conflicts or enforce contractual obligations between users.')}</p>
                <br />
                <p>{t('We provide the platform—you take charge of your business. ')}</p>
                <br />
                <p>{t('By using this website, you acknowledge that all freelance work conducted as a result of connections made here is your responsibility to manage. We trust in your professionalism and ability to navigate your freelance relationships with integrity, clarity, and care.')}</p>
                <br />
                <p>{t('We’re honored to be a part of your journey—and while we don’t step into the spotlight with you, we’re here to keep the stage well-lit')}</p>
              </div>
              <div className="flex items-center">
                <input
                  id="agreedToTerms"
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#60a09b] border-gray-300 rounded focus:ring-[#60a09b]"
                  required
                />
                <label htmlFor="agreedToTerms" className="ml-2 text-sm text-gray-600">
                  {t('I agree to the')} <a href="#" className="text-[#60a09b] hover:underline">{t('Terms and Conditions')}</a>
                </label>
              </div>
            </>
          )}

          {/* --- Step 3: Choose User Type --- */}
          {currentStep === 3 && (
              <div className="flex flex-col space-y-4">
                  <button
                      type="button"
                      onClick={() => handleUserTypeSelect('hire')}
                      className={`py-4 px-6 rounded-lg text-xl font-semibold transition-colors bg-[#e6e6fa] text-[#6a6a80] border border-[#60a09b] hover:bg-[#60a09b] hover:text-white`}
                  >
                      {t('I want to Hire People')}
                  </button>
                   <button
                      type="button"
                      onClick={() => handleUserTypeSelect('work')}
                       className={`py-4 px-6 rounded-lg text-xl font-semibold transition-colors bg-[#ffd1dc] text-[#880808] border border-[#60a09b] hover:bg-[#60a09b] hover:text-white`}
                  >
                      {t('I want to Find a Job')}
                  </button>
              </div>
          )}

           {/* --- Step 4: Final Submission / OTP Entry --- */}
           {currentStep === 4 && (
               <>
                   {/* Conditional rendering for OTP input or initial registration */}
                   {showOtpInput ? ( // Show OTP input if account is created and we're ready for OTP
                       <div className="space-y-4">
                           <p className="text-center text-gray-700 text-lg">{successMessage}</p> {/* Display success message about OTP */}
                           <div>
                               <label htmlFor="otp" className="inline-block mb-2">
                                   <span className="px-4 py-1 text-[#6A6A80] bg-[#E6E6FA] font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                                       {t('Verification Code')}
                                   </span>
                               </label>
                               <input
                                   id="otp"
                                   type="text"
                                   value={otpCode}
                                   onChange={(e) => setOtpCode(e.target.value)}
                                   className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#A8E6CE] focus:outline-none text-gray-800 text-lg text-center transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                                   placeholder={t('Enter the 6-digit code')}
                                   required
                                   maxLength="6" // OTPs are usually 6 digits
                               />
                           </div>
                           <div className="flex justify-center pt-4">
                               <button
                                   type="button" // Use type="button" to prevent form default submit
                                   onClick={handleVerifyOtp} // Call new OTP verification handler
                                   disabled={loading || otpCode.length !== 6} // Disable if loading or code is not 6 chars
                                   className={`py-3 px-8 border border-transparent rounded-full shadow-lg text-lg font-bold text-[#000080] bg-[#89cff0] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ${loading || otpCode.length !== 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
                               >
                                   {loading ? t('Verifying...') : t('Verify Code')}
                               </button>
                           </div>
                           {resendCooldown > 0 ? (
                               <p className="text-sm text-gray-500 mt-2">{t('You can resend the code in {{count}} seconds.', { count: resendCooldown })}</p>
                           ) : (
                               <button
                                   type="button"
                                   onClick={sendOtp} // Call sendOtp again
                                   disabled={loading}
                                   className={`text-[#60a09b] hover:underline mt-2 text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                               >
                                   {t('Resend Code')}
                               </button>
                           )}
                           {error && ( // Display error message specific to OTP sending/verification
                               <div className="mt-4 text-center text-red-600">
                                   <p>{error}</p>
                               </div>
                           )}
                       </div>
                   ) : ( // Show initial signup message/button if account not created yet
                       <div className="text-center text-gray-700 text-lg">
                           <p className="mb-4">{t('Click "Complete Registration" to create your account.')}</p>
                           <p>{t('A verification code will be sent to your email.')}</p>
                       </div>
                   )}
               </>
           )}

          {/* --- Navigation Buttons (Conditional for initial steps) --- */}
          <div className="flex justify-between pt-4">
            {/* Back Button */}
            {currentStep > 1 && !showOtpInput && ( // Show Back button on steps 2 and 3, or on step 4 before OTP is shown
              <button
                type="button"
                onClick={handleBack}
                className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-gray-800 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition duration-200 ease-in-out"
              >
                {t('Back')}
              </button>
            )}
             {/* Special Back Button for Step 4 if OTP is shown, allows going back to re-send OTP or adjust details */}
             {currentStep === 4 && showOtpInput && (
               <button
                 type="button"
                 onClick={() => {
                   setOtpSent(false);
                   setShowOtpInput(false);
                   setSuccessMessage(null); // Clear success message related to OTP
                   setLoading(false); // Reset loading state
                   setResendCooldown(0); // Clear cooldown if going back
                   setIsAccountCreated(false); // Allow re-creating account or re-triggering initial send
                   if (resendTimerRef.current) {
                      clearInterval(resendTimerRef.current);
                      resendTimerRef.current = null;
                   }
                 }}
                 className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-[#880808] bg-[#ffd1dc] hover:bg-gray-400 focus:outline-none focus:ring-2 focus::ring-offset-2 focus:ring-gray-300 transition duration-200 ease-in-out"
               >
                 {t('Start Over / Back')} {/* Changed text for clarity */}
               </button>
             )}


            {/* Next Button - Show on steps 1, 2, 3 */}
            {currentStep < 4 && !loading && (
              <button
                type="button"
                onClick={handleNext}
                className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-[#004D4D] bg-[#B3EBF2] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ml-auto"
              >
                {t('Next')}
              </button>
            )}

            {/* Submit Button for Initial Registration (Only visible if OTP not yet displayed) */}
            {currentStep === 4 && !showOtpInput && (
              <button
                type="submit" // This button will trigger handleSubmit
                disabled={loading}
                className={`py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-[#000080] bg-[#89cff0] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''} ml-auto`}
              >
                {loading ? t('Creating Account...') : t('Complete Registration')}
              </button>
            )}
          </div>

          {error && !showOtpInput && ( // Only show general errors if not in OTP input mode
            <div className="mt-4 text-center text-red-600">
              <p>{error}</p>
            </div>
          )}
           {successMessage && !showOtpInput && ( // Only show main success message if OTP not yet displayed
            <div className="mt-4 text-center text-green-600">
              <p>{successMessage}</p>
            </div>
          )}

        </form>

        {currentStep === 1 && (
          <div className="mt-6 text-center">
            <span className="text-gray-600">{t('Already have an account?')} </span>
            <Link to="/auth/login" className="text-[#60a09b] hover:underline font-semibold">
              {t('Log In')}
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default SignUpPage;
