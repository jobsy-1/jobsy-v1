// src/pages/CompleteProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Assuming you have supabaseClient.js set up
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

function CompleteProfilePage() {
  const navigate = useNavigate();
  // Call the hook to get the translation function 't'
  const { t } = useTranslation();

  // State to hold profile form data
  const [profileData, setProfileData] = useState({
    fullName: '',
    nationality: '',
    knownLanguages: '', // Will store as comma-separated string initially
    // photo: null, // File object or URL - Photo upload is more complex
    age: '',
    gender: '',
    talentSkills: '', // Will store as comma-separated string initially
    jobExperience: '', // More relevant for 'work' user type
    phoneNumber: '',
    // userType will be fetched from auth.users metadata or determined here if not stored
    userType: null,
  });

  // State to manage UI state
  const [loading, setLoading] = useState(true); // Start loading while checking auth/profile
  const [submitting, setSubmitting] = useState(false); // Loading state specifically for form submission
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null); // To store the authenticated user object
  const [profileExists, setProfileExists] = useState(false); // To track if a profile already exists

  // --- Effect to check authentication and fetch existing profile ---
  useEffect(() => {
    async function checkAuthAndProfile() {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError) {
        console.error('Error fetching user:', authError);
        // If no user is logged in, redirect to login
        navigate('/auth/login');
        return;
      }

      if (user) {
        setUser(user);

        // Attempt to fetch the user's existing profile
        const { data: profile, error: fetchProfileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id) // Check for a profile matching the authenticated user's ID
          .single(); // Expecting zero or one profile per user

        if (fetchProfileError && fetchProfileError.code !== 'PGRST116') { // PGRST116 means 'no rows found'
          console.error('Error fetching profile:', fetchProfileError);
          setError(t('Failed to load profile data.')); // Translate error message
          setLoading(false);
          return;
        }

        if (profile) {
          // Profile exists, redirect to dashboard or welcome page
          setProfileExists(true);
          setLoading(false);
          setSuccessMessage(t('Profile already complete. Redirecting...')); // Translate success message
          // Redirect after a short delay
          setTimeout(() => {
            navigate('/dashboard'); // TODO: Replace with your actual dashboard route
          }, 2000); // Redirect after 2 seconds
        } else {
          // No profile exists, load the form
          setProfileExists(false);
          setLoading(false);

          // Optionally populate userType from auth.users metadata if stored there during signup
          if (user.user_metadata && user.user_metadata.user_type) {
            setProfileData(prevState => ({
              ...prevState,
              userType: user.user_metadata.user_type
            }));
          } else {
            // If user_type wasn't stored as metadata, you might need to ask the user again
            // or handle this case based on your application logic.
            // For now, we'll assume it's either in metadata or needs to be asked.
            console.warn("User type not found in auth.users metadata. User will need to select again or logic needs adjustment.");
            // If userType is critical and not in metadata, you might redirect them back
            // to a page to select user type or add a step here.
            // For this component, we'll proceed assuming userType will be handled.
          }
        }
      } else {
        // Should not happen if authError is handled, but as a fallback
        navigate('/auth/login');
      }
    }

    checkAuthAndProfile();

    // Listen for auth state changes (e.g., if user logs out on another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        // User logged out
        navigate('/auth/login');
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, t]); // Added t to dependency array


  // --- Handler for Form Input Changes ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // --- Handler for User Type Selection (if needed on this page) ---
  // This is only needed if userType wasn't stored in auth.users metadata
  const handleUserTypeSelect = (type) => {
    setProfileData(prevState => ({ ...prevState, userType: type }));
  };


  // --- Handler for Profile Form Submission ---
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError(t('User not authenticated.')); // Translate error message
      return;
    }

    // Basic validation for required fields before submission
    if (!profileData.fullName || !profileData.nationality || !profileData.age || !profileData.gender || !profileData.phoneNumber) {
      setError(t('Please fill out all required profile fields.')); // Translate error message
      return;
    }
    if (profileData.userType === 'work' && (!profileData.talentSkills || !profileData.jobExperience || !profileData.knownLanguages)) {
      setError(t('Please fill out all required job seeker profile fields.')); // Translate error message
      return;
    }
    if (!profileData.userType) {
      setError(t('User type is missing. Please select your user type.')); // Translate error message
      return;
    }


    setSubmitting(true); // Use submitting state for form specific loading
    setError(null);
    setSuccessMessage(null);

    try {
      // Prepare profile data for insertion
      const profileToInsert = {
        id: user.id, // Use the authenticated user's ID
        user_type: profileData.userType,
        full_name: profileData.fullName,
        nationality: profileData.nationality,
        // Convert comma-separated strings to arrays, filter out empty strings
        known_languages: profileData.knownLanguages.split(',').map(lang => lang.trim()).filter(lang => lang),
        // photo: profileData.photo ? 'path/to/uploaded/photo' : null, // Handle photo upload separately
        age: parseInt(profileData.age, 10) || null, // Convert to number
        gender: profileData.gender,
        talent_skills: profileData.talentSkills.split(',').map(skill => skill.trim()).filter(skill => skill),
        job_experience: profileData.jobExperience,
        phone_number: profileData.phoneNumber,
        // created_at and updated_at will be handled by database defaults/triggers
      };

      // Insert profile data into the 'profiles' table
      // RLS policy for INSERT should allow this since user is authenticated and id matches
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([profileToInsert]);

      if (insertError) {
        console.error('Supabase Profile Insertion Error:', insertError);
        setError(t(insertError.message)); // Translate error message (Supabase provides messages)
        setSubmitting(false);
        return;
      }

      setSuccessMessage(t('Profile created successfully!')); // Translate success message
      setSubmitting(false);

      // Redirect to dashboard after successful profile creation
      setTimeout(() => {
        navigate('/dashboard'); // TODO: Replace with your actual dashboard route
      }, 2000); // Redirect after 2 seconds

    } catch (error) {
      console.error('Unexpected Error during Profile Creation:', error);
      setError(t('An unexpected error occurred. Please try again.')); // Translate error message
      setSubmitting(false);
    }
  };

  // --- Render Method ---

  // Show a loading state while checking auth/profile
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fefef2] flex items-center justify-center">
        <p className="text-xl font-semibold text-[#355C7D]">{t('Loading profile...')}</p> {/* Translate loading text */}
      </div>
    );
  }

  // If profile already exists, show a message before redirecting
  if (profileExists) {
    return (
      <div className="min-h-screen bg-[#fefef2] flex items-center justify-center">
        <p className="text-xl font-semibold text-[#355C7D]">{successMessage}</p> {/* successMessage is already translated */}
      </div>
    );
  }


  // Render the profile form if user is authenticated and profile doesn't exist
  return (
    <div className="min-h-screen bg-[#fefef2] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#355C7D] mb-8">
          {/* Translate title with interpolation */}
          {t('Complete Your Profile ({{userType}})', { userType: profileData.userType === 'hire' ? t('Hiring') : profileData.userType === 'work' ? t('Working') : t('Select Type') })}
        </h1>

        {/* Display user type if already known, or provide selection if not */}
        {!profileData.userType && (
          <div className="flex flex-col space-y-4 mb-6">
            {/* Translate prompt text */}
            <p className="text-center text-gray-700 font-semibold">{t('What do you want to do?')}</p>
            <button
              type="button"
              onClick={() => handleUserTypeSelect('hire')}
              className={`py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 ${profileData.userType === 'hire' ? 'bg-[#60a09b] text-white' : 'bg-white text-[#60a09b] border border-[#60a09b] hover:bg-[#60a09b] hover:text-white'}`}
            >
              {t('I want to Hire People')} {/* Translate button text */}
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeSelect('work')}
              className={`py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 ${profileData.userType === 'work' ? 'bg-[#60a09b] text-white' : 'bg-white text-[#60a09b] border border-[#60a09b] hover:bg-[#60a09b] hover:text-white'}`}
            >
              {t('I want to Find a Job')} {/* Translate button text */}
            </button>
          </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Profile Form Fields (Similar to Step 4 of Signup) */}
          {/* Only show fields if userType is selected */}
          {profileData.userType && (
            <>
              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="inline-block mb-2">
                  <span className="px-4 py-1 bg-[#A8E6CE] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    {t('Full Name')} {/* Translate label */}
                  </span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#F8B195] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                  placeholder={t('Enter your full name')}
                  required
                />
              </div>

              {/* Nationality Input */}
              <div>
                <label htmlFor="nationality" className="inline-block mb-2">
                  <span className="px-4 py-1 bg-[#FFDEAD] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    {t('Nationality')} {/* Translate label */}
                  </span>
                </label>
                <input
                  id="nationality"
                  type="text"
                  name="nationality"
                  value={profileData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#C06C84] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                  placeholder={t('Enter your nationality')}
                  required
                />
              </div>

              {/* Age Input */}
              <div>
                <label htmlFor="age" className="inline-block mb-2">
                  <span className="px-4 py-1 bg-[#F8B195] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    {t('Age')} {/* Translate label */}
                  </span>
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  value={profileData.age}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#A8E6CE] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                  placeholder={t('Enter your age')}
                  required
                  min="16"
                  max="120"
                />
              </div>

              {/* Gender Input */}
              <div>
                <label htmlFor="gender" className="inline-block mb-2">
                  <span className="px-4 py-1 bg-[#C06C84] text-white font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    {t('Gender')} {/* Translate label */}
                  </span>
                </label>
                <input
                  id="gender"
                  type="text"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#FFDEAD] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                  placeholder={t('Enter your gender')}
                  required
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label htmlFor="phoneNumber" className="inline-block mb-2">
                  <span className="px-4 py-1 bg-[#A8E6CE] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                    {t('Phone Number')} {/* Translate label */}
                  </span>
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#F8B195] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                  placeholder={t('Enter your phone number')}
                  required
                />
              </div>


              {/* Conditional fields for 'work' user type */}
              {profileData.userType === 'work' && (
                <>
                  {/* Known Languages Input */}
                  <div>
                    <label htmlFor="knownLanguages" className="inline-block mb-2">
                      <span className="px-4 py-1 bg-[#C06C84] text-white font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                        {t('Known Languages (comma-separated)')} {/* Translate label */}
                      </span>
                    </label>
                    <input
                      id="knownLanguages"
                      type="text"
                      name="knownLanguages"
                      value={profileData.knownLanguages}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#FFDEAD] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                      placeholder={t('e.g., English, Spanish, French')}
                      required
                    />
                  </div>

                  {/* Talent Skills Input */}
                  <div>
                    <label htmlFor="talentSkills" className="inline-block mb-2">
                      <span className="px-4 py-1 bg-[#A8E6CE] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                        {t('Talent/Skills (comma-separated)')} {/* Translate label */}
                      </span>
                    </label>
                    <input
                      id="talentSkills"
                      type="text"
                      name="talentSkills"
                      value={profileData.talentSkills}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#F8B195] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
                      placeholder={t('e.g., Web Development, Graphic Design, Writing')}
                      required
                    />
                  </div>

                  {/* Job Experience Input */}
                  <div>
                    <label htmlFor="jobExperience" className="inline-block mb-2">
                      <span className="px-4 py-1 bg-[#FFDEAD] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                        {t('Job Experience')} {/* Translate label */}
                      </span>
                    </label>
                    <textarea
                      id="jobExperience"
                      name="jobExperience"
                      value={profileData.jobExperience}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#C06C84] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight resize-y bg-transparent"
                      placeholder={t('Tell us about your work experience...')}
                      required
                    />
                  </div>
                </>
              )}
            </>
          )}


          {/* Submit Button */}
          {profileData.userType && ( // Only show submit button if userType is selected
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-[#355C7D] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {/* Translate button text based on submitting state */}
                {submitting ? t('Saving Profile...') : t('Save Profile')}
              </button>
            </div>
          )}


          {/* Error and Success Messages */}
          {error && (
            <div className="mt-4 text-center text-red-600">
              <p>{error}</p> {/* Error messages are already translated */}
            </div>
          )}
          {successMessage && (
            <div className="mt-4 text-center text-green-600">
              <p>{successMessage}</p> {/* Success messages are already translated */}
            </div>
          )}

        </form>

      </div>
    </div>
  );
}

export default CompleteProfilePage;
