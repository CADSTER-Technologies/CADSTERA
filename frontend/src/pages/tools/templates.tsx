import React from 'react';

const templatesData = {
  excel: [
    { name: 'Project Plan', file: '/templates/excel/project-plan.xlsx' },
    { name: 'Budget Tracker', file: '/templates/excel/budget-tracker.xlsx' }
  ],
  ppt: [
    { name: 'Company Overview', file: '/templates/ppt/company-overview.pptx' },
    { name: 'Product Launch', file: '/templates/ppt/product-launch.pptx' }
  ],
  '3d': [
    // List your 3D template files here with names and paths
  ]
};

const TemplatesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl mb-8 text-orange-400">Templates</h1>

      {Object.entries(templatesData).map(([category, templates]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl mb-4 capitalize">{category} Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map(({ name, file }) => (
              <div
                key={name}
                className="bg-gray-900 p-4 rounded shadow hover:shadow-lg flex flex-col justify-between"
              >
                <p className="mb-4">{name}</p>
                <a
                  href={file}
                  download
                  className="bg-orange-600 text-black px-4 py-2 rounded text-center hover:bg-orange-700"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplatesPage;
