'use client';

import {
  Activity,
  AlertCircle,
  CreditCard,
  FileText,
  Info,
  Lock,
  Mail,
  MessageSquare,
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

// Add these interfaces before the Dashboard component
interface CardItem {
  label: string;
  value: string;
  highlighted?: boolean;
}

interface DetailCard {
  title: string;
  description: string;
  delay: number;
  data: CardItem[];
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('username');
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement your search logic here based on searchFilter
    console.log(`Searching for ${query} in ${searchFilter}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a0e17]">
        <div className="flex flex-col items-center gap-4">
          <Shield className="h-12 w-12 animate-pulse text-emerald-500" />
          <h1 className="text-2xl font-bold text-white">ScanInfoga</h1>
          <CustomProgress value={progress} className="w-[300px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 flex flex-1 flex-col gap-4 p-4 px-4 py-8 md:gap-8 md:p-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Security Dashboard</h1>
            <p className="text-gray-400">
              Monitor your security status and threats
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select value={searchFilter} onValueChange={setSearchFilter}>
            <SelectTrigger className="w-[150px] border-gray-700 bg-gray-900/50">
              <SelectValue placeholder="Search by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="username">Username</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="ip">IP Address</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder={`Search by ${searchFilter}...`}
              className="w-full rounded-md border border-gray-700 bg-gray-900/50 py-2 pl-10 pr-4 text-white transition-colors placeholder:text-gray-500 hover:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
          >
            Search
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-800 bg-slate-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Security Score
              </CardTitle>
              <ShieldAlert className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78/100</div>
              <p className="text-xs text-slate-400">3 issues need attention</p>
              <CustomProgress value={78} className="mt-3" />
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Infected Credentials
              </CardTitle>
              <Lock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-slate-400">
                Last detected: 2 days ago
              </p>
              <CustomProgress value={25} className="mt-3" variant="danger" />
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Connected Accounts
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-slate-400">All accounts secure</p>
              <CustomProgress value={100} className="mt-3" />
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
              <Activity className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12h ago</div>
              <p className="text-xs text-slate-400">Next scan in 12h</p>
              <CustomProgress value={50} className="mt-3" />
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid h-auto w-full grid-cols-5 rounded-lg border border-slate-800 bg-slate-900 p-1 text-white sm:w-auto sm:grid-cols-5">
            <TabsTrigger
              value="overview"
              className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="personal"
              className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
            >
              Personal
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
            >
              Financial
            </TabsTrigger>
            <TabsTrigger
              value="digital"
              className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
            >
              Digital
            </TabsTrigger>
            <TabsTrigger
              value="threats"
              className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
            >
              Threats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-full border-slate-800 bg-slate-900 text-white lg:col-span-2">
                <CardHeader>
                  <CardTitle>Security Overview</CardTitle>
                  <CardDescription className="text-slate-400">
                    Summary of your security status across all monitored data
                    points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="grid gap-4">
                      {[
                        {
                          name: 'Account Details',
                          status: 'Secure',
                          icon: User,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'Bank Address',
                          status: 'Secure',
                          icon: CreditCard,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'Employee Status',
                          status: 'Verified',
                          icon: Users,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'ESIC History',
                          status: 'Complete',
                          icon: FileText,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'Google Account',
                          status: 'Warning',
                          icon: Mail,
                          color: 'text-amber-500',
                        },
                        {
                          name: 'Infected Credentials',
                          status: 'Alert',
                          icon: ShieldAlert,
                          color: 'text-red-500',
                        },
                        {
                          name: 'Info Stealer Intelligence',
                          status: 'Secure',
                          icon: Shield,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'LPG Gas Info',
                          status: 'Verified',
                          icon: Info,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'Mobile Email Detection',
                          status: 'Secure',
                          icon: Mail,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'Mobile Details',
                          status: 'Secure',
                          icon: Phone,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'Multiple UPI IDs',
                          status: 'Warning',
                          icon: CreditCard,
                          color: 'text-amber-500',
                        },
                        {
                          name: 'UAN Passbook',
                          status: 'Secure',
                          icon: FileText,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'User Attributes',
                          status: 'Secure',
                          icon: User,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'WhatsApp Data',
                          status: 'Secure',
                          icon: MessageSquare,
                          color: 'text-emerald-500',
                        },
                        {
                          name: 'Gmail Data',
                          status: 'Warning',
                          icon: Mail,
                          color: 'text-amber-500',
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.03 }}
                          className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`rounded-full bg-slate-800 p-2 ${item.color}`}
                            >
                              <item.icon className="h-4 w-4" />
                            </div>
                            <span>{item.name}</span>
                          </div>
                          <Badge
                            className={` ${
                              item.status === 'Secure'
                                ? 'bg-emerald-500/20 text-emerald-500'
                                : item.status === 'Warning'
                                  ? 'bg-amber-500/20 text-amber-500'
                                  : item.status === 'Alert'
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-emerald-500/20 text-emerald-500'
                            } `}
                          >
                            {item.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription className="text-slate-400">
                    Latest security issues detected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-3 rounded-lg border border-red-900/50 bg-red-950/20 p-3"
                      >
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-red-500">
                            Infected Credentials Detected
                          </p>
                          <p className="text-xs text-slate-400">
                            Your email password was found in a data breach
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            2 days ago
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex gap-3 rounded-lg border border-amber-900/50 bg-amber-950/20 p-3"
                      >
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium text-amber-500">
                            Multiple UPI IDs Warning
                          </p>
                          <p className="text-xs text-slate-400">
                            Unusual number of UPI IDs linked to your account
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            3 days ago
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-3 rounded-lg border border-amber-900/50 bg-amber-950/20 p-3"
                      >
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium text-amber-500">
                            Google Account Warning
                          </p>
                          <p className="text-xs text-slate-400">
                            Unusual login activity detected
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            5 days ago
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Full Name</p>
                        <p className="font-medium">John Doe</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Date of Birth</p>
                        <p className="font-medium">15 Jan 1985</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Gender</p>
                        <p className="font-medium">Male</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Nationality</p>
                        <p className="font-medium">Indian</p>
                      </div>
                    </div>
                    <Separator className="bg-slate-800" />
                    <div>
                      <p className="text-xs text-slate-400">Address</p>
                      <p className="font-medium">
                        123 Main Street, Apartment 4B
                      </p>
                      <p className="font-medium">Mumbai, Maharashtra 400001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Employee Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Company</p>
                        <p className="font-medium">Acme Corporation</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Position</p>
                        <p className="font-medium">Senior Developer</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Employee ID</p>
                        <p className="font-medium">EMP-2023-0042</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Join Date</p>
                        <p className="font-medium">03 Mar 2020</p>
                      </div>
                    </div>
                    <Separator className="bg-slate-800" />
                    <div>
                      <p className="text-xs text-slate-400">Status</p>
                      <Badge className="mt-1 bg-emerald-500/20 text-emerald-500">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>ESIC History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800">
                        <TableHead className="text-slate-400">Period</TableHead>
                        <TableHead className="text-slate-400">
                          Contribution
                        </TableHead>
                        <TableHead className="text-slate-400">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          period: 'Jan-Mar 2023',
                          contribution: '₹4,500',
                          status: 'Paid',
                        },
                        {
                          period: 'Apr-Jun 2023',
                          contribution: '₹4,500',
                          status: 'Paid',
                        },
                        {
                          period: 'Jul-Sep 2023',
                          contribution: '₹4,500',
                          status: 'Paid',
                        },
                        {
                          period: 'Oct-Dec 2023',
                          contribution: '₹4,500',
                          status: 'Paid',
                        },
                      ].map((item) => (
                        <TableRow
                          key={item.period}
                          className="border-slate-800"
                        >
                          <TableCell>{item.period}</TableCell>
                          <TableCell>{item.contribution}</TableCell>
                          <TableCell>
                            <Badge className="bg-emerald-500/20 text-emerald-500">
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>User Attributes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">PAN Number</p>
                        <p className="font-medium">ABCDE1234F</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Aadhaar Number</p>
                        <p className="font-medium">XXXX-XXXX-1234</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Voter ID</p>
                        <p className="font-medium">ABC1234567</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Passport Number
                        </p>
                        <p className="font-medium">J1234567</p>
                      </div>
                    </div>
                    <Separator className="bg-slate-800" />
                    <div>
                      <p className="text-xs text-slate-400">
                        Verification Status
                      </p>
                      <Badge className="mt-1 bg-emerald-500/20 text-emerald-500">
                        Verified
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Bank Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Bank Name</p>
                        <p className="font-medium">HDFC Bank</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Branch</p>
                        <p className="font-medium">Andheri East</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">IFSC Code</p>
                        <p className="font-medium">HDFC0001234</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Account Type</p>
                        <p className="font-medium">Savings</p>
                      </div>
                    </div>
                    <Separator className="bg-slate-800" />
                    <div>
                      <p className="text-xs text-slate-400">Address</p>
                      <p className="font-medium">Plot No. 42, Andheri East</p>
                      <p className="font-medium">Mumbai, Maharashtra 400069</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Multiple UPI IDs</CardTitle>
                  <Badge className="bg-amber-500/20 text-amber-500">
                    Warning
                  </Badge>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800">
                        <TableHead className="text-slate-400">UPI ID</TableHead>
                        <TableHead className="text-slate-400">Bank</TableHead>
                        <TableHead className="text-slate-400">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 'john@hdfcbank',
                          bank: 'HDFC Bank',
                          status: 'Active',
                        },
                        {
                          id: 'john@sbi',
                          bank: 'State Bank of India',
                          status: 'Active',
                        },
                        {
                          id: 'john@icici',
                          bank: 'ICICI Bank',
                          status: 'Active',
                        },
                        {
                          id: 'john@ybl',
                          bank: 'Yes Bank',
                          status: 'Suspicious',
                        },
                        {
                          id: 'john@paytm',
                          bank: 'Paytm Payments Bank',
                          status: 'Suspicious',
                        },
                      ].map((item) => (
                        <TableRow key={item.id} className="border-slate-800">
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.bank}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                item.status === 'Active'
                                  ? 'bg-emerald-500/20 text-emerald-500'
                                  : 'bg-red-500/20 text-red-500'
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 rounded-lg border border-amber-900/50 bg-amber-950/20 p-3">
                    <p className="text-xs text-amber-500">
                      Warning: Unusual number of UPI IDs detected. Please verify
                      all linked accounts.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>UAN Passbook</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">UAN Number</p>
                        <p className="font-medium">1234567890123</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Member ID</p>
                        <p className="font-medium">
                          MH/BAN/1234567/000/0000123
                        </p>
                      </div>
                    </div>
                    <Separator className="bg-slate-800" />
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-800">
                          <TableHead className="text-slate-400">
                            Month
                          </TableHead>
                          <TableHead className="text-slate-400">
                            Contribution
                          </TableHead>
                          <TableHead className="text-slate-400">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            month: 'Mar 2023',
                            contribution: '₹1,800',
                            status: 'Credited',
                          },
                          {
                            month: 'Feb 2023',
                            contribution: '₹1,800',
                            status: 'Credited',
                          },
                          {
                            month: 'Jan 2023',
                            contribution: '₹1,800',
                            status: 'Credited',
                          },
                          {
                            month: 'Dec 2022',
                            contribution: '₹1,800',
                            status: 'Credited',
                          },
                        ].map((item) => (
                          <TableRow
                            key={item.month}
                            className="border-slate-800"
                          >
                            <TableCell>{item.month}</TableCell>
                            <TableCell>{item.contribution}</TableCell>
                            <TableCell>
                              <Badge className="bg-emerald-500/20 text-emerald-500">
                                {item.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>LPG Gas Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">
                          Consumer Number
                        </p>
                        <p className="font-medium">123456789012</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Distributor</p>
                        <p className="font-medium">Bharat Gas</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Connection Type
                        </p>
                        <p className="font-medium">Domestic</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Subsidy Status</p>
                        <p className="font-medium">Active</p>
                      </div>
                    </div>
                    <Separator className="bg-slate-800" />
                    <div>
                      <p className="text-xs text-slate-400">Last Booking</p>
                      <p className="font-medium">15 Mar 2023</p>
                      <p className="mt-2 text-xs text-slate-400">
                        Last Delivery
                      </p>
                      <p className="font-medium">18 Mar 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="digital" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Google Account Attributes</CardTitle>
                  <Badge className="bg-amber-500/20 text-amber-500">
                    Warning
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Email</p>
                        <p className="font-medium">john.doe@gmail.com</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Recovery Email</p>
                        <p className="font-medium">j.doe@outlook.com</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">2FA Status</p>
                        <Badge className="bg-emerald-500/20 text-emerald-500">
                          Enabled
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Last Password Change
                        </p>
                        <p className="font-medium">45 days ago</p>
                      </div>
                    </div>
                    <Separator className="bg-slate-800" />
                    <div className="rounded-lg border border-amber-900/50 bg-amber-950/20 p-3">
                      <p className="text-xs text-amber-500">
                        Warning: Unusual login activity detected from Mumbai,
                        India on April 15, 2023.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Mobile Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Phone Number</p>
                        <p className="font-medium">+91 98765 43210</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Service Provider
                        </p>
                        <p className="font-medium">Jio</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Connection Type
                        </p>
                        <p className="font-medium">Postpaid</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">KYC Status</p>
                        <Badge className="bg-emerald-500/20 text-emerald-500">
                          Verified
                        </Badge>
                      </div>
                    </div>
                    <Separator className="bg-slate-800" />
                    <div>
                      <p className="text-xs text-slate-400">Linked Services</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge className="bg-slate-800 text-white">
                          WhatsApp
                        </Badge>
                        <Badge className="bg-slate-800 text-white">
                          Google
                        </Badge>
                        <Badge className="bg-slate-800 text-white">
                          Banking
                        </Badge>
                        <Badge className="bg-slate-800 text-white">UPI</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Mobile Email Account Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800">
                        <TableHead className="text-slate-400">Email</TableHead>
                        <TableHead className="text-slate-400">
                          Provider
                        </TableHead>
                        <TableHead className="text-slate-400">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          email: 'john.doe@gmail.com',
                          provider: 'Gmail',
                          status: 'Primary',
                        },
                        {
                          email: 'john.work@gmail.com',
                          provider: 'Gmail',
                          status: 'Secondary',
                        },
                        {
                          email: 'j.doe@outlook.com',
                          provider: 'Outlook',
                          status: 'Recovery',
                        },
                        {
                          email: 'john@company.com',
                          provider: 'Exchange',
                          status: 'Work',
                        },
                      ].map((item) => (
                        <TableRow key={item.email} className="border-slate-800">
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.provider}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                item.status === 'Primary'
                                  ? 'bg-emerald-500/20 text-emerald-500'
                                  : 'bg-slate-800 text-white'
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Social Media Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">WhatsApp</p>
                          <p className="text-xs text-slate-400">
                            +91 98765 43210
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-500">
                        Secure
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">Gmail</p>
                          <p className="text-xs text-slate-400">
                            john.doe@gmail.com
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-500">
                        Warning
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Facebook</p>
                          <p className="text-xs text-slate-400">john.doe</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-500">
                        Secure
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Instagram</p>
                          <p className="text-xs text-slate-400">@john.doe</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-500">
                        Secure
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="threats" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="col-span-full border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Infected Credentials</CardTitle>
                  <Badge className="bg-red-500/20 text-red-500">Alert</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-4">
                      <h3 className="text-lg font-semibold text-red-500">
                        Critical Security Alert
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Your email password was found in a data breach. This
                        means your account may be compromised.
                      </p>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs text-slate-400">
                            Affected Account
                          </p>
                          <p className="font-medium">john.doe@gmail.com</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Breach Date</p>
                          <p className="font-medium">April 16, 2023</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">
                            Breach Source
                          </p>
                          <p className="font-medium">Unknown Forum Data Leak</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Data Exposed</p>
                          <p className="font-medium">Email, Password</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="bg-red-500 text-white hover:bg-red-600">
                          Change Password Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Info Stealer Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Last Scan</p>
                        <p className="font-medium">April 18, 2023</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Threats Detected
                        </p>
                        <p className="font-medium">0</p>
                      </div>
                    </div>
                    <Separator className="bg-slate-800" />
                    <div>
                      <p className="text-xs text-slate-400">
                        Protection Status
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-emerald-500" />
                        <p className="font-medium text-emerald-500">
                          Protected
                        </p>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">
                        Your accounts are currently protected against known info
                        stealers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Security Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg border border-amber-900/50 bg-amber-950/20 p-3">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium text-amber-500">
                          Change Gmail Password
                        </p>
                        <p className="text-xs text-slate-400">
                          Your password was found in a data breach
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-amber-900/50 bg-amber-950/20 p-3">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium text-amber-500">
                          Verify UPI IDs
                        </p>
                        <p className="text-xs text-slate-400">
                          Remove suspicious UPI IDs from your account
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                      <Info className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium">
                          Enable 2FA on All Accounts
                        </p>
                        <p className="text-xs text-slate-400">
                          Add an extra layer of security
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                      <Info className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium">Use a Password Manager</p>
                        <p className="text-xs text-slate-400">
                          Generate and store strong passwords
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
