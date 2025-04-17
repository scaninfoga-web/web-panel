import { Card } from "@/components/ui/card"
import { DashboardCard, InfoText, StatusBadge } from "./DashboardCard"
import { Progress } from "@/components/ui/progress"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
    Shield, 
    Share2, 
    Key, 
    Globe, 
    Activity, 
    AlertTriangle,
    LineChart,
    PieChart as PieChartIcon
} from 'lucide-react';

const activityData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 28 },
  { name: 'Apr', value: 65 },
  { name: 'May', value: 35 },
  { name: 'Jun', value: 49 },
];

const breachData = [
  { name: 'Passwords', value: 40 },
  { name: 'Personal Info', value: 30 },
  { name: 'Financial', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B'];

export function EmailInfo() {
    return (
        <>
            <Card className="bg-[#0e1421] border border-gray-700 shadow-xl p-6 my-6">
                <h1 className="text-2xl font-bold text-emerald-500">Email Intelligence</h1>
                <p className="text-sm mt-1 text-gray-400">john.doe@example.com</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-400">First Seen</p>
                        <p className="text-base font-medium">March 15, 2020</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Last Active</p>
                        <p className="text-base font-medium">2 hours ago</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Risk Level</p>
                        <p className="text-base font-medium text-yellow-500">Medium</p>
                    </div>
                </div>
            </Card>
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Activity Timeline" icon={<LineChart className="h-5 w-5 text-emerald-500" />} className="col-span-2">
                    <div className="h-[200px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151'
                                    }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#10B981" 
                                    fillOpacity={1} 
                                    fill="url(#colorActivity)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>

                <DashboardCard title="Breach Data Distribution" icon={<PieChartIcon className="h-5 w-5 text-emerald-500" />}>
                    <div className="h-[200px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={breachData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}%`}
                                    labelLine={false}
                                >
                                    {breachData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        color: '#E5E7EB'
                                    }}
                                    itemStyle={{
                                        color: '#E5E7EB'
                                    }}
                                    labelStyle={{
                                        color: '#E5E7EB'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>

                <DashboardCard title="Data Breaches" icon={<Shield className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="Total Breaches" value="3 known breaches" />
                    <InfoText label="Last Breach" value="December 2022" />
                    <StatusBadge status="Compromised" variant="outline" />
                </DashboardCard>

                <DashboardCard title="Social Profiles" icon={<Share2 className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="LinkedIn" value="linkedin.com/in/johndoe" />
                    <InfoText label="Twitter" value="@johndoe" />
                    <InfoText label="GitHub" value="github.com/johndoe" />
                </DashboardCard>

                <DashboardCard title="Password Status" icon={<Key className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="Strength" value="Strong" />
                    <InfoText label="Last Changed" value="45 days ago" />
                    <StatusBadge status="Secure" />
                </DashboardCard>

                <DashboardCard title="Domain Intelligence" icon={<Globe className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="Domain Age" value="15 years" />
                    <InfoText label="DNS Records" value="MX, SPF, DKIM verified" />
                    <StatusBadge status="Legitimate" />
                </DashboardCard>

                <DashboardCard title="Activity Pattern" icon={<Activity className="h-5 w-5 text-emerald-500" />}>
                    <InfoText label="Login Locations" value="5 different countries" />
                    <InfoText label="Suspicious Activity" value="2 alerts this month" />
                    <StatusBadge status="Monitor" variant="outline" />
                </DashboardCard>

                <DashboardCard title="Threat Score" icon={<AlertTriangle className="h-5 w-5 text-emerald-500" />}>
                    <Progress value={45} className="h-4 bg-[#27323c]" />
                    <p className="text-right text-sm text-emerald-500">45%</p>
                </DashboardCard>

                {/* Keep your existing cards */}
                {/* ... rest of your existing cards ... */}
            </div>
        </>
    )
}