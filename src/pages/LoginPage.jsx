// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Assuming you have supabaseClient.js set up
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

function LoginPage() {
  const navigate = useNavigate();
  // Call the hook to get the translation function 't'
  const { t } = useTranslation();

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Effect to check if user is already logged in ---
  useEffect(() => {
    async function checkAuthAndRedirect() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // User is already logged in, check if profile exists
        const { data: profile, error: fetchProfileError } = await supabase
          .from('profiles')
          .select('id') // Only need the ID to check existence
          .eq('id', user.id)
          .single();

        if (profile) {
          // Profile exists, redirect to dashboard
          console.log('Login successful, profile exists. Redirecting to dashboard.');
          navigate('/dashboard'); // TODO: Replace with your actual dashboard route
        } else if (fetchProfileError && fetchProfileError.code === 'PGRST116') {
          // No profile found, redirect to complete profile page
          console.log('Login successful, no profile found. Redirecting to complete profile.');
          navigate('/complete-profile'); // Redirect to the complete profile page
        } else if (fetchProfileError) {
            // Handle other potential errors fetching profile
            console.error('Error checking profile existence:', fetchProfileError);
            setError(t('An error occurred while checking your profile.')); // Translate error message
        }
        // If no profile and no specific 'no rows found' error, stay on login page (shouldn't happen with RLS)
      }
      // If no user, stay on login page
    }

    checkAuthAndRedirect();

    // Optional: Listen for auth state changes (e.g., if user logs in on another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
         // User just logged in or session refreshed, check profile and redirect
         checkAuthAndRedirect();
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };

  }, [navigate, t]); // Added t to dependency array as it's used for error messages


  // --- Handler for Login Submission ---
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    setLoading(true);
    setError(null);

    try {
      // Attempt to sign in with email and password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        console.error('Supabase Sign In Error:', signInError);
        setError(t(signInError.message)); // Translate Supabase error message
        setLoading(false);
        return;
      }

      // If sign in is successful, data.user will contain the user object
      if (data && data.user) {
        const user = data.user;

        // Now, check if the user has a profile in the 'profiles' table
        const { data: profile, error: fetchProfileError } = await supabase
          .from('profiles')
          .select('id') // Select only the ID for efficiency, just checking existence
          .eq('id', user.id)
          .single(); // Use single() because we expect at most one profile per user ID

        if (profile) {
          // Profile exists, redirect to the dashboard
          console.log('Login successful, profile exists. Redirecting to dashboard.');
          navigate('/dashboard'); // TODO: Replace with your actual dashboard route
        } else if (fetchProfileError && fetchProfileError.code === 'PGRST116') {
          // Error code 'PGRST116' means "No rows found" - the profile doesn't exist
          console.log('Login successful, no profile found. Redirecting to complete profile.');
          navigate('/complete-profile'); // Redirect to the complete profile page
        } else if (fetchProfileError) {
            // Handle other potential errors fetching profile
            console.error('Error checking profile existence after login:', fetchProfileError);
            setError(t('An error occurred after login. Please try again.')); // Translate error message
            setLoading(false);
        }
         // If no profile and no specific 'no rows found' error, stay on login page (shouldn't happen with RLS)

      } else {
          // This case might occur if sign-in is technically successful but doesn't return a user object immediately
          // (less common for password sign-in, more for magic links before confirmation)
          // For password sign-in, an error is usually returned if unsuccessful.
          console.warn('Sign in did not return a user object.');
          setError(t('Sign in failed. Please check your credentials.')); // Translate fallback error
          setLoading(false);
      }


    } catch (error) {
      console.error('Unexpected Error during Login:', error);
      setError(t('An unexpected error occurred. Please try again.')); // Translate error message
      setLoading(false);
    }
  };

  // --- Render Method ---

  return (
    <div className="min-h-screen bg-[#fefef2] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Translate the page title */}
        <h1 className="text-3xl font-bold text-center text-[#355C7D] mb-8">
          {t('Log In')}
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="inline-block mb-2">
              <span className="px-4 py-1 bg-[#F8B195] text-gray-800 font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                {t('Email Address')} {/* Translate label */}
              </span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#A8E6CE] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
              placeholder={t('Enter your email')} 
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="inline-block mb-2">
               <span className="px-4 py-1 bg-[#C06C84] text-white font-semibold rounded-full shadow-sm inline-flex items-center justify-center cursor-pointer">
                {t('Password')} {/* Translate label */}
               </span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-[#FFDEAD] focus:outline-none text-gray-800 text-lg transition duration-200 ease-in-out appearance-none leading-tight bg-transparent"
              placeholder={t('Enter your password')}
              required
            />
          </div>

          {/* Login Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`py-3 px-8 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-[#355C7D] hover:bg-[#456C9D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#355C7D] transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {/* Translate button text based on loading state */}
              {loading ? t('Logging In...') : t('Log In')}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-center text-red-600">
              <p>{error}</p> {/* Error message is already translated */}
            </div>
          )}

        </form>

        {/* "Don't have an account?" link */}
        <div className="mt-6 text-center">
          <span className="text-gray-600">{t('Don\'t have an account?')} </span> {/* Translate text */}
          <Link to="/signup" className="text-[#60a09b] hover:underline font-semibold"> {/* TODO: Replace with your actual signup route */}
            {t('Sign Up')} {/* Translate link text */}
          </Link>
        </div>

         {/* Optional: Forgot password link */}
         {/* <div className="mt-2 text-center">
             <Link to="/auth/forgot-password" className="text-gray-600 hover:underline text-sm">
                 {t('Forgot Password?')} // Translate link text
             </Link>
         </div> */}

      </div>
    </div>
  );
}

export default LoginPage;
