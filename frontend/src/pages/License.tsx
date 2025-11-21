import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const License = () => {
  return (
    <div className="container mx-auto px-6 py-16 relative">

      {/* 🔙 Back Button — RIGHT SIDE */}
      <div className="w-full flex justify-end mb-8">
        <Link
          to="/?scroll=footer"
          className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">Software License Agreement</h1>

      <p className="text-lg leading-relaxed text-foreground/80">
        This License Agreement governs the use of CADSTER Technologies software and services.
        By accessing or using our applications, you agree to comply with and be bound by this agreement.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Permitted Use</h2>
      <p>You may use this software for commercial or non-commercial projects...</p>

      <h2 className="text-2xl font-semibold mt-8">Restrictions</h2>
      <ul className="list-disc ml-6">
        <li>Do not copy or reverse-engineer the software.</li>
        <li>Do not use the software for unlawful activities.</li>
        <li>Do not remove copyright notices.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Disclaimer</h2>
      <p>Software is provided “as is” without warranties...</p>

    </div>
  );
};

export default License;
