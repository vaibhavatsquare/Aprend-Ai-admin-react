"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ContentFilter from "./contentFilter";
import ContentList from "./contentList";
import { getMaterials } from "@/src/services/api/content.api";
import UploadMaterialModal from "./uploadMaterial";
import { educationLevels, subjects } from "@/src/libs/helpers";
import { StudyMaterial } from "@/src/libs/types/content.types";

const PAGE_LIMIT = 10;

const Library = () => {
    const [data, setData] = useState<StudyMaterial[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const [subject, setSubject] = useState("ALL");
    const [level, setLevel] = useState("ALL");

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const [openUpload, setOpenUpload] = useState(false);

    const isFirst = useRef(true);

    const ALL_SUBJECT_VALUES = subjects.map(s => s.value);
    const ALL_LEVEL_VALUES = educationLevels.map(e => e.value);

    const fetchData = async () => {
        try {
            setLoading(true);

            const subjectParam =
                subject === "ALL" ? ALL_SUBJECT_VALUES : [subject];

            const levelParam =
                level === "ALL" ? ALL_LEVEL_VALUES : [level];

            const res = await getMaterials({
                subjects: subjectParam,
                educationLevels: levelParam,
                skip: (page - 1) * PAGE_LIMIT,
                take: PAGE_LIMIT,
                search_column: ["name"],
                search,
                orderBy: "createdAt|desc",
            });

            setData(res?.list || []);
            setTotal(res?.total || 0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchData, 300);
        return () => clearTimeout(timer);
    }, [subject, level, page, search]);

    return (
        <div className="p-8 h-[calc(100vh-80px)] flex flex-col">

            {/* TOP SECTION */}
            <div className="flex flex-col gap-6">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-primaryText">
                        Content Library
                    </h1>

                    <Button
                        icon={<PlusOutlined />}
                        className="bg-primary! text-white! border-none!"
                        onClick={() => setOpenUpload(true)}
                    >
                        Upload Material
                    </Button>
                </div>

                {/* SEARCH */}
                <Input
                    placeholder="Search materials..."
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                    style={{ width: 250 }}
                />

                {/* FILTER */}
                <ContentFilter
                    subject={subject}
                    setSubject={(val: string) => {
                        setPage(1);
                        setSubject(val);
                    }}
                    level={level}
                    setLevel={(val: string) => {
                        setPage(1);
                        setLevel(val);
                    }}
                />

            </div>

            {/* TABLE SECTION (IMPORTANT) */}
            <div className="flex-1 mt-6 min-h-0">

                <ContentList
                    data={data}
                    loading={loading}
                    page={page}
                    total={total}
                    setPage={setPage}
                    pageSize={PAGE_LIMIT}
                    refresh={fetchData}
                />

            </div>

            <UploadMaterialModal
                open={openUpload}
                onClose={() => setOpenUpload(false)}
                refresh={fetchData}
            />

        </div>
    );
};

export default Library;