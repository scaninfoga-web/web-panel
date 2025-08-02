import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function ToolsPage() {
  return (
    <div className="flex flex-col">
      {/* here section */}
      <div className="flex h-[95vh] items-center">
        <div className="pl-16 lg:pl-32">
          <Title title="Scaninfoga" />
          <Title title="OSINT" className="text-emerald-500" />
          <Title title="Intelligence" />
          <Description
            description="Future-ready OSINT tools for crime investigation, employee
            background checks, and digital intelligence."
            className="max-w-[55vw] pt-8"
          />
          <div className="flex gap-x-1 pt-8">
            <ToolsButton title="Start Investigation" className="max-w-52" />
            <ToolsButton title="Explore Services" className="max-w-64" />
          </div>
        </div>
      </div>

      {/* introduction */}
      <div className="flex h-[80vh]">
        <div className="px-16 lg:px-32">
          <Title title="Introduction" className="text-5xl" />
          <Title
            title="Welcome to the Future investigation"
            className="text-2xl text-emerald-500"
          />
          <div className="max-w-[50vw] pt-6">
            <Description description="Scaninfoga Solution Private Limited is a technology company that specializes in providing cyber security solutions and services. The company focuses on developing tools and software aimed at enhancing digital security, particulary in realm of information gathering and reconnaissance" />
            <Description description="Their offerings are designed to assist organizations in identifying vulnerabilities within their systems and protecting against potential cyber threats. " />
          </div>
        </div>
      </div>

      {/* tool 1 */}
      <div className="flex h-[80vh] flex-col">
        <div>
          <Title
            title="Mobile Number SIM Card Analysis Tool"
            className="w-full text-center text-3xl text-emerald-400"
          />
          <Description
            className="px-72 pt-2 text-start text-xl"
            description="Ever wondered what SIM card information is behind a mobile number? Our powerful tool gives you secure and real-time access to telecom-related metadata for any mobile number in India."
          />
        </div>
      </div>
    </div>
  );
}

function ToolsButton({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <Button
      className={cn(
        'shadow-[0px_1px_2px_0px_rgba(255,183,124,0.1)]_inset, 0px_-1px_2px_0px_rgba(255,183,124,0.1)_inset group relative rounded-3xl bg-emerald-700 py-6 text-lg text-white hover:bg-emerald-800',
        className,
      )}
      size={'sm'}
    >
      {title}
      <span className="absolute inset-x-0 -bottom-[2px] mx-auto h-[3px] w-3/4 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></span>
      <span className="absolute inset-x-0 -bottom-[2px] mx-auto h-[6px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"></span>
    </Button>
  );
}

function Title({ title, className }: { title: string; className?: string }) {
  return <h1 className={cn('text-6xl font-bold', className)}>{title}</h1>;
}

function Description({
  description,
  className,
}: {
  description: string;
  className?: string;
}) {
  return (
    <p className={cn('text-2xl font-light text-gray-400', className)}>
      {description}
    </p>
  );
}
