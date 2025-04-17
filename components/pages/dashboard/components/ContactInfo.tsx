import { Card } from "@/components/ui/card"
import { DashboardCard, InfoText, StatusBadge } from "./DashboardCard"
import { Progress } from "@/components/ui/progress"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CreditCard, Fingerprint, FileText, Wallet, Mail, AlertTriangle, LineChart, BarChart as BarChartIcon } from 'lucide-react';

const transactionData = [
  { name: 'Jan', amount: 12000 },
  { name: 'Feb', amount: 19000 },
  { name: 'Mar', amount: 15000 },
  { name: 'Apr', amount: 22000 },
  { name: 'May', amount: 18000 },
  { name: 'Jun', amount: 25000 },
];

const locationData = [
  { city: 'Delhi', transactions: 45 },
  { city: 'Mumbai', transactions: 32 },
  { city: 'Bangalore', transactions: 28 },
  { city: 'Hyderabad', transactions: 15 },
  { city: 'Chennai', transactions: 20 },
];

export function ContactInfo() {
    return (
        <>
            <Card className="bg-[#0e1421] border border-gray-700 shadow-xl p-6 my-6">
                <h1 className="text-2xl font-bold text-emerald-500">Phone Number Summary</h1>
                <p className="text-sm mt-1 text-gray-400">+91 9876543210</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-400">Name</p>
                        <p className="text-base font-medium">Ramesh Kumar</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Carrier</p>
                        <p className="text-base font-medium">Jio 4G</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-base font-medium">New Delhi, India</p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                              {/* Transaction Timeline Chart */}
                              <DashboardCard title="Transaction History" icon={<LineChart className="h-5 w-5 text-emerald-500" />} className="col-span-2">
                    <div className="h-[200px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={transactionData}>
                                <defs>
                                    <linearGradient id="colorTransaction" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        color: '#E5E7EB'
                                    }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="amount" 
                                    stroke="#10B981" 
                                    fillOpacity={1} 
                                    fill="url(#colorTransaction)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>

                {/* Location Distribution Chart */}
                <DashboardCard title="Transaction Locations" icon={<BarChartIcon className="h-5 w-5 text-emerald-500" />}>
                    <div className="h-[200px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={locationData}>
                                <XAxis dataKey="city" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip
                                    contentStyle={{ 
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        color: '#E5E7EB'
                                    }}
                                />
                                <Bar dataKey="transactions" fill="#10B981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>

                <DashboardCard title="Bank Account" icon={<CreditCard className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="Account" value="SBI xxxxx1234" />
                    <InfoText label="Status" value="Linked on: 12 March 2021" />
                    <StatusBadge status="Verified" />
                </DashboardCard>

                <DashboardCard title="Aadhaar" icon={<Fingerprint className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="Number" value="XXXX-XXXX-1234" />
                    <InfoText label="Birth Date" value="DOB: 15 June 1990" />
                    <StatusBadge status="Linked" variant="outline" />
                </DashboardCard>

                <DashboardCard title="PAN" icon={<FileText className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="Number" value="ABCDE1234F" />
                    <InfoText label="Status" value="Status: Verified" />
                </DashboardCard>

                <DashboardCard title="UPI" icon={<Wallet className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="ID" value="ramesh@okaxis" />
                </DashboardCard>

                <DashboardCard title="Email" icon={<Mail className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="Address" value="ramesh.k@gmail.com" />
                </DashboardCard>

                <DashboardCard title="Risk Score" icon={<AlertTriangle className="h-5 w-5 text-emerald-500" />}>
                    <Progress value={82} className="h-4 bg-[#27323c]" />
                    <p className="text-right text-sm text-emerald-500">82%</p>
                </DashboardCard>

                </div></>
    );
}