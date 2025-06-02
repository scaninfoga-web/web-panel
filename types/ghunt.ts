export interface GhuntData {
  success: boolean;
  email: string;
  profile: {
    gaiaId: string;
    hasCustomProfilePicture: boolean;
    hasCustomCover: boolean;
    lastEdited: string;
    userTypes: string[];
    profilePictureUrl: string;
  };
  googleChat: {
    entityType: string;
    customerId: null;
  };
  googlePlus: {
    isEnterpriseUser: boolean;
  };
  playGames: {
    hasProfile: boolean;
    username: null;
    playerId: null;
    avatarUrl: null;
  };
  maps: {
    profileUrl: string;
    hasReviews: boolean;
  };
  calendar: {
    isPublic: boolean;
    hasEvents: boolean;
  };
}
