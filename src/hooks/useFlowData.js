'use client';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useFlowData = () => {
  const [parsedData, setParsedData] = useState(null);
  const [activeCards, setActiveCards] = useState({});
  const [loading, setLoading] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    const response = localStorage.getItem('apiResponse');
    if (response) {
      try {
        const parsed = JSON.parse(response);
        setParsedData(parsed);
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
    const requestData = { [key]: 1 };
    setLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const response = await fetch(
        'https://suitex-linkgen-api.onrender.com/generate_link',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setParsedData((prevData) => ({
          ...prevData,
          [key]: result[`${key}_link`],
        }));
        toast({
          title: 'Link Generated',
          description: 'Your link has been successfully generated.',
        });
      } else {
        console.error('Error fetching link:', response.statusText);
        toast({
          title: 'Error',
          description: 'Failed to generate link. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching link:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleAction = (key, action) => {
    if (action === 'tick') {
      fetchLink(key);
    } else {
      setActiveCards((prev) => ({ ...prev, [key]: false }));
    }
  };

  return { parsedData, activeCards, loading, handleAction, fetchLink };
};
