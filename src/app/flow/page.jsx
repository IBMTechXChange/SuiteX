'use client';
import React, { useState } from 'react';
import { useFlowData } from '@/hooks/useFlowData';
import { useMailActions } from '@/hooks/useMailActions';
import FlowCard from '@/components/FlowCard';
import MailCard from '@/components/MailCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Modal from '@/components/FlowBlob';
import { toast } from '@/hooks/use-toast';

const FlowPage = () => {
  const { parsedData, activeCards, loading, handleAction, fetchLink } =
    useFlowData();
  const { mailLoading, mailSent, handleMailEdit, handleMailSend } =
    useMailActions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flowName, setFlowName] = useState('');

  const handleSaveFlow = () => {
    console.log("Save")
    window.location.href = "/";
  };

  const renderContent = () => {
    if (!parsedData) return <p>Loading...</p>;
    if (parsedData.error)
      return (
        <Alert variant='destructive'>
          <AlertDescription>
            {parsedData.error}: There is a problem with your command. Please
            make sure your command is relevant.
          </AlertDescription>
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
      <Button onClick={() => setIsModalOpen(true)} className='mt-4'>
        Save Flow
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className='p-4'>
            <h2 className='text-lg font-bold'>Name Your Flow</h2>
            <input
              type='text'
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              className='mt-2 w-full rounded border border-gray-300 p-2'
              placeholder='Enter flow name'
            />
            <div className='mt-4'>
              <Button onClick={handleSaveFlow}>Save</Button>
              <Button onClick={() => setIsModalOpen(false)} className='ml-2'>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FlowPage;
