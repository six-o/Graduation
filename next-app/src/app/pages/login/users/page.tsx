const res = await fetch("/api/users", {
    method: "GET",
    cache: "no-store", // 不要快取（避免資料延遲）
});
const users = await res.json();
export default function UsersPage() {
    return (
        <div className="flex flex-row items-start justify-center min-h-screen bg-gray-100 text-black gap-6 p-8">
            {/* 左邊：表格 */}
            <div>
                <h1 className="text-xl font-bold mb-4">使用者列表</h1>
                <table className="border-collapse border border-gray-300 w-80">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">
                                帳號
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                密碼
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter((user: any) => user.username !== null) // 過濾掉 admin 使用者
                        .map((user: any) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.username}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.password}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 右邊：按鈕區 */}
            <div className="mt-14">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow">
                    ➕ 新增使用者
                </button>
            </div>
        </div>
    );
}
