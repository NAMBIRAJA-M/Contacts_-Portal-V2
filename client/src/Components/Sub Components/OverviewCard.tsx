interface OverviewCardProps {
  heading: string;
  value: string | number;
  src: string;
  description: string;
  trend: string;
  trendType: "positive" | "negative" | "neutral";
}

function OverviewCard({
  heading,
  value,
  src,
  description,
  trend,
  trendType,
}: OverviewCardProps) {
  const trendColors = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <div className="flex flex-col justify-between card-surface border rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-4 w-full sm:min-w-[180px] sm:max-w-[260px]">
      <div className="flex items-center gap-3">
        <div className="p-2 avatar-surface rounded-full flex items-center justify-center">
          <img src={src} alt={heading} className="w-8 h-8" />
        </div>
        <h3 className="text-sm font-medium card-heading">{heading}</h3>
      </div>

      <div className="mt-3">
        <p className="text-2xl font-semibold card-value">{value}</p>
        <p className="text-sm card-muted mt-1">{description}</p>
      </div>

      <div
        className={`mt-3 inline-block text-xs font-medium px-2 py-1 rounded-full ${trendColors[trendType]}`}
      >
        {trend}
      </div>
    </div>
  );
}

export default OverviewCard;
