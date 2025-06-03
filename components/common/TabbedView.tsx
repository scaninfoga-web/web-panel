'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type TabData = {
  label: string;
  value: string;
  content: React.ReactNode;
};

type TabbedViewProps = {
  tabs: TabData[];
  defaultValue?: string;
};

export const TabbedView: React.FC<TabbedViewProps> = ({
  tabs,
  defaultValue,
}) => {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-2 rounded-lg border border-slate-800 bg-slate-900 p-1 text-white sm:w-auto sm:grid-cols-7 md:grid-cols-8">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
