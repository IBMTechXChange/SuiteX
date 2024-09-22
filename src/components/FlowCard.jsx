import React, { useState } from 'react';
import { Check, X, Copy, ExternalLink, Loader2, Calendar, Link, FileText } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const FlowCard = ({ cardKey, value, activeCards, loading, onAction, fetchLink }) => {
  const [copiedLink, setCopiedLink] = useState(null);
  const { toast } = useToast();

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

  if (value === 0 || (value === 1 && !activeCards[cardKey])) return null;

  const bgColor = {
    connectX: 'bg-blue-100',
    docX: 'bg-green-100',
    calX: 'bg-yellow-100',
  }[cardKey] || 'bg-gray-100';

  const getIcon = () => {
    switch (cardKey) {
      case 'connectX':
        return <Link className="h-6 w-6 text-blue-600" />;
      case 'calX':
        return <Calendar className="h-6 w-6 text-yellow-600" />;
      case 'docX':
        return <FileText className="h-6 w-6 text-green-600" />;
      default:
        return null;
    }
  };

  let cardContent;
  if (value === 1) {
    cardContent = (
      <CardContent>
        <p className="text-lg">Do you want to create a link?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button 
            onClick={() => onAction(cardKey, 'tick')} 
            variant="outline" 
            size="sm"
            disabled={loading[cardKey]}
          >
            {loading[cardKey] ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            {loading[cardKey] ? 'Loading...' : 'Yes'}
          </Button>
          <Button 
            onClick={() => onAction(cardKey, 'cross')} 
            variant="outline" 
            size="sm"
            disabled={loading[cardKey]}
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
        <CardFooter className="flex justify-end space-x-2">
          <Button onClick={() => copyToClipboard(value)} variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" /> Copy Link
          </Button>
          {(cardKey === 'connectX' || cardKey === 'docX') && (
            <Button onClick={() => window.open(value, '_blank')} variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" /> Open Link
            </Button>
          )}
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
        <h3 className="flex items-center text-xl font-bold">
          {getIcon()}
          <span className="ml-2">{cardKey.charAt(0).toUpperCase() + cardKey.slice(1)}</span>
        </h3>
      </CardHeader>
      {cardContent}
    </Card>
  );
};

export default FlowCard;