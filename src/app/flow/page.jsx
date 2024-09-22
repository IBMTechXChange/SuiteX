'use client';
import React from 'react';
import { useFlowData } from '@/hooks/useFlowData';
import { useMailActions } from '@/hooks/useMailActions';
import FlowCard from '@/components/FlowCard';
import MailCard from '@/components/MailCard';
import { Alert, AlertDescription } from '@/components/ui/alert';


const FlowPage = () => {
  const { parsedData, activeCards, loading, handleAction, fetchLink } =
    useFlowData();
  const { mailLoading, mailSent, handleMailEdit, handleMailSend } =
    useMailActions();

  const renderContent = () => {
    if (!parsedData) return <p>Loading...</p>;
    if (parsedData.error)
      return (
        <Alert variant='destructive'>
          <AlertDescription>{parsedData.error}: There is a problem with your command. Please make sure your command is relevant.</AlertDescription>
        </Alert>
      );

    return (
      <div className='space-y-4'>
        {Object.entries(parsedData).map(([key, value]) =>
          key === 'mailX' ? (
            <MailCard
              key={key}
              mailData={value}
              mailLoading={mailLoading}
              mailSent={mailSent}
              onEdit={handleMailEdit}
              onSend={handleMailSend}
            />
          ) : (
            <FlowCard
              key={key}
              cardKey={key}
              value={value}
              activeCards={activeCards}
              loading={loading}
              onAction={handleAction}
              fetchLink={fetchLink}
            />
          )
        )}
      </div>
    );
  };

  return (
    <div className='relative mx-auto flex min-h-[calc(100vh-224px)] max-w-3xl flex-col items-center justify-center overflow-hidden'>
      {renderContent()}
    </div>
  );
};

export default FlowPage;
