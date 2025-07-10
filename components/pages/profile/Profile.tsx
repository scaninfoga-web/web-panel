'use client';

import { User, Mail, Crown, MapPin, Clock, Monitor, Key } from 'lucide-react';
import { Smile, Meh, Frown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { formatISOtoDDMMYYYY } from '@/lib/utils';
import { use, useEffect, useState } from 'react';
import { post } from '@/lib/api';
import { toast } from 'sonner';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProfileInformationCard } from './ProfileInformationCard';
import { LocationOverviewCard } from './LocationOverviewCard';
import { ChangePasswordCard } from './ChangePasswordCard';
import { LoginHistoryCard } from './LoginHistoryCard';
import DashboardTitle from '@/components/common/DashboardTitle';
import TransactionHistory from '../transactionHistory/TransactionHistory';
import { userLocation } from '@/types/ola-geo-api';

const changePassSchema = z
  .object({
    oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    otp: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ChangePassFormValues = z.infer<typeof changePassSchema>;

const Profile = () => {
  const info = useSelector((state: RootState) => state.info);
  const [olaGeoApiData, setOlaGeoApiData] = useState<userLocation | null>(null);
  const [mapLoading, setMapLoading] = useState(false);
  const form = useForm<ChangePassFormValues>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      otp: '',
    },
  });

  const getSubscriptionColor = (type: string) => {
    switch (type) {
      case 'silver':
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-gray-300';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-300';
      case 'platinum':
        return 'bg-gradient-to-r from-purple-400 to-purple-600 text-white border-purple-300';
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

  const populateMapImg = async () => {
    try {
      if (olaGeoApiData) return;
      setMapLoading(true);
      const imageData = await post('/api/auth/getlocation', {
        longitude: info?.longitude,
        latitude: info?.latitude,
      });
      setOlaGeoApiData(imageData);
    } catch (error) {
      toast.error('Error getting maps data.');
    } finally {
      setMapLoading(false);
    }
  };

  const [qrCode, setQrCode] = useState<boolean>(false);

  useEffect(() => {
    if (info.latitude && info.longitude && !olaGeoApiData) {
      populateMapImg();
    }
  }, [info.latitude, info.longitude]);

  return (
    <div className="space-y-4">
      <DashboardTitle
        title="User Profile Dashboard"
        subTitle="Manage your account and view activity"
      />
      <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2">
        <ProfileInformationCard />
        <LocationOverviewCard
          mapLoading={mapLoading}
          locationData={olaGeoApiData}
        />
      </div>
      <ChangePasswordCard />
      <LoginHistoryCard />
      <TransactionHistory />
    </div>
    // <div className="min-h-screen">
    //   <div className="max-w-7xl mx-auto space-y-6">
    //     {/* Header */}
    //     <div className="text-center mb-8">
    //       <h1 className="text-4xl font-bold text-white mb-2">User Profile Dashboard</h1>
    //       <p className="text-slate-400">Manage your account and view activity</p>
    //     </div>

    //     {/* Top Row - User Profile and Map */}
    //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    //       {/* User Profile Card */}
    //       <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-2xl">
    //         <CardHeader>
    //           <CardTitle className="text-white flex items-center gap-2">
    //             <User className="w-5 h-5 text-cyan-400" />
    //             Profile Information
    //           </CardTitle>
    //         </CardHeader>
    //         <CardContent className="space-y-6">
    //           <div className="flex items-center space-x-4">
    //             <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
    //               <User className="w-8 h-8 text-white" />
    //             </div>
    //             <div>
    //               <h3 className="text-xl font-semibold text-white">
    //                 {userData.firstName} {userData.lastName}
    //               </h3>
    //               <p className="text-slate-300 flex items-center gap-1">
    //                 <Mail className="w-4 h-4" />
    //                 {userData.email}
    //               </p>
    //             </div>
    //           </div>

    //           <div className="space-y-4">
    //             <div className="flex justify-between items-center py-2 border-b border-slate-600">
    //               <span className="text-slate-300">First Name</span>
    //               <span className="text-white font-medium">{userData.firstName}</span>
    //             </div>
    //             <div className="flex justify-between items-center py-2 border-b border-slate-600">
    //               <span className="text-slate-300">Last Name</span>
    //               <span className="text-white font-medium">{userData.lastName}</span>
    //             </div>
    //             <div className="flex justify-between items-center py-2 border-b border-slate-600">
    //               <span className="text-slate-300">Email</span>
    //               <span className="text-white font-medium">{userData.email}</span>
    //             </div>
    //             <div className="flex justify-between items-center py-2 border-b border-slate-600">
    //               <span className="text-slate-300">Date Joined</span>
    //               <span className="text-white font-medium">{formatISOtoDDMMYYYY(userData.dateJoined)}</span>
    //             </div>
    //             <div className="flex justify-between items-center py-2 border-b border-slate-600">
    //               <span className="text-slate-300">Wallet Balance</span>
    //               <div className="flex items-center gap-2">
    //                 {getWalletIcon(userData.walletBalance)}
    //                 <span className={`font-bold ${getWalletStatusColor(userData.walletBalance)}`}>
    //                   ${userData.walletBalance.toLocaleString()}
    //                 </span>
    //               </div>
    //             </div>
    //             <div className="flex justify-between items-center py-3">
    //               <span className="text-slate-300 font-medium">Subscription</span>
    //               <Badge className={`${getSubscriptionColor(userData.subscriptionType)} px-4 py-2 text-sm font-bold shadow-lg border-2`}>
    //                 {getSubscriptionIcon(userData.subscriptionType)}
    //                 <span className="ml-2 uppercase tracking-wide">{userData.subscriptionType} Member</span>
    //               </Badge>
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>

    //       {/* Map Section */}
    //       <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-2xl">
    //         <CardHeader>
    //           <CardTitle className="text-emerald-500 flex items-center gap-2">
    //             <MapPin className="w-5 h-5 text-emerald-500" />
    //             Location Overview
    //           </CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //             <div className="space-y-2 mb-4">

    //             <div className="flex justify-between items-center">
    //               <h3 className="text-xl font-semibold text-white">
    //                 Latitude:
    //               </h3>
    //               <p className='text-gray-300'>{info.latitude}</p>
    //             </div>
    //             <div className="flex justify-between items-center">
    //               <h3 className="font-semibold text-white">
    //                 Longitude:
    //               </h3>
    //               <p className='text-gray-300'>{info.longitude}</p>
    //             </div>
    //             <div className="flex justify-between items-center">
    //               <h3 className="font-semibold text-white">
    //                 Device
    //               </h3>
    //               <p className='text-gray-300'>{info.device}</p>
    //             </div>
    //             <div className="flex justify-between items-center">
    //               <h3 className="font-semibold text-white">
    //                 Browser:
    //               </h3>
    //               <p className='text-gray-300'>{info.browser}</p>
    //             </div>
    //             <div className="flex justify-between items-center">
    //               <h3 className="font-semibold text-white">
    //                 IP Address:
    //               </h3>
    //               <p className='text-gray-300'>{info.ip}</p>
    //             </div>
    //             </div>
    //           <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center border border-slate-500">
    //             <div className="text-center text-slate-400">
    //               <MapPin className="w-12 h-12 mx-auto mb-2 text-emeral-500" />
    //               <p className="text-lg font-medium">Interactive Map</p>
    //               <p className="text-sm">Map visualization will be displayed here</p>
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>

    //        {/* Change Password Section */}
    //        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-2xl">
    //       <CardHeader>
    //         <CardTitle className="text-white flex items-center gap-2">
    //           <Key className="w-5 h-5 text-cyan-400" />
    //           Change Password
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <FormProvider {...form}>
    //           <form onSubmit={form.handleSubmit(handlePasswordChange)} className="space-y-4">
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               <div className="space-y-2">
    //                 <label className="text-sm font-medium text-slate-300">Old Password</label>
    //                 <Input
    //                   type="password"
    //                   placeholder="Enter your old password"
    //                   className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400"
    //                   {...form.register('oldPassword')}
    //                 />
    //                 {form.formState.errors.oldPassword && (
    //                   <p className="text-red-400 text-sm">{form.formState.errors.oldPassword.message}</p>
    //                 )}
    //               </div>

    //               <div className="space-y-2">
    //                 <label className="text-sm font-medium text-slate-300">New Password</label>
    //                 <Input
    //                   type="password"
    //                   placeholder="Enter your new password"
    //                   className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400"
    //                   {...form.register('newPassword')}
    //                 />
    //                 {form.formState.errors.newPassword && (
    //                   <p className="text-red-400 text-sm">{form.formState.errors.newPassword.message}</p>
    //                 )}
    //               </div>

    //               <div className="space-y-2">
    //                 <label className="text-sm font-medium text-slate-300">Confirm Password</label>
    //                 <Input
    //                   type="password"
    //                   placeholder="Confirm your new password"
    //                   className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400"
    //                   {...form.register('confirmPassword')}
    //                 />
    //                 {form.formState.errors.confirmPassword && (
    //                   <p className="text-red-400 text-sm">{form.formState.errors.confirmPassword.message}</p>
    //                 )}
    //               </div>

    //               {qrCode && (
    //                 <div className="space-y-2">
    //                   <label className="text-sm font-medium text-slate-300">OTP</label>
    //                   <Input
    //                     type="text"
    //                     placeholder="Enter OTP from authenticator"
    //                     className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400"
    //                     {...form.register('otp')}
    //                   />
    //                   {form.formState.errors.otp && (
    //                     <p className="text-red-400 text-sm">{form.formState.errors.otp.message}</p>
    //                   )}
    //                 </div>
    //               )}
    //             </div>

    //             <Button
    //               type="submit"
    //               className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-200"
    //             >
    //               Change Password
    //             </Button>
    //           </form>
    //         </FormProvider>
    //       </CardContent>
    //     </Card>

    //     {/* Login History Table */}
    //     <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-2xl">
    //       <CardHeader>
    //         <CardTitle className="text-white flex items-center gap-2">
    //           <Clock className="w-5 h-5 text-cyan-400" />
    //           Login History
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Table>
    //           <TableHeader>
    //             <TableRow className="border-slate-600">
    //               <TableHead className="text-slate-300 font-semibold">Timestamp</TableHead>
    //               <TableHead className="text-slate-300 font-semibold">Device</TableHead>
    //               <TableHead className="text-slate-300 font-semibold">Location</TableHead>
    //               <TableHead className="text-slate-300 font-semibold">IP Address</TableHead>
    //               <TableHead className="text-slate-300 font-semibold">Status</TableHead>
    //             </TableRow>
    //           </TableHeader>
    //           <TableBody>
    //             {loginHistory.map((login) => (
    //               <TableRow key={login.id} className="border-slate-600 hover:bg-slate-700/50">
    //                 <TableCell className="text-white font-medium">
    //                   {login.timestamp}
    //                 </TableCell>
    //                 <TableCell className="text-slate-300 flex items-center gap-2">
    //                   <Monitor className="w-4 h-4" />
    //                   {login.device}
    //                 </TableCell>
    //                 <TableCell className="text-slate-300">{login.location}</TableCell>
    //                 <TableCell className="text-slate-300">{login.ipAddress}</TableCell>
    //                 <TableCell>
    //                   <Badge
    //                     className={
    //                       login.status === "Success"
    //                         ? "bg-green-500 text-white font-semibold"
    //                         : "bg-red-500 text-white font-semibold"
    //                     }
    //                   >
    //                     {login.status}
    //                   </Badge>
    //                 </TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
  );
};

export default Profile;
