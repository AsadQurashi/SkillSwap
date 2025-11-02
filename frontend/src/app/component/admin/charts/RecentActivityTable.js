import { formatDistanceToNow } from "date-fns"; 
export default function RecentActivityTable({ activities }) {
    if (!activities || activities.length === 0)
    {
        return (
            <div className="text-center py-8 text-gray-500">
                No recent activity found
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Admin
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resource
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {activities.map((items) => (
                        <tr key={items.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {items.admin_name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {items.action}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {items.resource_type} #{items.resource_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDistanceToNow(new Date(items.created_at), {
                                    addSuffix: true,
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}