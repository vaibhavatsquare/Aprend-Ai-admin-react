// "use client";

// import { Table, Button, Popconfirm, Pagination } from "antd";
// import { deleteMaterial } from "@/src/services/api/content.api";
// import { educationLevels, subjects } from "@/src/libs/helpers";

// export default function ContentList({
//     data,
//     refresh,
//     loading,
//     total,
//     page,
//     setPage,
//     pageSize,
// }: any) {

//     const handleDelete = async (id: string) => {
//         await deleteMaterial(id);
//         refresh();
//     };

//     const subjectMap = Object.fromEntries(
//         subjects.map(s => [s.value, s.label])
//     );

//     const levelMap = Object.fromEntries(
//         educationLevels.map(e => [e.value, e.label])
//     );

//     const columns = [
//         {
//             title: "Subject",
//             dataIndex: "subject",
//             render: (val: string) => subjectMap[val] || val,
//         },
//         {
//             title: "Education Level",
//             dataIndex: "educationLevel",
//             render: (val: string) => levelMap[val] || val,
//         },
//         {
//             title: "Name",
//             dataIndex: "name",
//         },
//         {
//             title: "File",
//             render: (r: any) => (
//                 <a href={r.fileUrl} target="_blank">
//                     View File
//                 </a>
//             ),
//         },
//         {
//             title: "Action",
//             render: (r: any) => (
//                 <Popconfirm
//                     title="Delete this material?"
//                     onConfirm={() => handleDelete(r.id)}
//                 >
//                     <Button danger size="small">
//                         Delete
//                     </Button>
//                 </Popconfirm>
//             ),
//         },
//     ];

//     return (
//         <div className="h-full flex flex-col bg-white rounded-xl p-4">

//             {/* TABLE AREA */}
//             <div className="flex-1 min-h-0 overflow-auto scrollbar">
//                 <Table
//                     rowKey="id"
//                     columns={columns}
//                     dataSource={data}
//                     loading={loading}
//                     pagination={false} // disable
//                     sticky
//                 />
//             </div>

//             {/* PAGINATION */}
//             <div className="flex justify-end pt-2 mb-[-20px]">
//                 <Pagination
//                     current={page}
//                     pageSize={pageSize}
//                     total={total}
//                     onChange={(p) => setPage(p)}
//                 />
//             </div>

//         </div>
//     );
// }

"use client";

import { Table, Button, Popconfirm, Pagination, message } from "antd";
import { deleteMaterial } from "@/src/services/api/content.api";

export default function ContentList({
    data,
    refresh,
    loading,
    total,
    page,
    setPage,
    pageSize,
}: any) {

    const handleDelete = async (id: string) => {
        try {
            await deleteMaterial(id);
            message.success("Material deleted successfully");
            refresh();
        } catch (err: any) {
            message.error(err?.message || "Failed to delete material");
        }
    };

    const formatLabel = (val: string) =>
        val
            ?.split("_")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ") || "—";

    const columns = [
        {
            title: "Subject",
            dataIndex: "subject",
            render: (val: string) => formatLabel(val),
        },
        {
            title: "Education Level",
            dataIndex: "educationLevel",
            render: (val: string) => formatLabel(val),
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (val: string | null) => val || "—",
        },
        {
            title: "File",
            render: (r: any) => (
                <a href={r.fileUrl} target="_blank" rel="noopener noreferrer">
                    View File
                </a>
            ),
        },
        {
            title: "Action",
            render: (r: any) => (
                <Popconfirm
                    title="Delete this material?"
                    onConfirm={() => handleDelete(r.id)}
                >
                    <Button danger size="small">
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="h-full flex flex-col bg-white rounded-xl p-4">

            {/* TABLE AREA */}
            <div className="flex-1 min-h-0 overflow-auto scrollbar">
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    pagination={false} // disable
                    sticky
                />
            </div>

            {/* PAGINATION */}
            <div className="flex justify-end pt-2 mb-[-20px]">
                <Pagination
                    current={page}
                    pageSize={pageSize}
                    total={total}
                    onChange={(p) => setPage(p)}
                />
            </div>

        </div>
    );
}