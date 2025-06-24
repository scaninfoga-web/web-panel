import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface PageProps {
  mobileNo: string;
  title: string;
  isRealtime: boolean;
  bookmarkPage: number;
  tools: {
    mainTool: string;
    subTool: {
      value: string;
      label: string;
    }[];
  }[];
}

export default function BookmarkWidget({
  mobileNo,
  title,
  tools,
  bookmarkPage,
  isRealtime,
}: PageProps) {
  const [isWidgetShown, setIsWidgetShown] = useState(false);
  const [MainTool, _] = useState(
    tools.map((tool) => {
      return {
        value: tool.mainTool,
        label: tool.mainTool,
      };
    }),
  );
  const [SubTool, setSubTool] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [selectedCaseDescription, setSelectedCaseDescription] = useState('');
  const [caseType, setCaseType] = useState('');
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(false);
  const handleClose = () => {
    setIsWidgetShown(false);
  };

  const handleMainSelect = (data: string) => {
    setCaseType(data);
    setSubTool(tools.find((tool) => tool.mainTool === data)?.subTool || []);
  };
  const handleSelectCaseDescription = (data: string) => {
    setSelectedCaseDescription(data);
  };
  const [investigator, setInvestigator] = useState('');
  const [isValidSubmition, setIsValidSubmition] = useState(false);
  const { latitude, longitude } = useSelector((state: RootState) => state.info);

  const handleSubmit = async () => {
    try {
      await post('/api/auth/addBookmark', {
        bookmarkPage: bookmarkPage,
        payload: {
          mobileNumber: mobileNo,
          realtimeData: isRealtime,
        },
        caseType: caseType,
        caseDescription: selectedCaseDescription,
        investigator: investigator,
        latitude: latitude,
        longitude: longitude,
      });
      toast.success('Bookmarked Successfully');
      setIsBookmarkChecked(true);
      setIsWidgetShown(false);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      {isBookmarkChecked ? (
        <Button
          onClick={() => {
            if (isBookmarkChecked) return;
            setIsWidgetShown(true);
          }}
          className="max-w-20"
        >
          <BookmarkCheck className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          onClick={() => {
            setIsWidgetShown(true);
          }}
          variant={'outline'}
          className="max-w-20"
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      )}

      {isWidgetShown && (
        <Dialog
          open={isWidgetShown}
          onOpenChange={(open) => !open && handleClose()}
        >
          <DialogPortal>
            <DialogContent className="min-[400px] flex min-w-[800px] flex-col border-slate-800 bg-slate-950 p-10 text-white shadow-2xl shadow-slate-800 backdrop-blur-2xl">
              <DialogTitle className="text-3xl font-bold text-emerald-500">
                {title}
              </DialogTitle>
              <DialogHeader className="mt-4 space-y-2 rounded-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-teal-700 to-emerald-700">
                    <Bookmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Select Options
                    </h2>
                  </div>
                </div>
              </DialogHeader>

              <div className="relative mt-4 flex min-h-full flex-col items-center overflow-hidden">
                <div
                  className={cn(
                    'flex w-full transition-transform duration-500 ease-in-out',
                  )}
                >
                  <div className="flex min-w-full flex-col space-y-6">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <div className="space-y-1">
                        <label className="font-base text-sm text-neutral-300">
                          Case Type
                        </label>
                        <CustomCombox
                          list={MainTool}
                          onSelect={handleMainSelect}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-base text-sm text-neutral-300">
                          Case Description
                        </label>
                        <CustomCombox
                          list={SubTool}
                          onSelect={handleSelectCaseDescription}
                        />
                      </div>
                    </div>
                    <div className="space-y-1 px-4 pb-4">
                      <label className="font-base text-sm text-neutral-300">
                        Investigator Officer
                      </label>

                      <Input
                        value={investigator}
                        onChange={(e) => {
                          if (
                            e.target.value.length > 4 &&
                            selectedCaseDescription
                          ) {
                            setIsValidSubmition(true);
                          } else {
                            setIsValidSubmition(false);
                          }
                          setInvestigator(e.target.value);
                        }}
                        placeholder="Investigator officer name?"
                        className="border border-emerald-500"
                      />
                    </div>
                    <div className="min-w-full">
                      <Button
                        className="w-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                        disabled={!isValidSubmition}
                        onClick={handleSubmit}
                      >
                        Click to Continue
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </>
  );
}
