'use client';

import { useEffect, useState } from 'react';

function FlowPage() {
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const response = localStorage.getItem('apiResponse');
    if (response) {
      setApiResponse(response);
    } else {
      setApiResponse('No API response found. Please try again.');
    }
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
       {apiResponse ? (
        <pre className="bg-gray-100 p-4 rounded-md">
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      ) : (
        <p>No API response found. Please try again from the homepage.</p>
      )}
    </div>
  );
}

export default FlowPage;
