"use client";

import { Table, Button, Popconfirm, Pagination } from "antd";
import { deleteMaterial } from "@/src/services/api/content.api";
import { educationLevels, subjects } from "@/src/libs/helpers";

export default function ContentList({
    data,
    refresh,
    loading,
    setPage,
    pageSize,
}: any) {

    const handleDelete = async (id: string) => {
        await deleteMaterial(id);
        refresh();
    };

    const subjectMap = Object.fromEntries(
        subjects.map(s => [s.value, s.label])
    );

    const levelMap = Object.fromEntries(
        educationLevels.map(e => [e.value, e.label])
    );

    const columns = [
        {
            title: "Subject",
            dataIndex: "subject",
            render: (val: string) => subjectMap[val] || val,
        },
        {
            title: "Education Level",
            dataIndex: "educationLevel",
            render: (val: string) => levelMap[val] || val,
        },
        {
            title: "File",
            render: (r: any) => (
                <a href={r.fileUrl} target="_blank">
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
            <div className="flex-1 min-h-0 overflow-auto">
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
                    pageSize={pageSize}
                    onChange={(p) => setPage(p)}
                />
            </div>

        </div>
    );
}