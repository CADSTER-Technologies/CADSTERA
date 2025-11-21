import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Legal = () => {
  const navigate = useNavigate();

  const goToFooter = () => {
    navigate("/");              // Step 1: go to home
    setTimeout(() => {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);                  // Step 2: wait & scroll to footer
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6 relative">

      {/* ⭐ Back Button — fixed top-right exactly 1 inch (96px) */}
      <button
        onClick={goToFooter}
        className="fixed"
        style={{
          top: "96px",   // 1 inch
          right: "24px"  // nice spacing
        }}
      >
        <div className="bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600 transition">
          Back
        </div>
      </button>

      <h1 className="text-3xl font-bold mt-6 mb-6">Legal Information</h1>

      <ul className="list-disc ml-6 space-y-4 text-gray-700 leading-relaxed text-lg">
        <li>All CADSTER services comply with global engineering data standards.</li>
        <li>User data is processed securely following international compliance rules.</li>
        <li>Software usage follows strict licensing under international regulations.</li>
        <li>CADSTER tools must be used in accordance with product terms and conditions.</li>
        <li>Unauthorized duplication, redistribution, or resale is prohibited.</li>
      </ul>
    </div>
  );
};

export default Legal;
