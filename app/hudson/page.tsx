'use client';

import {
  Activity,
  AlertCircle,
  CircleAlert,
  Computer,
  CreditCard,
  FileText,
  Info,
  Loader,
  Lock,
  Mail,
  MessageSquare,
  MonitorSmartphone,
  Phone,
  Search,
  Shield,
  ShieldAlert,
  User,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CustomProgress } from '@/components/ui/custom-progress';
import React from 'react';
import axios from 'axios';
import { useAppSelector } from '@/redux/hooks';
import { Alert } from '@/components/ui/alert';
import { hudsonDummyata, HudsonResponseType } from '@/types/hudson';
import { SearchBar2 } from '@/components/search/SearchBar2';
import { ContactInfo } from '@/components/pages/dashboard/components/ContactInfo';
import { EmailInfo } from '@/components/pages/dashboard/components/EmailInfo';

export default function Page() {
  const user = useAppSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('Detection 1');
  const [hudsonData, setHudsonData] = useState<HudsonResponseType | null>(
    hudsonDummyata,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<string>('');

  const handleSearch = async (query: string, filter: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hudson/get`,
        {
          params: {
            type: filter,
            value: query,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto mt-16 flex flex-1 flex-col gap-4 overflow-y-auto p-4 px-4 py-8 backdrop-blur-sm md:gap-8 md:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Hudson Dashboard</h1>
            <p className="text-gray-400">
              Monitor your security status and threats
            </p>
          </div>
        </div>

        <section className="py-6">
          <SearchBar2 onSearch={handleSearch} />

          {isLoading ? (
            <div className="mt-8">
              <Loader />
            </div>
          ) : (
            <>
              {searchType === 'phone' && <ContactInfo />}
              {searchType === 'email' && <EmailInfo />}
            </>
          )}
        </section>
      </div>

      <div className="border border-slate-800 bg-slate-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-emerald-500">
                Breach Intelligence Report
              </h1>
              <p className="text-gray-400">
                Data from Hudson Rock Security Analysis
              </p>
            </div>
          </div>

          <div className="mt-4 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg text-emerald-500">Breach {activeTab}</h1>
                <span className="flex space-x-1">
                  <p className="text-red-500">RedLine</p>
                  <p className="text-gray-400">malware detected</p>
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs
                value={activeTab}
                className="mt-4 w-full"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid h-auto w-full grid-cols-2 rounded-lg border border-slate-800 bg-slate-900 p-1 text-white sm:w-auto sm:grid-cols-2">
                  <TabsTrigger
                    value="Detection 1"
                    className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                  >
                    Detection 1
                  </TabsTrigger>
                  <TabsTrigger
                    value="Detection 2"
                    className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                  >
                    Detection 2
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="Detection 1" className="mt-6 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2 grid w-full items-stretch justify-between gap-4 md:grid-cols-2 lg:grid-cols-3"
                  >
                    <Card className="border-slate-900 bg-slate-950/50 text-white">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          System Information
                        </CardTitle>
                        <MonitorSmartphone className="h-4 w-4 text-emerald-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="flex w-full justify-between">
                          <span className="opacity-50">OS</span>
                          <span>
                            {hudsonData?.responseData.operatingSystem}
                          </span>
                        </div>
                        <div className="flex w-full justify-between">
                          <span className="opacity-50">device</span>
                          <span>{hudsonData?.responseData.computerName}</span>
                        </div>
                        <div className="flex w-full justify-between">
                          <span className="opacity-50">IP</span>
                          <span className="text-yellow-600">
                            {hudsonData?.responseData.ip}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-slate-900 bg-slate-950/50 text-white">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Security Status
                        </CardTitle>
                        <Shield className="h-4 w-4 text-emerald-500" />
                      </CardHeader>
                      <CardContent>
                        {hudsonData?.responseData.antiviruses.map(
                          (val, index) => (
                            <div
                              key={index}
                              className="w-fit rounded-full bg-emerald-700 px-4 text-sm text-emerald-300"
                            >
                              {val}
                            </div>
                          ),
                        )}
                      </CardContent>
                    </Card>
                    <Card className="border-slate-900 bg-slate-950/50 text-white">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Breach Statistics
                        </CardTitle>
                        <Users className="h-4 w-4 text-emerald-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="flex w-full justify-between">
                          <span className="opacity-50">Credentials</span>
                          <span>
                            {hudsonData?.responseData.credentials.length}
                          </span>
                        </div>
                        <div className="flex w-full justify-between">
                          <span className="opacity-50">Employee Domains</span>
                          <span>
                            {hudsonData?.responseData.employeeAt.length}
                          </span>
                        </div>
                        <div className="flex w-full justify-between">
                          <span className="opacity-50">Client Domains</span>
                          <span className="">
                            {hudsonData?.responseData.clientAt.length}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 gap-6"
                  >
                    <Card className="col-span-full border-slate-900 bg-slate-950/50 text-white lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <CircleAlert className="h-4 w-4 text-red-500" />
                          <span>Compromised Credentials</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 pb-6">
                          <span className="pl-4 text-start">Domain</span>
                          <span className="text-start">Username</span>
                          <span className="pl-12">Type</span>
                        </div>
                        <ScrollArea className="h-[300px] pr-4">
                          <div className="grid gap-2">
                            {hudsonData?.responseData.credentials.map(
                              (item, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 + index * 0.03 }}
                                  className="grid grid-cols-3 border-t border-gray-700 px-4 py-4 text-white"
                                >
                                  <div className="text-start">
                                    {item.domain}
                                  </div>
                                  <div className="text-start">
                                    {item.username}
                                  </div>
                                  <div className="ml-16">
                                    <span
                                      className={`rounded-full px-3 py-1 text-sm ${
                                        item.type === 'employee'
                                          ? 'bg-red-600/10 text-red-500'
                                          : 'bg-yellow-600/20 text-yellow-500'
                                      }`}
                                    >
                                      {item.type}
                                    </span>
                                  </div>
                                </motion.div>
                              ),
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="Detection 2" className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="gird-cols-1 grid gap-6 md:grid-cols-2"
                  >
                    <Card className="border-slate-900 bg-slate-950/50 text-white">
                      <CardHeader>
                        <CardTitle className="text-lg">Employee At</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {hudsonData?.responseData.employeeAt.map(
                            (val, index) => (
                              <div
                                key={index}
                                className="rounded-full bg-red-600/10 px-3 py-1 font-semibold text-red-500"
                              >
                                {val}
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-slate-900 bg-slate-950/50 text-white">
                      <CardHeader>
                        <CardTitle>Client At</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {hudsonData?.responseData.clientAt.map(
                            (val, index) => (
                              <div
                                key={index}
                                className="rounded-full bg-yellow-600/20 px-3 py-1 font-semibold text-yellow-500"
                              >
                                {val}
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
