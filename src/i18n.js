// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// --- Translation Resources ---
// This is where you'll store your translations for each language.
// Added all the strings used with t() in the components so far, including EditProfilePage.
const resources = {
  en: { // English translations
    translation: { // 'translation' is the default namespace
      // From Header.jsx
      "Jobsy": "Jobsy",
      "About": "About", // Changed from "About Us" to match Header link text
      "Contact": "Contact", // Changed from "Contact Us" to match Header link text
      "Why Jobsy?": "Why Jobsy?",
      "Work Fun": "Work Fun",
      "Get Started": "Get Started",
      "Arabic": "Arabic", // For flag title
      "Kurdish": "Kurdish", // For flag title
      "English": "English", // For flag title
      "Arabic Flag": "Arabic Flag", // For flag alt text
      "Kurdish Flag": "Kurdish Flag", // For flag alt text
      "English Flag": "English Flag", // For flag alt text


      // From HeroSection.jsx
      "Where Talent Meets Opportunity.": "Where Talent Meets Opportunity.",
      "Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.": "Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.",
      "Learn More": "Learn More",
      "Jobsy Hero Image": "Jobsy Hero Image", // Example alt text translation
      "Find your next freelance opportunity or the perfect freelancer for your project.": "Find your next freelance opportunity or the perfect freelancer for your project.",
      "Jobsy connects talent and employers faster than ever. Post jobs or find your dream role with ease.": "Jobsy connects talent and employers faster than ever. Post jobs or find your dream role with ease.",
      "Globally Fast": "Globally Fast",
      "Unmatched speeds and low latency worldwide.": "Unmatched speeds and low latency worldwide.",
      "Natively Intelligent": "Natively Intelligent",
      "Built-in intelligence that handles unwanted calls and admin.": "Built-in intelligence that handles unwanted calls and admin.",
      "Always Connected": "Always Connected",
      "Uninterrupted coverage from joint cellular and satellite network.": "Uninterrupted coverage from joint cellular and satellite network.",


      // From WorkThatFeelsFunSection.jsx
      "Work that feels fun": "Work that feels fun",
      "Explore a colorful world of job opportunities across various fields.": "Explore a colorful world of job opportunities across various fields.",

      // From FloatingTag.jsx (These are the tag labels)
      "🧑‍🎨 Designer": "🧑‍🎨 Designer",
      "💻 Developer": "💻 Developer",
      "✍️ Writer": "✍️ Writer",
      "📈 Marketer": "📈 Marketer",
      "🎥 Video Editor": "🎥 Video Editor",
      "🧑‍💼 Assistant": "🧑‍💼 Assistant",
      "📊 Data Analyst": "📊 Data Analyst",
      "📱 Mobile Dev": "📱 Mobile Dev",

      // From AboutUsSection.jsx
      "About Jobsy": "About Jobsy",
      "Jobsy is a platform dedicated to connecting talented freelancers with amazing opportunities. Our mission is to make finding work and hiring talent faster, easier, and more enjoyable. We believe in empowering individuals and businesses to achieve their goals through seamless connections.": "Jobsy is a platform dedicated to connecting talented freelancers with amazing opportunities. Our mission is to make finding work and hiring talent faster, easier, and more enjoyable. We believe in empowering individuals and businesses to achieve their goals through seamless connections.",

      // From ContactSection.jsx
      "Get In Touch": "Get In Touch",
      "Have questions or feedback? We'd love to hear from you!": "Have questions or feedback? We'd love to hear from you!",
      "Email": "Email", // Changed from "Email Address" to match Contact section text

      // From SignUpPage.jsx
      "Sign Up": "Sign Up",
      "Step {{currentStep}} of 4": "Step {{currentStep}} of 4", // Step indicator with interpolation
      "Email Address": "Email Address",
      "Password": "Password",
      "Enter your email": "Enter your email",
      "Create a password": "Create a password",
      "Terms and Conditions": "Terms and Conditions",
      "I agree to the": "I agree to the",
      "Choose Your Path": "Choose Your Path",
      "I want to Hire People": "I want to Hire People",
      "I want to Find a Job": "I want to Find a Job",
      "Complete Registration": "Complete Registration", // Final step title
      "Click \"Complete Registration\" to create your account.": "Click \"Complete Registration\" to create your account.", // Final step paragraph
      "You will receive an email to verify your address before you can log in and complete your profile.": "You will receive an email to verify your address before you can log in and complete your profile.", // Final step paragraph
      "Next": "Next",
      "Back": "Back",
      "Registering...": "Registering...", // Submit button loading text
      "Already have an account?": "Already have an account?",
      "Please enter a valid email address.": "Please enter a valid email address.", // Validation error
      "Password must be at least 6 characters long.": "Password must be at least 6 characters long.", // Validation error


      // From CompleteProfilePage.jsx (Profile Setup)
      "Loading profile...": "Loading profile...", // Loading text
      "Failed to load profile data.": "Failed to load profile data.", // Error message
      "Profile already complete. Redirecting...": "Profile already complete. Redirecting...", // Success message
      "Complete Your Profile ({{userType}})": "Complete Your Profile ({{userType}})", // Title with interpolation
      "Hiring": "Hiring", // User type display
      "Working": "Working", // User type display
      "Select Type": "Select Type", // User type fallback/prompt
      "What do you want to do?": "What do you want to do?", // User type selection prompt
      "Full Name": "Full Name",
      "Nationality": "Nationality",
      "Age": "Age",
      "Gender": "Gender",
      "Phone Number": "Phone Number",
      "Known Languages (comma-separated)": "Known Languages (comma-separated)", // Label
      "e.g., English, Spanish, French": "e.g., English, Spanish, French", // Placeholder
      "Talent/Skills (comma-separated)": "Talent/Skills (comma-separated)", // Label
      "e.g., Web Development, Graphic Design, Writing": "e.g., Web Development, Graphic Design, Writing", // Placeholder
      "Job Experience": "Job Experience",
      "Tell us about your work experience...": "Tell us about your work experience...", // Placeholder
      "Save Profile": "Save Profile", // Submit button text
      "Saving Profile...": "Saving Profile...", // Submit button loading text
      "User not authenticated.": "User not authenticated.", // Error message
      "Please fill out all required profile fields.": "Please fill out all required profile fields.", // Error message
      "Please fill out all required job seeker profile fields.": "Please fill out all required job seeker profile fields.", // Error message
      "User type is missing. Please select your user type.": "User type is missing. Please select your user type.", // Error message
      "Profile created successfully!": "Profile created successfully!", // Success message


      // From LoginPage.jsx
      "Log In": "Log In", // Page title and button text
      "Enter your email": "Enter your email", // Placeholder
      "Enter your password": "Enter your password", // Placeholder
      "Logging In...": "Logging In...", // Button loading text
      "An error occurred while checking your profile.": "An error occurred while checking your profile.", // Error message
      "Failed to log out.": "Failed to log out.", // Error message
      "An error occurred after login. Please try again.": "An error occurred after login. Please try again.", // Error message
      "Sign in failed. Please check your credentials.": "Sign in failed. Please check your credentials.", // Error message
      "Don't have an account?": "Don't have an account?", // Text before link


      // From DashboardPage.jsx
      "Loading dashboard...": "Loading dashboard...", // Loading text
      "Welcome, {{name}}!": "Welcome, {{name}}!", // Welcome message with interpolation
      "User": "User", // Fallback name in welcome message
      "Logout": "Logout", // Button text
      "Updates & Contact": "Updates & Contact", // Section title
      "Thanks for registering! Our platform is currently under development, with exciting features coming soon.": "Thanks for registering! Our platform is currently under development, with exciting features coming soon.", // Paragraph
      "We will contact you via your provided phone number for any relevant job opportunities (if you are a job seeker).": "We will contact you via your provided phone number for any relevant job opportunities (if you are a job seeker).", // Paragraph
      "If you are looking to hire people manually or have immediate inquiries, please feel free to contact us directly.": "If you are looking to hire people manually or have immediate inquiries, please feel free to contact us directly.", // Paragraph
      "Contact Info": "Contact Info", // Label
      "Help Us Improve": "Help Us Improve", // Section title
      "Please take a moment to provide us with valuable feedback by filling out this short form:": "Please take a moment to provide us with valuable feedback by filling out this short form:", // Paragraph
      "Fill Out Form": "Fill Out Form", // Button text
      "Your Profile Information": "Your Profile Information", // Section title
      "User Type": "User Type", // Profile label
      "Full Name": "Full Name", // Profile label
      "Nationality": "Nationality", // Profile label
      "Age": "Age", // Profile label
      "Gender": "Gender", // Profile label
      "Phone Number": "Phone Number", // Profile label
      "Known Languages": "Known Languages", // Profile label (simpler key for display)
      "Talent/Skills": "Talent/Skills", // Profile label (simpler key for display)
      "Job Experience": "Job Experience", // Profile label
      "N/A": "N/A", // Display text for missing data
      "Profile data not available.": "Profile data not available.", // Message when profile fetch fails
      "Edit Profile": "Edit Profile", // Button text

      // From EditProfilePage.jsx (New strings)
      "Loading profile for editing...": "Loading profile for editing...", // Loading text
      "Failed to load profile data for editing.": "Failed to load profile data for editing.", // Error message
      "Profile not found.": "Profile not found.", // Error message
      "Edit Your Profile": "Edit Your Profile", // Page title
      "Save Changes": "Save Changes", // Submit button text
      "An unexpected error occurred during profile update. Please try again.": "An unexpected error occurred during profile update. Please try again.", // Error message
      "Profile updated successfully!": "Profile updated successfully!", // Success message


      // Common Supabase Auth/Database Error Messages (Translate these for better user experience)
      "Invalid login credentials": "Invalid login credentials",
      "Email not confirmed": "Email not confirmed",
      "User already registered": "User already registered",
      // Add other common Supabase error messages you might encounter
    }
  },
  ar: { // Arabic translations
    translation: {
      // Provide Arabic translations for all the keys above
      "Jobsy": "جوبسي",
      "About": "من نحن",
      "Contact": "اتصل بنا",
      "Why Jobsy?": "لماذا جوبسي؟",
      "Work Fun": "عمل ممتع",
      "Get Started": "ابدأ الآن",
      "Arabic": "العربية",
      "Kurdish": "الكردية",
      "English": "الإنجليزية",
      "Arabic Flag": "علم العربية",
      "Kurdish Flag": "علم الكردية",
      "English Flag": "علم الإنجليزية",

      "Where Talent Meets Opportunity.": "حيث تلتقي المواهب بالفرص.",
      "Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.": "ابحث عن فرصتك المستقلة التالية أو عن المستقل المثالي لمشروعك. جوبسي يربط بين المواهب وأصحاب العمل أسرع من أي وقت مضى.",
      "Learn More": "تعلم المزيد",
      "Jobsy Hero Image": "صورة بطل جوبسي",
      "Find your next freelance opportunity or the perfect freelancer for your project.": "ابحث عن فرصتك المستقلة التالية أو عن المستقل المثالي لمشروعك.",
      "Jobsy connects talent and employers faster than ever. Post jobs or find your dream role with ease.": "جوبسي يربط بين المواهب وأصحاب العمل أسرع من أي وقت مضى. انشر الوظائف أو ابحث عن دور أحلامك بسهولة.",
      "Globally Fast": "سريع عالمياً",
      "Unmatched speeds and low latency worldwide.": "سرعات لا مثيل لها وزمن استجابة منخفض في جميع أنحاء العالم.",
      "Natively Intelligent": "ذكي بطبيعته",
      "Built-in intelligence that handles unwanted calls and admin.": "ذكاء مدمج يتعامل مع المكالمات غير المرغوب فيها والإدارة.",
      "Always Connected": "متصل دائماً",
      "Uninterrupted coverage from joint cellular and satellite network.": "تغطية غير منقطعة من شبكة خلوية وقمر صناعي مشتركة.",


      "Work that feels fun": "عمل ممتع",
      "Explore a colorful world of job opportunities across various fields.": "استكشف عالمًا ملونًا من فرص العمل في مختلف المجالات.",

      "🧑‍🎨 Designer": "🧑‍🎨 مصمم",
      "💻 Developer": "💻 مطور",
      "✍️ Writer": "✍️ كاتب",
      "📈 Marketer": "📈 مسوق",
      "🎥 Video Editor": "🎥 محرر فيديو",
      "🧑‍💼 Assistant": "🧑‍💼 مساعد",
      "📊 Data Analyst": "📊 محلل بيانات",
      "📱 Mobile Dev": "📱 مطور تطبيقات جوال",

      "About Jobsy": "عن جوبسي",
      "Jobsy is a platform dedicated to connecting talented freelancers with amazing opportunities. Our mission is to make finding work and hiring talent faster, easier, and more enjoyable. We believe in empowering individuals and businesses to achieve their goals through seamless connections.": "جوبسي هي منصة مخصصة لربط المستقلين الموهوبين بفرص مذهلة. مهمتنا هي جعل العثور على عمل وتوظيف المواهب أسرع وأسهل وأكثر متعة. نؤمن بتمكين الأفراد والشركات لتحقيق أهدافهم من خلال اتصالات سلسة.",

      "Get In Touch": "تواصل معنا",
      "Have questions or feedback? We'd love to hear from you!": "هل لديك أسئلة أو ملاحظات؟ يسعدنا أن نسمع منك!",
      "Email": "البريد الإلكتروني",

      "Sign Up": "التسجيل",
      "Step {{currentStep}} of 4": "الخطوة {{currentStep}} من 4",
      "Email Address": "البريد الإلكتروني",
      "Password": "كلمة المرور",
      "Enter your email": "أدخل بريدك الإلكتروني",
      "Create a password": "أنشئ كلمة مرور",
      "Terms and Conditions": "الشروط والأحكام",
      "I agree to the": "أوافق على",
      "Choose Your Path": "اختر مسارك",
      "I want to Hire People": "أريد توظيف أشخاص",
      "I want to Find a Job": "أريد البحث عن وظيفة",
      "Complete Registration": "إكمال التسجيل",
      "Click \"Complete Registration\" to create your account.": "انقر على \"إكمال التسجيل\" لإنشاء حسابك.",
      "You will receive an email to verify your address before you can log in and complete your profile.": "ستتلقى رسالة بريد إلكتروني لتأكيد عنوانك قبل أن تتمكن من تسجيل الدخول وإكمال ملفك الشخصي.",
      "Next": "التالي",
      "Back": "السابق",
      "Registering...": "جاري التسجيل...",
      "Already have an account?": "هل لديك حساب بالفعل؟",
      "Please enter a valid email address.": "الرجاء إدخال عنوان بريد إلكتروني صالح.",
      "Password must be at least 6 characters long.": "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",

      "Loading profile...": "جاري تحميل الملف الشخصي...",
      "Failed to load profile data.": "فشل تحميل بيانات الملف الشخصي.",
      "Profile already complete. Redirecting...": "الملف الشخصي مكتمل بالفعل. جاري إعادة التوجيه...",
      "Complete Your Profile ({{userType}})": "إكمال ملفك الشخصي ({{userType}})",
      "Hiring": "للتوظيف",
      "Working": "للعمل",
      "Select Type": "اختر النوع",
      "What do you want to do?": "ماذا تريد أن تفعل؟",
      "Full Name": "الاسم الكامل",
      "Nationality": "الجنسية",
      "Age": "العمر",
      "Gender": "الجنس",
      "Phone Number": "رقم الهاتف",
      "Known Languages (comma-separated)": "اللغات المعروفة (مفصولة بفاصلة)",
      "e.g., English, Spanish, French": "مثال: الإنجليزية، الإسبانية، الفرنسية",
      "Talent/Skills (comma-separated)": "المواهب/المهارات (مفصولة بفاصلة)",
      "e.g., Web Development, Graphic Design, Writing": "مثال: تطوير الويب، تصميم الجرافيك، الكتابة",
      "Job Experience": "الخبرة العملية",
      "Tell us about your work experience...": "أخبرنا عن خبرتك العملية...",
      "Save Profile": "حفظ الملف الشخصي",
      "Saving Profile...": "جاري حفظ الملف الشخصي...",
      "User not authenticated.": "المستخدم غير مصادق عليه.",
      "Please fill out all required profile fields.": "الرجاء ملء جميع حقول الملف الشخصي المطلوبة.",
      "Please fill out all required job seeker profile fields.": "الرجاء ملء جميع حقول الملف الشخصي المطلوبة للباحثين عن عمل.",
      "User type is missing. Please select your user type.": "نوع المستخدم مفقود. الرجاء اختيار نوع المستخدم الخاص بك.",
      "Profile created successfully!": "تم إنشاء الملف الشخصي بنجاح!",

      "Log In": "تسجيل الدخول",
      "Enter your email": "أدخل بريدك الإلكتروني",
      "Enter your password": "أدخل كلمة المرور",
      "Logging In...": "جاري تسجيل الدخول...",
      "An error occurred while checking your profile.": "حدث خطأ أثناء التحقق من ملفك الشخصي.",
      "Failed to log out.": "فشل تسجيل الخروج.",
      "An error occurred after login. Please try again.": "حدث خطأ بعد تسجيل الدخول. الرجاء المحاولة مرة أخرى.",
      "Sign in failed. Please check your credentials.": "فشل تسجيل الدخول. الرجاء التحقق من بيانات الاعتماد الخاصة بك.",
      "Don't have an account?": "ليس لديك حساب؟",

      "Loading dashboard...": "جاري تحميل لوحة التحكم...",
      "Welcome, {{name}}!": "مرحباً بك، {{name}}!",
      "User": "مستخدم",
      "Logout": "تسجيل الخروج",
      "Updates & Contact": "التحديثات والاتصال",
      "Thanks for registering! Our platform is currently under development, with exciting features coming soon.": "شكراً لتسجيلك! منصتنا قيد التطوير حالياً، مع ميزات مثيرة قادمة قريباً.",
      "We will contact you via your provided phone number for any relevant job opportunities (if you are a job seeker).": "سنتواصل معك عبر رقم هاتفك المقدم لأي فرص عمل ذات صلة (إذا كنت باحثاً عن عمل).",
      "If you are looking to hire people manually or have immediate inquiries, please feel free to contact us directly.": "إذا كنت تبحث عن توظيف أشخاص يدوياً أو لديك استفسارات عاجلة، فلا تتردد في الاتصال بنا مباشرة.",
      "Contact Info": "معلومات الاتصال",
      "Help Us Improve": "ساعدنا على التحسين",
      "Please take a moment to provide us with valuable feedback by filling out this short form:": "الرجاء تخصيص لحظة لتقديم ملاحظات قيمة لنا عن طريق ملء هذا النموذج القصير:",
      "Fill Out Form": "املأ النموذج",
      "Your Profile Information": "معلومات ملفك الشخصي",
      "User Type": "نوع المستخدم",
      "Full Name": "الاسم الكامل",
      "Nationality": "الجنسية",
      "Age": "العمر",
      "Gender": "الجنس",
      "Phone Number": "رقم الهاتف",
      "Known Languages": "اللغات المعروفة",
      "Talent/Skills": "المواهب/المهارات",
      "Job Experience": "الخبرة العملية",
      "N/A": "غير متوفر",
      "Profile data not available.": "بيانات الملف الشخصي غير متوفرة.",
      "Edit Profile": "تعديل الملف الشخصي",

      "Loading profile for editing...": "جاري تحميل الملف الشخصي للتعديل...",
      "Failed to load profile data for editing.": "فشل تحميل بيانات الملف الشخصي للتعديل.",
      "Profile not found.": "الملف الشخصي غير موجود.",
      "Edit Your Profile": "تعديل ملفك الشخصي",
      "Save Changes": "حفظ التغييرات",
      "An unexpected error occurred during profile update. Please try again.": "حدث خطأ غير متوقع أثناء تحديث الملف الشخصي. الرجاء المحاولة مرة أخرى.",
      "Profile updated successfully!": "تم تحديث الملف الشخصي بنجاح!",


      "Invalid login credentials": "بيانات تسجيل الدخول غير صالحة",
      "Email not confirmed": "البريد الإلكتروني غير مؤكد",
      "User already registered": "المستخدم مسجل بالفعل",
    }
  },
  ku: { // Kurdish translations (Sorani dialect example)
    translation: {
      // Provide Kurdish translations for all the keys above
      "Jobsy": "جۆبسی",
      "About": "دەربارە",
      "Contact": "پەیوەندی",
      "Why Jobsy?": "بۆچی جۆبسی؟",
      "Work Fun": "کاری خۆش",
      "Get Started": "دەستپێبکە",
      "Arabic": "عەرەبی",
      "Kurdish": "کوردی",
      "English": "ئینگلیزی",
      "Arabic Flag": "ئاڵای عەرەبی",
      "Kurdish Flag": "ئاڵای کوردی",
      "English Flag": "ئاڵای ئینگلیزی",

      "Where Talent Meets Opportunity.": "شوێنێک کە بەهرە و دەرفەت بەیەک دەگەن.",
      "Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.": "دەرفەتی کاری سەربەخۆی داهاتووت یان سەربەخۆی گونجاو بۆ پڕۆژەکەت بدۆزەرەوە. جۆبسی بەهرەمەندەکان و خاوەنکارەکان زووتر لە جاران پێکەوە دەبەستێتەوە.",
      "Learn More": "زیاتر بزانە",
      "Jobsy Hero Image": "وێنەی پاڵەوانی جۆبسی",
      "Find your next freelance opportunity or the perfect freelancer for your project.": "دەرفەتی کاری سەربەخۆی داهاتووت یان سەربەخۆی گونجاو بۆ پڕۆژەکەت بدۆزەرەوە.",
      "Jobsy connects talent and employers faster than ever. Post jobs or find your dream role with ease.": "جۆبسی بەهرەمەندەکان و خاوەنکارەکان زووتر لە جاران پێکەوە دەبەستێتەوە. کار بڵاو بکەرەوە یان ڕۆڵی خەونەکانت بە ئاسانی بدۆزەرەوە.",
      "Globally Fast": "خێرا لە جیهاندا",
      "Unmatched speeds and low latency worldwide.": "خێرایی بێ وێنە و کەمترین دواکەوتن لە سەرانسەری جیهاندا.",
      "Natively Intelligent": "زیرەک بە بنەڕەت",
      "Built-in intelligence that handles unwanted calls and admin.": "زیرەکی ناوەکی کە پەیوەندییە نەویستراوەکان و کارگێڕی بەڕێوە دەبات.",
      "Always Connected": "هەمیشە بەستراوەتەوە",
      "Uninterrupted coverage from joint cellular and satellite network.": "داپۆشینی بێ پچڕان لە تۆڕی خانەیی و مانگی دەستکردی هاوبەشەوە.",


      "Work that feels fun": "کارێک کە هەستی خۆشی پێبکەیت",
      "Explore a colorful world of job opportunities across various fields.": "جیهانێکی ڕەنگاوڕەنگی هەلی کار لە بوارە جیاوازەکاندا بگەڕێ.",

      "🧑‍🎨 Designer": "🧑‍🎨 دیزاینەر",
      "💻 Developer": "💻 پەرەپێدەر",
      "✍️ Writer": "✍️ نووسەر",
      "📈 Marketer": "📈 مارکێتەر",
      "🎥 Video Editor": "🎥 مۆنتاژکار",
      "🧑‍💼 Assistant": "🧑‍💼 یاریدەدەر",
      "📊 Data Analyst": "📊 شیکەرەوەی داتا",
      "📱 Mobile Dev": "📱 پەرەپێدەری مۆبایل",

      "About Jobsy": "دەربارەی جۆبسی",
      "Jobsy is a platform dedicated to connecting talented freelancers with amazing opportunities. Our mission is to make finding work and hiring talent faster, easier, and more enjoyable. We believe in empowering individuals and businesses to achieve their goals through seamless connections.": "جۆبسی پلاتفۆرمێکە تایبەتە بە بەستنەوەی سەربەخۆ بەهرەمەندەکان بە دەرفەتی ناوازەوە. ئەرکی ئێمە ئەوەیە دۆزینەوەی کار و دامەزراندنی بەهرەمەندەکان خێراتر، ئاسانتر و خۆشتر بکەین. ئێمە باوەڕمان بە بەهێزکردنی تاکەکان و بزنسەکان هەیە بۆ گەیشتن بە ئامانجەکانیان لە ڕێگەی پەیوەندییە بێ کێشەکانەوە.",

      "Get In Touch": "پەیوەندی بگرە",
      "Have questions or feedback? We'd love to hear from you!": "پرسیار یان سەرنجت هەیە؟ حەزمان لێیە گوێبیستت بین!",
      "Email": "ئیمەیڵ",

      "Sign Up": "تۆمارکردن",
      "Step {{currentStep}} of 4": "هەنگاوی {{currentStep}} لە 4",
      "Email Address": "ناونیشانی ئیمەیڵ",
      "Password": "وشەی نهێنی",
      "Enter your email": "ئیمەیڵەکەت بنووسە",
      "Create a password": "وشەی نهێنی دروست بکە",
      "Terms and Conditions": "مەرج و ڕێساکان",
      "I agree to the": "من ڕازیم بە",
      "Choose Your Path": "ڕێگاکەت هەڵبژێرە",
      "I want to Hire People": "دەمەوێت خەڵک دامەزرێنم",
      "I want to Find a Job": "دەمەوێت کار بدۆزمەوە",
      "Complete Registration": "تۆمارکردنی تەواو",
      "Click \"Complete Registration\" to create your account.": "کلیک لە \"تۆمارکردنی تەواو\" بکە بۆ دروستکردنی هەژمارەکەت.",
      "You will receive an email to verify your address before you can log in and complete your profile.": "ئیمەیڵێکت بۆ دێت بۆ پشتڕاستکردنەوەی ناونیشانەکەت پێش ئەوەی بچیتە ژوورەوە و پڕۆفایلەکەت تەواو بکەیت.",
      "Next": "دواتر",
      "Back": "پێشتر",
      "Registering...": "لە حاڵی تۆمارکردندایە...",
      "Already have an account?": "پێشتر هەژمارت هەیە؟",
      "Please enter a valid email address.": "تکایە ناونیشانی ئیمەیڵێکی دروست بنووسە.",
      "Password must be at least 6 characters long.": "وشەی نهێنی دەبێت لانیکەم 6 پیت بێت.",

      "Loading profile...": "لە حاڵی بارکردنی پڕۆفایلدایە...",
      "Failed to load profile data.": "شکستی هێنا لە بارکردنی زانیارییەکانی پڕۆفایل.",
      "Profile already complete. Redirecting...": "پڕۆفایلەکە پێشتر تەواو کراوە. لە حاڵی ڕەوانەکردندایە...",
      "Complete Your Profile ({{userType}})": "تەواوکردنی پڕۆفایلەکەت ({{userType}})",
      "Hiring": "بۆ دامەزراندن",
      "Working": "بۆ کارکردن",
      "Select Type": "جۆر هەڵبژێرە",
      "What do you want to do?": "دەتەوێت چی بکەیت؟",
      "Full Name": "ناوی تەواو",
      "Nationality": "ڕەگەزنامە",
      "Age": "تەمەن",
      "Gender": "ڕەگەز",
      "Phone Number": "ژمارەی تەلەفۆن",
      "Known Languages (comma-separated)": "زمانە ناسراوەکان (بە پاوەن جیاکراوەتەوە)",
      "e.g., English, Spanish, French": "بۆ نموونە: ئینگلیزی، ئیسپانی، فەڕەنسی",
      "Talent/Skills (comma-separated)": "بەهرە/تواناکان (بە پاوەن جیاکراوەتەوە)",
      "e.g., Web Development, Graphic Design, Writing": "بۆ نموونە: پەرەپێدانی وێب، دیزاینی گرافیک، نووسین",
      "Job Experience": "ئەزموونی کار",
      "Tell us about your work experience...": "باس لە ئەزموونی کارەکەت بکە...",
      "Save Profile": "پاشەکەوتکردنی پڕۆفایل",
      "Saving Profile...": "لە حاڵی پاشەکەوتکردنی پڕۆفایلدایە...",
      "User not authenticated.": "بەکارهێنەر ناسێنراو نییە.",
      "Please fill out all required profile fields.": "تکایە هەموو خانەکانی پڕۆفایلە داواکراوەکان پڕ بکەرەوە.",
      "Please fill out all required job seeker profile fields.": "تکایە هەموو خانەکانی پڕۆفایلە داواکراوەکان بۆ گەڕانی کار پڕ بکەرەوە.",
      "User type is missing. Please select your user type.": "جۆری بەکارهێنەر دیار نییە. تکایە جۆری بەکارهێنەرەکەت هەڵبژێرە.",
      "Profile created successfully!": "پڕۆفایل بە سەرکەوتوویی دروست کرا!",

      "Log In": "چوونە ژوورەوە",
      "Enter your email": "ئیمەیڵەکەت بنووسە",
      "Enter your password": "وشەی نهێنییەکەت بنووسە",
      "Logging In...": "لە حاڵی چوونە ژوورەوەدایە...",
      "An error occurred while checking your profile.": "هەڵەیەک ڕوویدا لەکاتی پشکنینی پڕۆفایلەکەت.",
      "Failed to log out.": "شکستی هێنا لە چوونە دەرەوە.",
      "An error occurred after login. Please try again.": "هەڵەیەک ڕوویدا دوای چوونە ژوورەوە. تکایە دووبارە هەوڵ بدە.",
      "Sign in failed. Please check your credentials.": "چوونە ژوورەوە شکستی هێنا. تکایە زانیارییەکانت بپشکنە.",
      "Don't have an account?": "هەژمارت نییە؟",

      "Loading dashboard...": "لە حاڵی بارکردنی داشبۆرددایە...",
      "Welcome, {{name}}!": "بەخێربێیت، {{name}}!",
      "User": "بەکارهێنەر",
      "Logout": "چوونە دەرەوە",
      "Updates & Contact": "نوێکارییەکان و پەیوەندی",
      "Thanks for registering! Our platform is currently under development, with exciting features coming soon.": "سوپاس بۆ تۆمارکردنت! پلاتفۆرمەکەمان لە ئێستادا لە حاڵی پەرەپێداندایە، لەگەڵ تایبەتمەندیی سەرنجڕاکێش کە بەم زووانە دێن.",
      "We will contact you via your provided phone number for any relevant job opportunities (if you are a job seeker).": "پەیوەندیت پێوە دەکەین لە ڕێگەی ژمارەی تەلەفۆنەکەتەوە بۆ هەر هەلێکی کار کە پەیوەندیدار بێت (ئەگەر گەڕانی کار بیت).",
      "If you are looking to hire people manually or have immediate inquiries, please feel free to contact us directly.": "ئەگەر بەدوای دامەزراندنی کەسێکدا دەگەڕێیت بە شێوەی دەستی یان پرسیاری بە پەلەت هەیە، تکایە پەیوەندی ڕاستەوخۆمان پێوە بکە.",
      "Contact Info": "زانیاری پەیوەندی",
      "Help Us Improve": "یارمەتیمان بدە باشتر بین",
      "Please take a moment to provide us with valuable feedback by filling out this short form:": "تکایە کەمێک کات تەرخان بکە بۆ پێدانی سەرنجی بەنرخ بە پڕکردنەوەی ئەم فۆڕمە کورتە:",
      "Fill Out Form": "فۆڕمەکە پڕ بکەرەوە",
      "Your Profile Information": "زانیارییەکانی پڕۆفایلەکەت",
      "User Type": "جۆری بەکارهێنەر",
      "Full Name": "ناوی تەواو",
      "Nationality": "ڕەگەزنامە",
      "Age": "تەمەن",
      "Gender": "ڕەگەز",
      "Phone Number": "ژمارەی تەلەفۆن",
      "Known Languages": "زمانە ناسراوەکان",
      "Talent/Skills": "بەهرە/تواناکان",
      "Job Experience": "ئەزموونی کار",
      "N/A": "بەردەست نییە",
      "Profile data not available.": "زانیارییەکانی پڕۆفایل بەردەست نییە.",
      "Edit Profile": "دەستکاریکردنی پڕۆفایل",

      "Loading profile for editing...": "لە حاڵی بارکردنی پڕۆفایل بۆ دەستکاریکردن...",
      "Failed to load profile data for editing.": "شکستی هێنا لە بارکردنی زانیارییەکانی پڕۆفایل بۆ دەستکاریکردن.",
      "Profile not found.": "پڕۆفایل نەدۆزرایەوە.",
      "Edit Your Profile": "دەستکاریکردنی پڕۆفایلەکەت",
      "Save Changes": "پاشەکەوتکردنی گۆڕانکارییەکان",
      "An unexpected error occurred during profile update. Please try again.": "هەڵەیەکی چاوەڕواننەکراو ڕوویدا لەکاتی نوێکردنەوەی پڕۆفایل. تکایە دووبارە هەوڵ بدە.",
      "Profile updated successfully!": "پڕۆفایل بە سەرکەوتوویی نوێ کرایەوە!",


      "Invalid login credentials": "زانیاری چوونە ژوورەوە هەڵەیە",
      "Email not confirmed": "ئیمەیڵ پشتڕاست نەکراوەتەوە",
      "User already registered": "بەکارهێنەر پێشتر تۆمار کراوە",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n to react-i18next
  .init({
    resources, // Your translation resources
    lng: "en", // default language to use. Set this to your desired default.
    fallbackLng: "en", // language to use if translations for the current language are not available

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    debug: true // Set to false in production
  });

export default i18n;
