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
    <div className='mx-auto max-w-2xl p-4'>
      {apiResponse ? (
        <pre className='rounded-md bg-gray-100 p-4'>
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      ) : (
        <p>No API response found. Please try again from the homepage.</p>
      )}
    </div>
  );
}

export default FlowPage;
