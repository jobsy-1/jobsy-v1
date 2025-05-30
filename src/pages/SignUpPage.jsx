// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Assuming you have supabaseClient.js set up
import { useNavigate, Link } from 'react-router-dom'; // Use Link for navigation
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

function SignUpPage() {
  const navigate = useNavigate();
  // Call the hook to get the translation function 't'
  const { t } = useTranslation();

  // State to manage the current step in the sign-up flow
  const [currentStep, setCurrentStep] = useState(1);

  // State to hold form data across steps (only needed for signup details now)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreedToTerms: false,
    userType: null, // 'hire' or 'work' - We'll store this later
    // Profile data is NOT needed in this initial signup component's state
  });

  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // --- Handlers for Step Navigation ---

  const handleNext = () => {
    // Basic validation before moving to the next step
    setError(null); // Clear previous errors

    if (currentStep === 1) {
      // Validate Email and Password
      if (!formData.email || !formData.password) {
        setError(t('Please enter both email and password.')); // Translate error message
        return;
      }
      // Add more robust email and password format validation here
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
          setError(t('Please enter a valid email address.')); // Translate error message
          return;
      }
       if (formData.password.length < 6) { // Supabase default minimum password length is 6
           setError(t('Password must be at least 6 characters long.')); // Translate error message
           return;
       }

    } else if (currentStep === 2) {
      // Validate Terms Agreement
      if (!formData.agreedToTerms) {
        setError(t('You must agree to the terms and conditions.')); // Translate error message
        return;
      }
    } else if (currentStep === 3) {
        // Validate User Type Selection
        if (!formData.userType) {
            setError(t('Please choose whether you want to hire or find a job.')); // Translate error message
            return;
        }
         // If user type is selected, proceed to the final submission step (Step 4)
         // Note: Step 4 will now trigger the Supabase signup, not profile form
         setCurrentStep(currentStep + 1);
         return; // Exit the handler after setting the step
    }
     // For other steps, just move forward if no specific validation fails
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setError(null); // Clear errors when going back
    setSuccessMessage(null); // Clear success message when going back
    setCurrentStep(currentStep - 1);
  };

  // --- Handlers for Form Input Changes ---

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

   // --- Handler for User Type Selection (Step 3) ---
   const handleUserTypeSelect = (type) => {
       setFormData(prevState => ({ ...prevState, userType: type }));
       // Automatically move to the next step (Submission) after selecting user type
       setCurrentStep(currentStep + 1);
   };


  // --- Handler for Final Submission (Supabase Sign Up Only) ---

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // At this point (Step 4), we only perform the Supabase authentication signup.
    // Profile data collection and insertion will happen AFTER email verification.

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Sign up the user with Email and Password using Supabase Auth
      // We can pass the userType here as metadata if we want it immediately
      // available on the auth.users table, but it's not strictly necessary
      // as we'll collect full profile data later.
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
             data: { // Storing user_type as metadata on the auth.users table
                 user_type: formData.userType,
             },
            // Configure your redirect URL in Supabase Auth Settings
            // redirectTo: 'http://localhost:5173/complete-profile' // Example redirect URL
        }
      });

      if (signUpError) {
        console.error('Supabase Sign Up Error:', signUpError);
        setError(t(signUpError.message)); // Translate Supabase error message
        setLoading(false);
        return;
      }

       // If signup is successful, instruct the user to check their email.
       // The user object will exist, but the session might be null until email is confirmed.
       if (data && data.user) {
           setSuccessMessage(t('Registration successful! Please check your email to verify your account. (check your spam box, if you did not see the email.)')); // Translate success message
           setLoading(false);
           // Optionally redirect to a "Check Your Email" page immediately
           // navigate('/check-email');
       } else {
            // Handle cases where signup might fail without a specific error object returned
            console.error('Supabase Sign Up did not return a user:', data);
            setError(t('Registration failed. Please try again.')); // Translate fallback error
            setLoading(false);
       }


       // --- IMPORTANT: Profile Creation Logic Removed from here ---
       // The code to insert into the 'profiles' table has been removed from this function.
       // This will now happen in a separate flow AFTER email verification.


    } catch (error) {
      console.error('Unexpected Error during Sign Up:', error);
      setError(t('An unexpected error occurred. Please try again.')); // Translate error message
      setLoading(false);
    }
  };

  // --- Render Method (Conditional Rendering based on Step) ---

  return (
    <div className="min-h-screen bg-[#fefef2] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Translate the page title based on the current step */}
        <h1 className="text-3xl font-bold text-center text-[#60a09b] mb-8">
          {currentStep === 1 && t('Sign Up')}
          {currentStep === 2 && t('Terms and Conditions')}
          {currentStep === 3 && t('Choose Your Path')}
          {currentStep === 4 && t('Complete Registration')} {/* Updated title for final step */}
        </h1>

        {/* Step Indicator (Optional) - Use interpolation for numbers */}
         <div className="mb-8 text-center text-lg font-semibold text-gray-600">
            {t('Step {{currentStep}} of 4', { currentStep: currentStep })} {/* Translate step indicator */}
         </div>


        <form onSubmit={handleSubmit} className="space-y-6">

          {/* --- Step 1: Email and Password --- */}
          {currentStep === 1 && (
            <>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="inline-block mb-2">
                  <span className="text-[#6A6A80] px-4 py-1 bg-[#E6E6FA] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    {t('Email Address')} {/* Translate label */}
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
                    {t('Password')} {/* Translate label */}
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
                {/* Placeholder Terms and Conditions - Need to translate the actual terms */}
                <p className="font-semibold mb-2">{t('Jobsy Terms and Conditions')}</p> {/* Translate title */}
                <p>{t('At [jobsy], our mission is to support freelancers by providing a platform that connects talent with opportunity. We are proud to offer a space where independent professionals can showcase their skills, build connections, and grow their careers.')}</p> 
                <br />
                <p>{t('However, it’s important to clarify the nature of our role. While we facilitate discovery and connection, we are not involved in the details of any agreements, communications, payments, or outcomes between freelancers and their clients.')}</p> {/* Translate placeholder text */}
                <br />
                <p>{t('In simpler terms:')}</p> {/* Translate placeholder text */}
                <br />
                <p>{t('We are not responsible for project terms, deliverables, or payment disputes.')}</p> {/* Translate placeholder text */}
                <br />
                <p>{t('We do not mediate conflicts or enforce contractual obligations between users.')}</p> {/* Translate placeholder text */}
                <br />
                <p>{t('We provide the platform—you take charge of your business. ')}</p> {/* Translate placeholder text */}
                <br />
                <p>{t('By using this website, you acknowledge that all freelance work conducted as a result of connections made here is your responsibility to manage. We trust in your professionalism and ability to navigate your freelance relationships with integrity, clarity, and care.')}</p> {/* Translate placeholder text */}
                <br />
                <p>{t('We’re honored to be a part of your journey—and while we don’t step into the spotlight with you, we’re here to keep the stage well-lit')}</p> {/* Translate placeholder text */}
             
              </div>
              <div className="flex items-center">
                <input
                  id="agreedToTerms"
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#60a09b] border-gray-300 rounded focus:ring-[#60a09b]"
                  required // Require agreement
                />
                <label htmlFor="agreedToTerms" className="ml-2 text-sm text-gray-600">
                  {t('I agree to the')} <a href="#" className="text-[#60a09b] hover:underline">{t('Terms and Conditions')}</a> {/* Translate text and link text */}
                </label>
              </div>
            </>
          )}

          {/* --- Step 3: Choose User Type --- */}
          {currentStep === 3 && (
              <div className="flex flex-col space-y-4">
                  <button
                      type="button" // Use type="button" to prevent form submission
                      onClick={() => handleUserTypeSelect('hire')}
                      className={`py-4 px-6 rounded-lg text-xl font-semibold transition-colors bg-[#e6e6fa] text-[#6a6a80] border border-[#60a09b] hover:bg-[#60a09b] hover:text-white`}
                  >
                      {t('I want to Hire People')} {/* Translate button text */}
                  </button>
                   <button
                      type="button" // Use type="button" to prevent form submission
                      onClick={() => handleUserTypeSelect('work')}
                       className={`py-4 px-6 rounded-lg text-xl font-semibold transition-colors bg-[#ffd1dc] text-[#880808] border border-[#60a09b] hover:bg-[#60a09b] hover:text-white`}
                  >
                      {t('I want to Find a Job')} {/* Translate button text */}
                  </button>
              </div>
          )}

           {/* --- Step 4: Final Submission (Authentication Signup Only) --- */}
           {currentStep === 4 && (
               <div className="text-center text-gray-700 text-lg">
                   <p className="mb-4">{t('Click "Complete Registration" to create your account.')}</p> {/* Translate paragraph */}
                   <p>{t('You will receive an email to verify your address before you can log in and complete your profile.')}</p> {/* Translate paragraph */}
               </div>
           )}


          {/* --- Navigation Buttons --- */}
          <div className="flex justify-between pt-4">
            {/* Back Button - Show if not on the first step */}
            {currentStep > 1 && currentStep < 4 && ( // Show Back button on steps 2 and 3
              <button
                type="button" // Important: Use type="button" to prevent form submission
                onClick={handleBack}
                className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-gray-800 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition duration-200 ease-in-out"
              >
                {t('Back')} {/* Translate button text */}
              </button>
            )}
             {currentStep === 4 && ( // Show Back button on step 4 to go back to user type selection
               <button
                 type="button"
                 onClick={handleBack}
                 className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-[#880808] bg-[#ffd1dc] hover:bg-gray-400 focus:outline-none focus:ring-2 focus::ring-offset-2 focus:ring-gray-300 transition duration-200 ease-in-out"
               >
                 {t('Back')} {/* Translate button text */}
               </button>
             )}


            {/* Next Button - Show on steps 1, 2, 3 */}
            {/* Also hide if loading */}
            {currentStep < 4 && !loading && (
              <button
                type="button" // Important: Use type="button" to prevent form submission
                onClick={handleNext}
                className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-[#004D4D] bg-[#B3EBF2] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ml-auto"
              >
                {t('Next')} {/* Translate button text */}
              </button>
            )}

            {/* Submit Button - Show ONLY on the final step (Step 4) */}
            {currentStep === 4 && (
              <button
                type="submit" // Use type="submit" to trigger form submission
                disabled={loading} // Disable button when loading
                className={`py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-[#000080] bg-[#89cff0] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''} ml-auto`}
              >
                {/* Translate button text based on loading state */}
                {loading ? t('Registering...') : t('Complete Registration')}
              </button>
            )}
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="mt-4 text-center text-red-600">
              <p>{error}</p> {/* Error message is already translated */}
            </div>
          )}
           {successMessage && (
            <div className="mt-4 text-center text-green-600">
              <p>{successMessage}</p> {/* Success message is already translated */}
            </div>
          )}


        </form>

        {/* "Already have an account?" link - Show only on the first step */}
        {currentStep === 1 && (
          <div className="mt-6 text-center">
            <span className="text-gray-600">{t('Already have an account?')} </span> {/* Translate text */}
            <Link to="/auth/login" className="text-[#60a09b] hover:underline font-semibold">
              {t('Log In')} {/* Translate link text */}
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default SignUpPage;
