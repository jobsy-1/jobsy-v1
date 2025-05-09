// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// --- Translation Resources ---
// This is where you'll store your translations for each language.
// We'll start with basic placeholders.
// You'll expand these objects with all the text used in your app.
const resources = {
  en: { // English translations
    translation: { // 'translation' is the default namespace
      // Example translations:
      "Jobsy": "Jobsy",
      "About Us": "About Us",
      "Contact Us": "Contact Us",
      "Why Jobsy?": "Why Jobsy?",
      "Work Fun": "Work Fun",
      "Get Started": "Get Started",
      "Where Talent Meets Opportunity.": "Where Talent Meets Opportunity.",
      "Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.": "Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.",
      "Learn More": "Learn More",
      "Post Jobs Instantly": "Post Jobs Instantly",
      "Smart Matching": "Smart Matching",
      "Real-Time Communication": "Real-Time Communication",
      "Work that feels fun": "Work that feels fun",
      "Explore a colorful world of job opportunities across various fields.": "Explore a colorful world of job opportunities across various fields.",
      "About Jobsy": "About Jobsy",
      "Get In Touch": "Get In Touch",
      "Have questions or feedback? We'd love to hear from you!": "Have questions or feedback? We'd love to hear from you!",
      "Email Address": "Email Address", // From SignUpPage
      "Password": "Password", // From SignUpPage
      "Enter your email": "Enter your email", // From SignUpPage
      "Create a password": "Create a password", // From SignUpPage
      "Terms and Conditions": "Terms and Conditions", // From SignUpPage
      "I agree to the": "I agree to the", // From SignUpPage
      "Choose Your Path": "Choose Your Path", // From SignUpPage
      "I want to Hire People": "I want to Hire People", // From SignUpPage
      "I want to Find a Job": "I want to Find a Job", // From SignUpPage
      "Set Up Your Profile (Hiring)": "Set Up Your Profile (Hiring)", // From SignUpPage
      "Set Up Your Profile (Working)": "Set Up Your Profile (Working)", // From SignUpPage
      "Full Name": "Full Name", // From SignUpPage
      "Job Experience": "Job Experience", // From SignUpPage
      "Enter your full name": "Enter your full name", // From SignUpPage
      "Tell us about your work experience...": "Tell us about your work experience...", // From SignUpPage
      "Already have an account?": "Already have an account?", // From SignUpPage
      "Log In": "Log In", // From SignUpPage
      "Next": "Next", // From SignUpPage
      "Back": "Back", // From SignUpPage
      "Create Profile": "Create Profile", // From SignUpPage
      "Saving Profile...": "Saving Profile...", // From SignUpPage
      "Creating Profile...": "Creating Profile...", // From SignUpPage
      "Registration successful! Please check your email to verify your account.": "Registration successful! Please check your email to verify your account.", // From SignUpPage
      "Registration successful, but failed to save profile details. Please update your profile later.": "Registration successful, but failed to save profile details. Please update your profile later.", // From SignUpPage
      "An unexpected error occurred. Please try again.": "An unexpected error occurred. Please try again.", // From SignUpPage
      "Please enter both email and password.": "Please enter both email and password.", // From SignUpPage
      "You must agree to the terms and conditions.": "You must agree to the terms and conditions.", // From SignUpPage
      "Please choose whether you want to hire or find a job.": "Please choose whether you want to hire or find a job.", // From SignUpPage
      // Add more English translations here
    }
  },
  ar: { // Arabic translations
    translation: {
      "Jobsy": "جوبسي",
      "About Us": "من نحن",
      "Contact Us": "اتصل بنا",
      "Why Jobsy?": "لماذا جوبسي؟",
      "Work Fun": "عمل ممتع",
      "Get Started": "ابدأ الآن",
      "Where Talent Meets Opportunity.": "حيث تلتقي المواهب بالفرص.",
      "Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.": "ابحث عن فرصتك المستقلة التالية أو عن المستقل المثالي لمشروعك. جوبسي يربط بين المواهب وأصحاب العمل أسرع من أي وقت مضى.",
      "Learn More": "تعلم المزيد",
      "Post Jobs Instantly": "انشر الوظائف فوراً",
      "Smart Matching": "مطابقة ذكية",
      "Real-Time Communication": "تواصل فوري",
      "Work that feels fun": "عمل ممتع",
      "Explore a colorful world of job opportunities across various fields.": "استكشف عالمًا ملونًا من فرص العمل في مختلف المجالات.",
      "About Jobsy": "عن جوبسي",
      "Get In Touch": "تواصل معنا",
      "Have questions or feedback? We'd love to hear from you!": "هل لديك أسئلة أو ملاحظات؟ يسعدنا أن نسمع منك!",
      "Email Address": "البريد الإلكتروني", // From SignUpPage
      "Password": "كلمة المرور", // From SignUpPage
      "Enter your email": "أدخل بريدك الإلكتروني", // From SignUpPage
      "Create a password": "أنشئ كلمة مرور", // From SignUpPage
      "Terms and Conditions": "الشروط والأحكام", // From SignUpPage
      "I agree to the": "أوافق على", // From SignUpPage
      "Choose Your Path": "اختر مسارك", // From SignUpPage
      "I want to Hire People": "أريد توظيف أشخاص", // From SignUpPage
      "I want to Find a Job": "أريد البحث عن وظيفة", // From SignUpPage
      "Set Up Your Profile (Hiring)": "إعداد ملفك الشخصي (للتوظيف)", // From SignUpPage
      "Set Up Your Profile (Working)": "إعداد ملفك الشخصي (للعمل)", // From SignUpPage
      "Full Name": "الاسم الكامل", // From SignUpPage
      "Job Experience": "الخبرة العملية", // From SignUpPage
      "Enter your full name": "أدخل اسمك الكامل", // From SignUpPage
      "Tell us about your work experience...": "أخبرنا عن خبرتك العملية...", // From SignUpPage
      "Already have an account?": "هل لديك حساب بالفعل؟", // From SignUpPage
      "Log In": "تسجيل الدخول", // From SignUpPage
      "Next": "التالي", // From SignUpPage
      "Back": "السابق", // From SignUpPage
      "Create Profile": "إنشاء ملف شخصي", // From SignUpPage
      "Saving Profile...": "جاري حفظ الملف الشخصي...", // From SignUpPage
      "Creating Profile...": "جاري إنشاء الملف الشخصي...", // From SignUpPage
      "Registration successful! Please check your email to verify your account.": "تم التسجيل بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك.", // From SignUpPage
      "Registration successful, but failed to save profile details. Please update your profile later.": "تم التسجيل بنجاح، ولكن فشل حفظ تفاصيل الملف الشخصي. يرجى تحديث ملفك الشخصي لاحقًا.", // From SignUpPage
      "An unexpected error occurred. Please try again.": "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.", // From SignUpPage
      "Please enter both email and password.": "الرجاء إدخال البريد الإلكتروني وكلمة المرور.", // From SignUpPage
      "You must agree to the terms and conditions.": "يجب عليك الموافقة على الشروط والأحكام.", // From SignUpPage
      "Please choose whether you want to hire or find a job.": "الرجاء اختيار ما إذا كنت تريد التوظيف أو البحث عن وظيفة.", // From SignUpPage
      // Add more Arabic translations here
    }
  },
  ku: { // Kurdish translations (Sorani dialect example)
    translation: {
      "Jobsy": "جۆبسی",
      "About Us": "دەربارەی ئێمە",
      "Contact Us": "پەیوەندی بگرە",
      "Why Jobsy?": "بۆچی جۆبسی؟",
      "Work Fun": "کاری خۆش",
      "Get Started": "دەستپێبکە",
      "Where Talent Meets Opportunity.": "شوێنێک کە بەهرە و دەرفەت بەیەک دەگەن.",
      "Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.": "دەرفەتی کاری سەربەخۆی داهاتووت یان سەربەخۆی گونجاو بۆ پڕۆژەکەت بدۆزەرەوە. جۆبسی بەهرەمەندەکان و خاوەنکارەکان زووتر لە جاران پێکەوە دەبەستێتەوە.",
      "Learn More": "زیاتر بزانە",
      "Post Jobs Instantly": "ڕاستەوخۆ کار بڵاو بکەرەوە",
      "Smart Matching": "هاوتاکردنی زیرەک",
      "Real-Time Communication": "پەیوەندی ڕاستەوخۆ",
      "Work that feels fun": "کارێک کە هەستی خۆشی پێبکەیت",
      "Explore a colorful world of job opportunities across various fields.": "جیهانێکی ڕەنگاوڕەنگی هەلی کار لە بوارە جیاوازەکاندا بگەڕێ.",
      "About Jobsy": "دەربارەی جۆبسی",
      "Get In Touch": "پەیوەندی بگرە",
      "Have questions or feedback? We'd love to hear from you!": "پرسیار یان سەرنجت هەیە؟ حەزمان لێیە گوێبیستت بین!",
      "Email Address": "ناونیشانی ئیمەیڵ", // From SignUpPage
      "Password": "وشەی نهێنی", // From SignUpPage
      "Enter your email": "ئیمەیڵەکەت بنووسە", // From SignUpPage
      "Create a password": "وشەی نهێنی دروست بکە", // From SignUpPage
      "Terms and Conditions": "مەرج و ڕێساکان", // From SignUpPage
      "I agree to the": "من ڕازیم بە", // From SignUpPage
      "Choose Your Path": "ڕێگاکەت هەڵبژێرە", // From SignUpPage
      "I want to Hire People": "دەمەوێت خەڵک دامەزرێنم", // From SignUpPage
      "I want to Find a Job": "دەمەوێت کار بدۆزمەوە", // From SignUpPage
      "Set Up Your Profile (Hiring)": "ڕێکخستنی پڕۆفایلەکەت (بۆ دامەزراندن)", // From SignUpPage
      "Set Up Your Profile (Working)": "ڕێکخستنی پڕۆفایلەکەت (بۆ کارکردن)", // From SignUpPage
      "Full Name": "ناوی تەواو", // From SignUpPage
      "Job Experience": "ئەزموونی کار", // From SignUpPage
      "Enter your full name": "ناوی تەواوت بنووسە", // From SignUpPage
      "Tell us about your work experience...": "باس لە ئەزموونی کارەکەت بکە...", // From SignUpPage
      "Already have an account?": "پێشتر هەژمارت هەیە؟", // From SignUpPage
      "Log In": "چوونە ژوورەوە", // From SignUpPage
      "Next": "دواتر", // From SignUpPage
      "Back": "پێشتر", // From SignUpPage
      "Create Profile": "دروستکردنی پڕۆفایل", // From SignUpPage
      "Saving Profile...": "پڕۆفایلەکە پاشەکەوت دەکرێت...", // From SignUpPage
      "Creating Profile...": "پڕۆفایلەکە دروست دەکرێت...", // From SignUpPage
      "Registration successful! Please check your email to verify your account.": "تۆمارکردن سەرکەوتوو بوو! تکایە ئیمەیڵەکەت بپشکنە بۆ پشتڕاستکردنەوەی هەژمارەکەت.", // From SignUpPage
      "Registration successful, but failed to save profile details. Please update your profile later.": "تۆمارکردن سەرکەوتوو بوو، بەڵام پاشەکەوتکردنی زانیارییەکانی پڕۆفایلەکە شکستی هێنا. تکایە دواتر پڕۆفایلەکەت نوێ بکەرەوە.", // From SignUpPage
      "An unexpected error occurred. Please try again.": "هەڵەیەکی چاوەڕواننەکراو ڕوویدا. تکایە دووبارە هەوڵ بدە.", // From SignUpPage
      "Please enter both email and password.": "تکایە هەردوو ئیمەیڵ و وشەی نهێنی بنووسە.", // From SignUpPage
      "You must agree to the terms and conditions.": "دەبێت ڕازی بیت بە مەرج و ڕێساکان.", // From SignUpPage
      "Please choose whether you want to hire or find a job.": "تکایە هەڵبژێرە ئایا دەتەوێت خەڵک دامەزرێنیت یان کار بدۆزیتەوە.", // From SignUpPage
      // Add more Kurdish translations here
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
