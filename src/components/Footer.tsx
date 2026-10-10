import React from 'react';

const Footer = () => {
    return (
       <footer className="w-full bg[#f8f9fa] border-t border-gray-200 py-6 px-4 md:px-8 text-gray-700 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        {/* Left Section */}
        <div>
          <p className="font-normal">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-gray-700">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
    );
};

export default Footer;