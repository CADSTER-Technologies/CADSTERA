import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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

      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

      <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
      <p>Using our website or software means you agree...</p>

      <h2 className="text-2xl font-semibold mt-8">2. Intellectual Property</h2>
      <p>All content belongs to CADSTER...</p>

      <h2 className="text-2xl font-semibold mt-8">3. Limitation of Liability</h2>
      <p>We are not responsible for direct or indirect damages...</p>

      <h2 className="text-2xl font-semibold mt-8">4. Modifications</h2>
      <p>Terms may be updated anytime with a new effective date...</p>

    </div>
  );
};

export default TermsOfService;
