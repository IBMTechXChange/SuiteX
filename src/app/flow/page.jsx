'use client';
import React, { useEffect, useState } from 'react';
import { Mail, Check, X } from 'lucide-react';

const FlowPage = () => {
  const [parsedData, setParsedData] = useState(null);
  const [activeCards, setActiveCards] = useState({});

  useEffect(() => {
    const response = localStorage.getItem('apiResponse');
    if (response) {
      try {
        const parsed = JSON.parse(response);
        setParsedData(parsed);
        // Initialize activeCards based on parsed data
        const initialActiveCards = Object.keys(parsed).reduce((acc, key) => {
          if (key !== 'mailX' && parsed[key] === 1) {
            acc[key] = true;
          }
          return acc;
        }, {});
        setActiveCards(initialActiveCards);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setParsedData({ error: 'Invalid JSON data' });
      }
    } else {
      setParsedData({ error: 'No API response found. Please try again.' });
    }
  }, []);

  const fetchLink = async (key) => {
    const requestData = {
      [key]: 1
    };

    try {
      const response = await fetch('https://suitex-linkgen-api.onrender.com/generate_link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        setParsedData((prevData) => ({
          ...prevData,
          [key]: result[`${key}_link`], 
        }));
      } else {
        console.error('Error fetching link:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching link:', error);
    }
  };

  const handleAction = (key, action) => {
    if (action === 'tick') {
      fetchLink(key); 
    } else {
      setActiveCards((prev) => ({ ...prev, [key]: false }));
    }
  };

  const renderCard = (key, value) => {
    if (value === 0 || (value === 1 && !activeCards[key])) return null;

    const bgColor = {
      connectX: 'bg-blue-100',
      docX: 'bg-green-100',
      calX: 'bg-yellow-100',
    }[key] || 'bg-gray-100';

    let cardContent;
    if (value === 1) {
      cardContent = (
        <div className="flex justify-between items-center">
          <p className="text-lg">Do you want to create a link?</p>
          <div>
            <button onClick={() => handleAction(key, 'tick')} className="text-green-500 mr-2">
              <Check />
            </button>
            <button onClick={() => handleAction(key, 'cross')} className="text-red-500">
              <X />
            </button>
          </div>
        </div>
      );
    } else if (typeof value === 'object') {
      cardContent = Object.entries(value).map(([subKey, subValue]) => (
        <p key={subKey} className="text-lg">{`${subKey}: ${subValue}`}</p>
      ));
    } else {
      cardContent = <p className="text-lg">{String(value)}</p>;
    }

    return (
      <div className={`${bgColor} p-4 rounded-md`}>
        <h3 className="text-xl font-bold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
        {cardContent}
      </div>
    );
  };

  const renderMailX = (mailData) => (
    <div className="bg-purple-100 p-4 rounded-md">
      <h3 className="text-xl font-bold text-purple-800 flex items-center">
        <Mail className="mr-2" /> Mail X
      </h3>
      <p className="font-semibold text-purple-600">{mailData.subject}</p>
      <p className="text-purple-700 mt-2">{mailData.body}</p>
    </div>
  );

  const renderContent = () => {
    if (!parsedData) return <p>Loading...</p>;
    if (parsedData.error) return <p className="text-red-600">{parsedData.error}</p>;

    return (
      <div className="space-y-4">
        {Object.entries(parsedData).map(([key, value]) =>
          key === 'mailX' ? (
            <div key={key}>{renderMailX(value)}</div>
          ) : (
            <div key={key}>{renderCard(key, value)}</div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h2 className="text-2xl font-bold mb-4">Flow Page Data</h2>
      {renderContent()}
    </div>
  );
};

export default FlowPage;