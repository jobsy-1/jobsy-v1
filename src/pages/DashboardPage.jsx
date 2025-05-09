import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Assuming you have supabaseClient.js set up
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  // State to hold user and profile data
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // State for UI feedback
  const [loading, setLoading] = useState(true); // Loading state for initial data fetch
  const [error, setError] = useState(null);

  // --- Effect to check authentication and fetch profile ---
  useEffect(() => {
    async function fetchUserAndProfile() {
      setLoading(true);
      setError(null);

      // 1. Check for authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error('No authenticated user:', authError);
        // If no user, redirect to login page
        navigate('/auth/login'); // TODO: Ensure this is your correct login route
        return; // Stop execution if no user
      }

      setUser(user);

      // 2. Fetch the user's profile data
      const { data: profileData, error: fetchProfileError } = await supabase
        .from('profiles')
        .select('*') // Select all columns for the profile
        .eq('id', user.id) // Fetch the profile matching the authenticated user's ID
        .single(); // Expecting zero or one profile per user

      if (fetchProfileError && fetchProfileError.code !== 'PGRST116') { // PGRST116 means 'no rows found'
        console.error('Error fetching profile:', fetchProfileError);
        setError('Failed to load profile data.');
        setLoading(false);
        // Decide how to handle this - maybe redirect to complete profile page?
        // navigate('/complete-profile'); // Optional: Redirect if profile fetch fails unexpectedly
        return;
      }

      if (!profileData) {
          // User is authenticated but has no profile - redirect to complete profile page
          console.warn('Authenticated user has no profile. Redirecting to complete profile.');
          navigate('/complete-profile'); // Redirect to the complete profile page
          return; // Stop execution
      }

      // Profile found successfully
      setProfile(profileData);
      setLoading(false);
    }

    fetchUserAndProfile();

    // Listen for auth state changes (e.g., if user logs out on another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        // User logged out
        navigate('/auth/login'); // TODO: Ensure this is your correct login route
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]); // Rerun effect if navigate changes

  // --- Handler for Logout ---
  const handleLogout = async () => {
    setLoading(true); // Show loading while logging out
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error);
      setError('Failed to log out.');
      setLoading(false);
    } else {
      // Redirect to login page after successful logout
      navigate('/auth/login'); // TODO: Ensure this is your correct login route
    }
  };


  // --- Render Method ---

  // Show a loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fefef2] flex items-center justify-center">
        <p className="text-xl font-semibold text-[#355C7D]">Loading dashboard...</p>
      </div>
    );
  }

  // Show error message if fetching failed (and didn't redirect)
  if (error) {
      return (
          <div className="min-h-screen bg-[#fefef2] flex flex-col items-center justify-center p-6">
              <div className="w-full max-w-md text-center text-red-600">
                  <p>{error}</p>
                  <button
                      onClick={handleLogout}
                      className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                      Logout
                  </button>
              </div>
          </div>
      );
  }

  // Render the dashboard content if user and profile are loaded
  return (
    <div className="min-h-screen bg-[#fefef2] flex flex-col items-center p-6">
      <div className="w-full max-w-2xl"> {/* Increased max-width for dashboard content */}

        {/* Header with Welcome and Logout */}
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#355C7D]">
               Welcome, {profile?.full_name || 'User'}!
            </h1>
             <button
                 onClick={handleLogout}
                 className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C06C84] hover:bg-[#D07C94] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C06C84]"
             >
                 Logout
             </button>
        </div>


        {/* Section 1: Welcome / Coming Soon */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-[#F8B195]">
          <h2 className="text-2xl font-semibold text-[#355C7D] mb-4">Updates & Contact</h2>
          <p className="text-gray-700 mb-4">
            Thanks for registering! Our platform is currently under development, with exciting features coming soon.
          </p>
           <p className="text-gray-700 mb-4">
               We will contact you via your provided phone number for any relevant job opportunities (if you are a job seeker).
           </p>
          <p className="text-gray-700">
            If you are looking to hire people manually or have immediate inquiries, please feel free to contact us directly.
            <br/>
            {/* TODO: Add actual contact information here */}
            Contact Info: <span className="font-semibold text-[#60a09b]"> [Your Contact Email/Phone]</span>
          </p>
        </div>

        {/* Section 2: Google Form Link */}
         <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-[#A8E6CE]">
             <h2 className="text-2xl font-semibold text-[#355C7D] mb-4">Help Us Improve</h2>
             <p className="text-gray-700 mb-4">
                 Please take a moment to provide us with valuable feedback by filling out this short form:
             </p>
             <div className="text-center">
                 <a
                     href="YOUR_GOOGLE_FORM_LINK" // TODO: Replace with your actual Google Form link
                     target="_blank" // Open in a new tab
                     rel="noopener noreferrer" // Recommended for security when using target="_blank"
                     className="inline-block py-3 px-8 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-[#60a09b] hover:bg-[#70b0ab] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#60a09b] transition duration-200 ease-in-out"
                 >
                     Fill Out Form
                 </a>
             </div>
         </div>


        {/* Section 3: Profile Information */}
         <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-[#FFDEAD]">
             <h2 className="text-2xl font-semibold text-[#355C7D] mb-4">Your Profile Information</h2>
             {profile ? (
                 <div className="text-gray-700 space-y-2">
                     <p><span className="font-semibold">User Type:</span> {profile.user_type}</p>
                     <p><span className="font-semibold">Full Name:</span> {profile.full_name}</p>
                     <p><span className="font-semibold">Nationality:</span> {profile.nationality}</p>
                     <p><span className="font-semibold">Age:</span> {profile.age}</p>
                     <p><span className="font-semibold">Gender:</span> {profile.gender}</p>
                     <p><span className="font-semibold">Phone Number:</span> {profile.phone_number}</p>

                     {/* Display these fields only if userType is 'work' */}
                     {profile.user_type === 'work' && (
                         <>
                             <p><span className="font-semibold">Known Languages:</span> {profile.known_languages?.join(', ') || 'N/A'}</p> {/* Join array for display */}
                             <p><span className="font-semibold">Talent/Skills:</span> {profile.talent_skills?.join(', ') || 'N/A'}</p> {/* Join array for display */}
                             <p><span className="font-semibold">Job Experience:</span> {profile.job_experience || 'N/A'}</p>
                         </>
                     )}

                     {/* TODO: Add Edit Profile Button */}
                     {/* <div className="mt-4">
                          <button
                              onClick={() => navigate('/edit-profile')} // TODO: Create an edit profile page
                              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#355C7D] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D]"
                          >
                              Edit Profile
                          </button>
                     </div> */}
                 </div>
             ) : (
                 <p className="text-gray-700">Profile data not available.</p>
             )}
         </div>

         {/* Optional: Add other dashboard sections here */}


      </div>
    </div>
  );
}

export default DashboardPage;
