import { User, Mail, Crown, Smile, Meh, Frown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatISOtoDDMMYYYY } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  dateJoined: string;
  walletBalance: number;
  subscriptionType: string;
}

interface ProfileInformationCardProps {
  userData: UserData;
}

export const ProfileInformationCard = () => {
  let userData = useSelector((state: RootState) => state?.user?.user);
  const walletBalance = useSelector(
    (state: RootState) => state?.wallet?.balance,
  );
  userData = { ...userData, walletBalance, susbcriptionType: 'gold' };
  const getSubscriptionColor = (type: string) => {
    switch (type) {
      case 'SILVER':
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-gray-300';
      case 'GOLD':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-300';
      case 'PLATINUM':
        return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white border-blue-300';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-gray-300';
    }
  };

  const getSubscriptionIcon = (type: string) => {
    return <Crown className="h-5 w-5" />;
  };

  const getWalletIcon = (balance: number) => {
    if (balance < 10000) {
      return <Frown className="h-6 w-6 text-red-400" />;
    } else if (balance <= 30000) {
      return <Meh className="h-6 w-6 text-yellow-400" />;
    } else {
      return <Smile className="h-6 w-6 text-green-400" />;
    }
  };

  const getWalletStatusColor = (balance: number) => {
    if (balance < 10000) {
      return 'text-red-400';
    } else if (balance <= 30000) {
      return 'text-yellow-400';
    } else {
      return 'text-green-400';
    }
  };

  return (
    <Card className="card-bg border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-500">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              {userData.firstName} {userData.lastName}
            </h3>
            <p className="flex items-center gap-1 text-slate-300">
              <Mail className="h-4 w-4" />
              {userData.email}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-600 py-2">
            <span className="text-slate-300">First Name</span>
            <span className="font-medium text-white">{userData.firstName}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-600 py-2">
            <span className="text-slate-300">Last Name</span>
            <span className="font-medium text-white">{userData.lastName}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-600 py-2">
            <span className="text-slate-300">Email</span>
            <span className="font-medium text-white">{userData.email}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-600 py-2">
            <span className="text-slate-300">Date Joined</span>
            <span className="font-medium text-white">
              {formatISOtoDDMMYYYY(userData.dateJoined)}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-600 py-2">
            <span className="text-slate-300">Wallet Balance</span>
            <div className="flex items-center gap-2">
              <span
                className={`font-bold ${getWalletStatusColor(userData.walletBalance)}`}
              >
                {userData.walletBalance.toLocaleString()}
              </span>
              {getWalletIcon(userData.walletBalance)}
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="font-medium text-slate-300">Subscription</span>
            <Badge
              className={`${getSubscriptionColor(userData.subscriptionPlan)} border-2 px-4 py-2 text-sm font-bold shadow-lg`}
            >
              {getSubscriptionIcon(userData.subscriptionType)}
              <span className="space-x-1 uppercase tracking-wide">
                <span className="ml-2 text-xs">
                  {' '}
                  {userData?.subscriptionPlan}{' '}
                </span>
              </span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
