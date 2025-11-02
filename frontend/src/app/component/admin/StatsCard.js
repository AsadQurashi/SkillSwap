const colorClasses = {
  blue: "bg-blue-50 border-blue-200 text-blue-600",
  green: "bg-green-50 border-green-200 text-green-600",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-600",
  red: "bg-red-50 border-red-200 text-red-600",
  purple: "bg-purple-50 border-purple-200 text-purple-600",
};

export default function StatsCard({title , value , icon , color='blue' , subtitle})
{
    return (
        <div className={`border rounded-lg p-6 ${colorClasses[color]}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium opacity-75">{title}</p>
                    <p className="text-3xl font-bold mt-2">{value || 0}</p>
                    {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
                </div>
                <div className="text-3xl opacity-75">{icon}</div>
            </div>
        </div>
    );
}