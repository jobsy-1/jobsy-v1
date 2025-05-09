import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Assuming you have supabaseClient.js set up
import { useNavigate, Link } from 'react-router-dom'; // Use Link for navigation

function SignUpPage() {
  const navigate = useNavigate();

  // State to manage the current step in the sign-up flow
  const [currentStep, setCurrentStep] = useState(1);

  // State to hold form data across steps
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreedToTerms: false,
    userType: null, // 'hire' or 'work'
    // Profile data will be added here in later steps
    fullName: '',
    nationality: '',
    knownLanguages: '', // Will store as comma-separated string initially
    // photo: null, // File object or URL - Photo upload would be a separate, more complex step
    age: '',
    gender: '', // Could use a select dropdown for more defined options
    talentSkills: '', // Will store as comma-separated string initially
    jobExperience: '', // More relevant for 'work' user type
    phoneNumber: '',
    // Rating will be handled by the system
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
      // TODO: Add more robust email and password format validation here
      // Example: Basic email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
          setError('Please enter a valid email address.');
          return;
      }
       // Example: Basic password length check
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
         // If user type is selected, navigate to the profile setup step (Step 4)
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
       // Automatically move to the next step (Profile Creation) after selecting user type
       setCurrentStep(currentStep + 1);
   };


  // --- Handler for Final Submission (Supabase Sign Up and Profile Creation) ---

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Final validation for the Profile Creation step (Step 4)
    // TODO: Add validation for all required profile fields based on userType
    // Example: Basic validation for required fields in Step 4
    if (!formData.fullName || !formData.nationality || !formData.age || !formData.gender || !formData.phoneNumber) {
        setError('Please fill out all required profile fields.');
        return;
    }
     if (formData.userType === 'work' && (!formData.talentSkills || !formData.jobExperience || !formData.knownLanguages)) {
         setError('Please fill out all required job seeker profile fields.');
         return;
     }


    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // 1. Sign up the user with Email and Password using Supabase Auth
      // We can pass some initial profile data in the options.data object,
      // but it's often better to insert the full profile into a separate table
      // as you are doing below. The options.data is good for basic metadata
      // like a username or avatar URL if you want it immediately available
      // on the auth.users table.
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            // You can pass some initial data here if needed, e.g.:
            // data: {
            //     full_name: formData.fullName,
            //     user_type: formData.userType,
            // },
            // Redirect URL after email confirmation (optional, configure in Supabase Auth settings)
            // redirectTo: 'http://localhost:5173/welcome' // Example redirect
        }
      });

      if (signUpError) {
        console.error('Supabase Sign Up Error:', signUpError);
        setError(signUpError.message);
        setLoading(false);
        return;
      }

       // Supabase sends a verification email automatically if email confirmations are enabled.
       // The user needs to click the link in the email to verify their account.
       // We should show a message telling them to check their email.
       // The 'data.user' object will exist even if the email is not yet confirmed,
       // but the session will be null until confirmed (depending on Supabase settings).
       // A more reliable check might be looking at data.user.email_confirmed_at
       // or relying on the redirect after clicking the email link.
       // For simplicity here, we'll assume email confirmation is on and show the message.

       if (data && data.user) {
            // Get the newly created user's ID
            const userId = data.user.id;

            // Prepare profile data based on collected form data and user type
            const profileData = {
                id: userId, // Link profile to auth user ID - MUST MATCH auth.users.id
                user_type: formData.userType, // 'hire' or 'work'
                full_name: formData.fullName,
                nationality: formData.nationality,
                // Convert comma-separated strings to arrays, filter out empty strings
                known_languages: formData.knownLanguages.split(',').map(lang => lang.trim()).filter(lang => lang),
                // photo: formData.photo ? 'path/to/uploaded/photo' : null, // Handle photo upload separately
                age: parseInt(formData.age, 10) || null, // Convert to number, default to null if invalid
                gender: formData.gender,
                talent_skills: formData.talentSkills.split(',').map(skill => skill.trim()).filter(skill => skill),
                job_experience: formData.jobExperience,
                phone_number: formData.phoneNumber,
                // rating will be handled by the system, not user input
            };

             // Insert profile data into the 'profiles' table
             // NOTE: You need to create the 'profiles' table in Supabase with these columns!
             // The 'id' column in 'profiles' must be a UUID and a Foreign Key referencing auth.users.id
            const { error: profileError } = await supabase
              .from('profiles')
              .insert([profileData]);

            if (profileError) {
              console.error('Supabase Profile Creation Error:', profileError);
              // If profile creation fails, you might want to handle this (e.g., delete the auth user, show error)
              // For now, show an error message but indicate signup was potentially successful
              setError('Registration successful, but failed to save profile details. Please update your profile later.');
               setLoading(false);
               // You might still want to redirect to a check email page
               // navigate('/check-email'); // Redirect even if profile save failed
               return; // Exit after showing error
            }

            // If both sign up and profile creation are successful immediately (less common flow if email confirmation is on)
            // If email confirmation is ON, the user isn't truly "signed in" yet, so a success message
            // instructing them to check email is usually more appropriate than redirecting to login/dashboard.
            setSuccessMessage('Registration and profile creation successful! Please check your email to verify your account.');
            setLoading(false);
            // Optionally redirect to a "Check Your Email" page
            // navigate('/check-email');

       } else {
           // This case might occur if signup fails but no specific error is returned, or
           // if Supabase changes its signup response structure. Log the data for debugging.
           console.error('Supabase Sign Up did not return a user:', data);
           setError('Registration failed. Please try again.');
           setLoading(false);
       }


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
          {currentStep === 4 && `Set Up Your Profile (${formData.userType === 'hire' ? 'Hiring' : 'Working'})`}
          {/* Add titles for subsequent steps if any */}
        </h1>

        {/* Step Indicator (Optional) */}
         <div className="mb-8 text-center text-lg font-semibold text-gray-600">
            Step {currentStep} of {currentStep < 4 ? '4+' : '4'} {/* Indicate total steps */}
         </div>


        <form onSubmit={handleSubmit} className="space-y-6">

          {/* --- Step 1: Email and Password --- */}
          {currentStep === 1 && (
            <>
              {/* Email Input */}
              <div>
                {/* Custom Label Style */}
                <label htmlFor="email" className="inline-block mb-2">
                  <span className="px-4 py-1 bg-[#F8B195] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer"> {/* Added cursor-pointer */}
                    Email Address
                  </span>
                </label>
                {/* Input Style (Link-like appearance - using border-b) */}
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
                {/* Custom Label Style */}
                <label htmlFor="password" className="inline-block mb-2">
                   <span className="px-4 py-1 bg-[#C06C84] text-white font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer"> {/* Added cursor-pointer */}
                    Password
                   </span>
                </label>
                 {/* Input Style (Link-like appearance - using border-b) */}
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

           {/* --- Step 4: Profile Creation Form --- */}
           {currentStep === 4 && (
               <>
                   {/* Full Name Input */}
                   <div>
                       <label htmlFor="fullName" className="inline-block mb-2">
                           <span className="px-4 py-1 bg-[#A8E6CE] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                              Full Name
                           </span>
                       </label>
                       <input
                           id="fullName"
                           type="text"
                           name="fullName"
                           value={formData.fullName}
                           onChange={handleInputChange}
                           className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#F8B195] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                           placeholder="Enter your full name"
                           required
                       />
                   </div>

                   {/* Nationality Input */}
                   <div>
                       <label htmlFor="nationality" className="inline-block mb-2">
                           <span className="px-4 py-1 bg-[#FFDEAD] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                              Nationality
                           </span>
                       </label>
                       <input
                           id="nationality"
                           type="text"
                           name="nationality"
                           value={formData.nationality}
                           onChange={handleInputChange}
                           className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#C06C84] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                           placeholder="Enter your nationality"
                           required
                       />
                   </div>

                    {/* Age Input */}
                   <div>
                       <label htmlFor="age" className="inline-block mb-2">
                           <span className="px-4 py-1 bg-[#F8B195] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                              Age
                           </span>
                       </label>
                       <input
                           id="age"
                           type="number" // Use type="number" for age
                           name="age"
                           value={formData.age}
                           onChange={handleInputChange}
                           className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#A8E6CE] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                           placeholder="Enter your age"
                           required
                           min="16" // Example: Minimum age
                           max="120" // Example: Maximum age
                       />
                   </div>

                    {/* Gender Input (Could be a select dropdown for better data consistency) */}
                   <div>
                       <label htmlFor="gender" className="inline-block mb-2">
                           <span className="px-4 py-1 bg-[#C06C84] text-white font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                              Gender
                           </span>
                       </label>
                       {/* Using a simple text input for now, consider a select later */}
                       <input
                           id="gender"
                           type="text"
                           name="gender"
                           value={formData.gender}
                           onChange={handleInputChange}
                           className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#FFDEAD] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                           placeholder="Enter your gender"
                           required
                       />
                   </div>

                   {/* Phone Number Input */}
                   <div>
                       <label htmlFor="phoneNumber" className="inline-block mb-2">
                           <span className="px-4 py-1 bg-[#A8E6CE] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                              Phone Number
                           </span>
                       </label>
                       <input
                           id="phoneNumber"
                           type="tel" // Use type="tel" for phone numbers
                           name="phoneNumber"
                           value={formData.phoneNumber}
                           onChange={handleInputChange}
                           className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#F8B195] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                           placeholder="Enter your phone number"
                           required
                       />
                   </div>


                   {/* Conditional fields for 'work' user type */}
                   {formData.userType === 'work' && (
                       <>
                            {/* Known Languages Input */}
                           <div>
                               <label htmlFor="knownLanguages" className="inline-block mb-2">
                                   <span className="px-4 py-1 bg-[#C06C84] text-white font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                                      Known Languages (comma-separated)
                                   </span>
                               </label>
                               <input
                                   id="knownLanguages"
                                   type="text"
                                   name="knownLanguages"
                                   value={formData.knownLanguages}
                                   onChange={handleInputChange}
                                   className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#FFDEAD] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                                   placeholder="e.g., English, Spanish, French"
                                   required // Make required for 'work' type
                               />
                           </div>

                           {/* Talent Skills Input */}
                           <div>
                               <label htmlFor="talentSkills" className="inline-block mb-2">
                                   <span className="px-4 py-1 bg-[#A8E6CE] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                                      Talent/Skills (comma-separated)
                                   </span>
                               </label>
                               <input
                                   id="talentSkills"
                                   type="text"
                                   name="talentSkills"
                                   value={formData.talentSkills}
                                   onChange={handleInputChange}
                                   className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#F8B195] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                                   placeholder="e.g., Web Development, Graphic Design, Writing"
                                   required // Make required for 'work' type
                               />
                           </div>

                           {/* Job Experience Input */}
                           <div>
                               <label htmlFor="jobExperience" className="inline-block mb-2">
                                    <span className="px-4 py-1 bg-[#FFDEAD] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                                       Job Experience
                                    </span>
                               </label>
                               <textarea
                                   id="jobExperience"
                                   name="jobExperience"
                                   value={formData.jobExperience}
                                   onChange={handleInputChange}
                                   rows="4"
                                   className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#C06C84] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight resize-y bg-transparent"
                                   placeholder="Tell us about your work experience..."
                                   required // Make required for 'work' type
                               />
                           </div>
                       </>
                   )}

                    {/* TODO: Add Photo Upload field later if needed - requires Supabase Storage */}
                    {/* Photo Input (more complex, involves file handling and Supabase Storage) */}
                    {/* <div>
                        <label htmlFor="photo" className="inline-block mb-2">
                            <span className="px-4 py-1 bg-[#SOME_COLOR] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                                Profile Photo
                            </span>
                        </label>
                        <input
                            id="photo"
                            type="file"
                            name="photo"
                            onChange={handleInputChange} // You'll need a specific handler for file inputs
                            className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#ANOTHER_COLOR] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                            accept="image/*" // Accept image files
                        />
                    </div> */}


               </>
           )}


          {/* --- Navigation Buttons --- */}
          <div className="flex justify-between pt-4">
            {/* Back Button - Show if not on the first step */}
            {currentStep > 1 && (
              <button
                type="button" // Important: Use type="button" to prevent form submission
                onClick={handleBack}
                className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-gray-800 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition duration-200 ease-in-out"
              >
                Back
              </button>
            )}

            {/* Next Button - Show if not on the last step (Profile Creation) */}
            {/* Also hide if loading */}
            {currentStep < 4 && !loading && ( // Hide 'Next' on step 4, and when loading
              <button
                type="button" // Important: Use type="button" to prevent form submission
                onClick={handleNext}
                className="py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-[#355C7D] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ml-auto"
              >
                Next
              </button>
            )}

            {/* Submit Button - Show ONLY on the final step (Profile Creation) */}
            {currentStep === 4 && ( // Show 'Create Profile' on step 4
              <button
                type="submit" // Use type="submit" to trigger form submission
                disabled={loading} // Disable button when loading
                className={`py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-[#355C7D] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''} ml-auto`}
              >
                {loading ? 'Creating Profile...' : 'Create Profile'}
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
