import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { CustomCombox } from '@/components/sub/CustomComBox';
import { Input } from '@/components/ui/input';
import { post } from '@/lib/api';
import { toast } from 'sonner';
import { UserBookmark } from '../../boomark/Bookmark';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageProps {
  isShown: boolean;
  setIsEditShown: Dispatch<SetStateAction<boolean>>;
  userBookmark: UserBookmark | null;
  fetchActivities: () => Promise<void>;
}

export default function EditBookmark({
  isShown,
  userBookmark,
  setIsEditShown,
  fetchActivities,
}: PageProps) {
  const [isValidSubmition, setIsValidSubmition] = useState(false);
  const [editStatus, setEditStatus] = useState<'pending' | 'success'>(
    'pending',
  );
  const [investigator, setInvestigator] = useState('');
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userBookmark) {
      setInvestigator(userBookmark?.investigator);
      setEditStatus(userBookmark?.status);
    }
  }, [userBookmark]);

  const handleClose = () => {
    setIsEditShown(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await post('/api/auth/updateBookmarkStatus', {
        caseId: userBookmark?.id,
        status: editStatus,
        investigator: investigator,
      });
      fetchActivities();
      handleClose();
      toast.success('Updated');
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isShown} onOpenChange={(open) => !open && handleClose()}>
      <DialogPortal>
        <DialogContent className="min-[400px] flex min-w-[800px] flex-col border-slate-800 bg-slate-950 p-10 text-white shadow-2xl shadow-slate-800 backdrop-blur-2xl">
          <DialogTitle className="text-3xl font-bold text-emerald-500">
            {userBookmark?.id}
          </DialogTitle>

          <div className="relative mt-4 flex min-h-full flex-col items-center overflow-hidden">
            <div
              className={cn(
                'flex w-full flex-col transition-transform duration-500 ease-in-out',
              )}
            >
              <div className="flex justify-center gap-4">
                <div className="space-y-1 px-4 pb-4">
                  <label className="font-base select-none text-base text-neutral-300">
                    Investigator Officer
                  </label>

                  <Input
                    value={investigator}
                    onChange={(e) => {
                      setInvestigator(e.target.value);
                      if (
                        e.target.value.length > 4 &&
                        editStatus.length > 3 &&
                        editStatus.length < 12
                      ) {
                        setIsValidSubmition(true);
                      } else {
                        setIsValidSubmition(false);
                      }
                    }}
                    placeholder="officer name?"
                    className="border border-emerald-500"
                  />
                </div>
                <div className="space-y-1 px-4 pb-4">
                  <label className="font-base text-base text-neutral-300">
                    Status
                  </label>

                  <CustomCombox
                    list={[
                      { label: 'success', value: 'success' },
                      { label: 'pending', value: 'pending' },
                    ]}
                    searchNeed={false}
                    onSelect={(val) => {
                      if (val === 'pending' || val === 'success') {
                        setEditStatus(val);
                      }
                    }}
                  />
                  {/* <Input
                    value={editStatus}
                    onChange={(e) => {
                      setEditStatus(e.target.value);
                      if (
                        investigator.length > 4 &&
                        e.target.value.length > 3 &&
                        e.target.value.length < 12
                      ) {
                        setIsValidSubmition(true);
                      } else {
                        setIsValidSubmition(false);
                      }
                    }}
                    placeholder="current status?"
                    className="border border-emerald-500"
                  /> */}
                </div>
              </div>
              <div className="flex min-w-full flex-col space-y-6">
                <Button
                  className="w-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                  disabled={!isValidSubmition}
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Click to save
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
