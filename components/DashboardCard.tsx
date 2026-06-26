type DashboardCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  accentColor: string;
};

export function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  accentColor,
}: DashboardCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
        </div>

        <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${accentColor}`}>
          {icon}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600">{subtitle}</p>
    </div>
  );
}
