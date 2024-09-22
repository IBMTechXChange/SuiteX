'use client'
import React, { useEffect, useState } from 'react';
import { Mail, Check, X, Copy, ExternalLink, Loader2, Edit, Send } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from "@/hooks/use-toast";

const FlowPage = () => {
  const [parsedData, setParsedData] = useState(null);
  const [activeCards, setActiveCards] = useState({});
  const [copiedLink, setCopiedLink] = useState(null);
  const [loading, setLoading] = useState({});
  const [mailLoading, setMailLoading] = useState({ edit: false, send: false });
  const [mailSent, setMailSent] = useState(false);
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
    setLoading(prev => ({ ...prev, [key]: true }));

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
          title: "Link Generated",
          description: "Your link has been successfully generated.",
        });
      } else {
        console.error('Error fetching link:', response.statusText);
        toast({
          title: "Error",
          description: "Failed to generate link. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching link:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleAction = (key, action) => {
    if (action === 'tick') {
      fetchLink(key);
    } else {
      setActiveCards((prev) => ({ ...prev, [key]: false }));
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLink(text);
      toast({
        title: "Copied",
        description: "Link copied to clipboard!",
      });
      setTimeout(() => setCopiedLink(null), 2000);
    });
  };

  const handleMailEdit = async () => {
    setMailLoading(prev => ({ ...prev, edit: true }));
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMailLoading(prev => ({ ...prev, edit: false }));
    toast({
      title: "Mail Edited",
      description: "Your mail has been successfully edited.",
    });
    console.log('Mail edited');
  };

  const handleMailSend = async () => {
    setMailLoading(prev => ({ ...prev, send: true }));
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMailLoading(prev => ({ ...prev, send: false }));
    setMailSent(true);
    toast({
      title: "Mail Sent",
      description: "Your mail has been successfully sent.",
    });
    console.log('Mail Sent');
    setTimeout(() => setMailSent(false), 2000);
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
        <CardContent>
          <p className="text-lg">Do you want to create a link?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <Button 
              onClick={() => handleAction(key, 'tick')} 
              variant="outline" 
              size="sm"
              disabled={loading[key]}
            >
              {loading[key] ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              {loading[key] ? 'Loading...' : 'Yes'}
            </Button>
            <Button 
              onClick={() => handleAction(key, 'cross')} 
              variant="outline" 
              size="sm"
              disabled={loading[key]}
            >
              <X className="mr-2 h-4 w-4" /> No
            </Button>
          </div>
        </CardContent>
      );
    } else if (typeof value === 'string' && value.startsWith('http')) {
      cardContent = (
        <>
          <CardContent>
            <div className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {value}
              </a>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => copyToClipboard(value)} variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" /> Copy Link
            </Button>
          </CardFooter>
        </>
      );
    } else if (typeof value === 'object') {
      cardContent = (
        <CardContent>
          {Object.entries(value).map(([subKey, subValue]) => (
            <p key={subKey} className="text-lg">{`${subKey}: ${subValue}`}</p>
          ))}
        </CardContent>
      );
    } else {
      cardContent = (
        <CardContent>
          <p className="text-lg">{String(value)}</p>
        </CardContent>
      );
    }

    return (
      <Card className={bgColor}>
        <CardHeader>
          <h3 className="text-xl font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
        </CardHeader>
        {cardContent}
      </Card>
    );
  };

  const renderMailX = (mailData) => (
    <Card className="bg-purple-100">
      <CardHeader>
        <h3 className="flex items-center text-xl font-bold text-purple-800">
          <Mail className="mr-2" /> Mail X
        </h3>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-purple-600">{mailData.subject}</p>
        <p className="mt-2 text-purple-700">{mailData.body}</p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button 
          onClick={handleMailEdit} 
          variant="outline" 
          size="sm"
          disabled={mailLoading.edit || mailLoading.send}
        >
          {mailLoading.edit ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Edit className="mr-2 h-4 w-4" />
          )}
          {mailLoading.edit ? 'Editing...' : 'Edit'}
        </Button>
        <Button 
          onClick={handleMailSend} 
          variant="outline" 
          size="sm"
          disabled={mailLoading.edit || mailLoading.send}
        >
          {mailLoading.send ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {mailLoading.send ? 'Sending...' : mailSent ? 'Sent' : 'Send'}
        </Button>
      </CardFooter>
    </Card>
  );

  const renderContent = () => {
    if (!parsedData) return <p>Loading...</p>;
    if (parsedData.error) return <Alert variant="destructive"><AlertDescription>{parsedData.error}</AlertDescription></Alert>;

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
    <div className="py-6 relative mx-auto max-w-3xl flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default FlowPage;