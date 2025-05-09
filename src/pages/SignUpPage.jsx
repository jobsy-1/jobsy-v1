import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Assuming you have supabaseClient.js set up
import { useNavigate, Link } from 'react-router-dom'; // Use Link for navigation

function SignUpPage() {
  const navigate = useNavigate();

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
        setError('Please enter both email and password.');
        return;
      }
      // Add more robust email and password format validation here
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
          setError('Please enter a valid email address.');
          return;
      }
       if (formData.password.length < 6) { // Supabase default minimum password length is 6
           setError('Password must be at least 6 characters long.');
           return;
       }

    } else if (currentStep === 2) {
      // Validate Terms Agreement
      if (!formData.agreedToTerms) {
        setError('You must agree to the terms and conditions.');
        return;
      }
    } else if (currentStep === 3) {
        // Validate User Type Selection
        if (!formData.userType) {
            setError('Please choose whether you want to hire or find a job.');
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
        setError(signUpError.message);
        setLoading(false);
        return;
      }

       // If signup is successful, instruct the user to check their email.
       // The user object will exist, but the session might be null until email is confirmed.
       if (data && data.user) {
           setSuccessMessage('Registration successful! Please check your email to verify your account.');
           setLoading(false);
           // Optionally redirect to a "Check Your Email" page immediately
           // navigate('/check-email');
       } else {
            // Handle cases where signup might fail without a specific error object returned
            console.error('Supabase Sign Up did not return a user:', data);
            setError('Registration failed. Please try again.');
            setLoading(false);
       }


       // --- IMPORTANT: Profile Creation Logic Removed from here ---
       // The code to insert into the 'profiles' table has been removed from this function.
       // This will now happen in a separate flow AFTER email verification.


    } catch (error) {
      console.error('Unexpected Error during Sign Up:', error);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  // --- Render Method (Conditional Rendering based on Step) ---

  return (
    <div className="min-h-screen bg-[#fefef2] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#355C7D] mb-8">
          {currentStep === 1 && 'Sign Up'}
          {currentStep === 2 && 'Terms and Conditions'}
          {currentStep === 3 && 'Choose Your Path'}
          {currentStep === 4 && 'Complete Registration'} {/* Updated title for final step */}
        </h1>

        {/* Step Indicator (Optional) */}
         <div className="mb-8 text-center text-lg font-semibold text-gray-600">
            Step {currentStep} of 4
         </div>


        <form onSubmit={handleSubmit} className="space-y-6">

          {/* --- Step 1: Email and Password --- */}
          {currentStep === 1 && (
            <>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="inline-block mb-2">
                  <span className="px-4 py-1 bg-[#F8B195] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    Email Address
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#A8E6CE] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="inline-block mb-2">
                   <span className="px-4 py-1 bg-[#C06C84] text-white font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    Password
                   </span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#FFDEAD] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                  placeholder="Create a password"
                  required
                />
              </div>
            </>
          )}

          {/* --- Step 2: Terms and Conditions --- */}
          {currentStep === 2 && (
            <>
              <div className="border rounded-lg p-4 h-40 overflow-y-auto bg-white text-gray-700 text-sm">
                {/* Placeholder Terms and Conditions */}
                <p className="font-semibold mb-2">Jobsy Terms and Conditions</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className="mt-2">... (More terms) ...</p>
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
                  I agree to the <a href="#" className="text-[#60a09b] hover:underline">Terms and Conditions</a>
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
                      className={`py-4 px-6 rounded-lg text-xl font-semibold transition-colors duration-300 ${formData.userType === 'hire' ? 'bg-[#60a09b] text-white' : 'bg-white text-[#60a09b] border border-[#60a09b] hover:bg-[#60a09b] hover:text-white'}`}
                  >
                      I want to Hire People
                  </button>
                   <button
                      type="button" // Use type="button" to prevent form submission
                      onClick={() => handleUserTypeSelect('work')}
                       className={`py-4 px-6 rounded-lg text-xl font-semibold transition-colors duration-300 ${formData.userType === 'work' ? 'bg-[#60a09b] text-white' : 'bg-white text-[#60a09b] border border-[#60a09b] hover:bg-[#60a09b] hover:text-white'}`}
                  >
                      I want to Find a Job
                  </button>
              </div>
          )}

           {/* --- Step 4: Final Submission (Authentication Signup Only) --- */}
           {currentStep === 4 && (
               <div className="text-center text-gray-700 text-lg">
                   <p className="mb-4">Click "Complete Registration" to create your account.</p>
                   <p>You will receive an email to verify your address before you can log in and complete your profile.</p>
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
                Back
              </button>
            )}
             {currentStep === 4 && ( // Show Back button on step 4 to go back to user type selection
               <button
                 type="button"
                 onClick={handleBack}
                 className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-gray-800 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus::ring-offset-2 focus:ring-gray-300 transition duration-200 ease-in-out"
               >
                 Back
               </button>
             )}


            {/* Next Button - Show on steps 1, 2, 3 */}
            {/* Also hide if loading */}
            {currentStep < 4 && !loading && (
              <button
                type="button" // Important: Use type="button" to prevent form submission
                onClick={handleNext}
                className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-[#355C7D] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ml-auto"
              >
                Next
              </button>
            )}

            {/* Submit Button - Show ONLY on the final step (Step 4) */}
            {currentStep === 4 && (
              <button
                type="submit" // Use type="submit" to trigger form submission
                disabled={loading} // Disable button when loading
                className={`py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-[#355C7D] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''} ml-auto`}
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            )}
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="mt-4 text-center text-red-600">
              <p>{error}</p>
            </div>
          )}
           {successMessage && (
            <div className="mt-4 text-center text-green-600">
              <p>{successMessage}</p>
            </div>
          )}


        </form>

        {/* "Already have an account?" link - Show only on the first step */}
        {currentStep === 1 && (
          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/auth/login" className="text-[#60a09b] hover:underline font-semibold">
              Log In
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default SignUpPage;
