import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-6 py-16 relative">

      {/* BACK BUTTON — RIGHT SIDE (NOT FIXED) */}
      <div className="w-full flex justify-end mb-8">
        <Link
          to="/?scroll=footer"
          className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-lg text-foreground/80">
        CADSTER Technologies respects your privacy and is committed to protecting your personal data.
      </p>

      <h2 className="text-2xl font-semibold mt-8">1. Information We Collect</h2>
      <p>We may collect name, email, company name, usage data...</p>

      <h2 className="text-2xl font-semibold mt-8">2. How We Use Your Data</h2>
      <p>Improve software, support, updates, communication...</p>

      <h2 className="text-2xl font-semibold mt-8">3. Data Protection</h2>
      <p>Industry-standard security measures...</p>

      <h2 className="text-2xl font-semibold mt-8">4. Your Rights</h2>
      <p>Contact us for data access, correction, deletion...</p>

      <h2 className="text-2xl font-semibold mt-8">5. Updates</h2>
      <p>Policy may be updated periodically...</p>
    </div>
  );
};

export default PrivacyPolicy;
