// src/pages/EditProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Assuming you have supabaseClient.js set up
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

function EditProfilePage() {
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
    userType: null, // User type is usually not editable after creation
  });

  // State to manage UI state
  const [loading, setLoading] = useState(true); // Loading state for initial data fetch
  const [submitting, setSubmitting] = useState(false); // Loading state specifically for form submission
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null); // To store the authenticated user object

  // --- Effect to check authentication and fetch existing profile data ---
  useEffect(() => {
    async function fetchUserAndProfile() {
      setLoading(true);
      setError(null);

      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error('No authenticated user:', authError);
        // If no user is logged in, redirect to login
        navigate('/auth/login'); // TODO: Ensure this is your correct login route
        return;
      }

      setUser(user);

      // Fetch the user's existing profile data
      const { data: profile, error: fetchProfileError } = await supabase
        .from('profiles')
        .select('*') // Select all columns for the profile
        .eq('id', user.id) // Fetch the profile matching the authenticated user's ID
        .single(); // Expecting zero or one profile per user

      if (fetchProfileError) {
        console.error('Error fetching profile for editing:', fetchProfileError);
        setError(t('Failed to load profile data for editing.')); // Translate error message
        setLoading(false);
        // If profile doesn't exist or fetch fails, maybe redirect back to dashboard or complete profile
        navigate('/dashboard'); // Or '/complete-profile' if you want them to create it
        return;
      }

      if (profile) {
        // Profile found, populate the form state
        setProfileData({
            fullName: profile.full_name || '',
            nationality: profile.nationality || '',
            // Convert array back to comma-separated string for the input field
            knownLanguages: profile.known_languages?.join(', ') || '',
            // photo: null, // Photo handling is separate
            age: profile.age || '',
            gender: profile.gender || '',
            // Convert array back to comma-separated string for the input field
            talentSkills: profile.talent_skills?.join(', ') || '',
            jobExperience: profile.job_experience || '',
            phoneNumber: profile.phone_number || '',
            userType: profile.user_type || null, // Assuming userType is fetched but not editable
        });
        setLoading(false);
      } else {
          // Should not happen if fetchProfileError is handled, but as a fallback
          setError(t('Profile not found.')); // Translate error message
          setLoading(false);
          navigate('/complete-profile'); // Redirect to complete profile if not found
      }
    }

    fetchUserAndProfile();

    // Listen for auth state changes (optional, similar to Dashboard)
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

  // --- Handler for Profile Form Submission (Update) ---
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
      // Conditional validation for job seeker fields
      if (profileData.userType === 'work' && (!profileData.talentSkills || !profileData.jobExperience || !profileData.knownLanguages)) {
          setError(t('Please fill out all required job seeker profile fields.')); // Translate error message
          return;
      }


    setSubmitting(true); // Use submitting state for form specific loading
    setError(null);
    setSuccessMessage(null);

    try {
      // Prepare profile data for update
      const profileToUpdate = {
          // Do NOT update the 'id' or 'user_type' here if they are not editable
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
          // updated_at will be handled by database triggers
      };

      // Update profile data in the 'profiles' table
      // RLS policy for UPDATE should allow this since user is authenticated and id matches
      const { error: updateError } = await supabase
        .from('profiles')
        .update(profileToUpdate)
        .eq('id', user.id); // Specify which row to update (the authenticated user's profile)

      if (updateError) {
        console.error('Supabase Profile Update Error:', updateError);
        setError(t(updateError.message)); // Translate error message (Supabase provides messages)
        setSubmitting(false);
        return;
      }

      setSuccessMessage(t('Profile updated successfully!')); // Translate success message
      setSubmitting(false);

      // Optionally redirect back to dashboard after successful update
      setTimeout(() => {
        navigate('/dashboard'); // TODO: Replace with your actual dashboard route
      }, 2000); // Redirect after 2 seconds

    } catch (error) {
      console.error('Unexpected Error during Profile Update:', error);
      setError(t('An unexpected error occurred during profile update. Please try again.')); // Translate error message
      setSubmitting(false);
    }
  };

  // --- Render Method ---

  // Show a loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fefef2] flex items-center justify-center">
        <p className="text-xl font-semibold text-[#355C7D]">{t('Loading profile for editing...')}</p> {/* Translate loading text */}
      </div>
    );
  }

  // Render the edit profile form
  return (
    <div className="min-h-screen bg-[#fefef2] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Translate the page title */}
        <h1 className="text-3xl font-bold text-center text-[#355C7D] mb-8">
          {t('Edit Your Profile')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Display User Type (Not editable) */}
          {profileData.userType && (
              <div>
                  <label className="inline-block mb-2">
                      <span className="px-4 py-1 bg-gray-300 text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center">
                         {t('User Type')} {/* Translate label */}
                      </span>
                  </label>
                   <p className="text-lg text-gray-700 mt-1">
                       {profileData.userType === 'hire' ? t('Hiring') : t('Working')} {/* Translate display value */}
                   </p>
              </div>
          )}


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


          {/* Submit Button */}
          <div className="flex justify-end pt-4">
              <button
                  type="submit"
                  disabled={submitting}
                  className={`py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-[#355C7D] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                  {/* Translate button text based on submitting state */}
                  {submitting ? t('Saving Profile...') : t('Save Changes')} {/* Translated button text */}
              </button>
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

      </div>
    </div>
  );
}

export default EditProfilePage;
