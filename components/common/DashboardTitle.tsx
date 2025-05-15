interface DashboardTitleProps {
  title: string;
  subTitle?: string;
}

export default function DashboardTitle({
  title,
  subTitle,
}: DashboardTitleProps) {
  return (
    <section>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-400">{subTitle}</p>
    </section>
  );
}
