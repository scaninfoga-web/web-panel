'use client';
import React from 'react';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface Props {
  whenShown: boolean;
  handleBookmark: () => Promise<void>;
}

export default function BookmarkButton({ whenShown, handleBookmark }: Props) {
  const [isBookmarkedChecked, setIsBookmarkedChecked] = React.useState(false);
  const [isBookmarkedLoading, setIsBookmarkedLoading] = React.useState(false);

  const handleBookmarkClick = async () => {
    try {
      setIsBookmarkedLoading(true);
      await handleBookmark();
      setIsBookmarkedChecked((c) => !c);
    } catch (error) {
    } finally {
      setIsBookmarkedLoading(false);
    }
  };

  return (
    <>
      {whenShown &&
        (isBookmarkedChecked ? (
          <Button
            onClick={handleBookmarkClick}
            className="max-w-20"
            loading={isBookmarkedLoading}
          >
            <BookmarkCheck className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            onClick={handleBookmarkClick}
            variant={'outline'}
            className="max-w-20"
            loading={isBookmarkedLoading}
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        ))}
    </>
  );
}
