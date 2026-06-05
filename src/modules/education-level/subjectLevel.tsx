"use client";

import React, { useState, useEffect } from "react";
import { message, Spin, Button } from "antd";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { PiGraduationCap } from "react-icons/pi";
import { getSubjects, createSubject, updateSubject, deleteSubject, getUploadUrl, uploadFileToS3, type Subject as ApiSubject } from "@/src/services/api/educationLevel.api";

const SUBJECT_ICON_MAP: Record<string, string> = {
    MATHEMATICS: "🔢",
    SCIENCES: "🔬",
    SCIENCE_FOUNDATIONS: "🔬",
    PORTUGUESE_LITERATURE: "📖",
    HUMANITIES: "🌍",
    ENGLISH: "🗣️",
    ESSAY_BASICS: "✏️",
    CALCULUS_LINEAR_ALGEBRA: "📐",
    STATISTICS_RESEARCH: "📊",
    LOGIC_COMPUTING: "💻",
    ACADEMIC_WRITING: "📝",
    STUDY_PLANNING: "🗓️",
    ADVANCED_MATHEMATICS: "📐",
    ADVANCED_SCIENCES: "⚗️",
    TIMED_MOCK_EXAMS: "⏱️",
    ESSAY_ADVANCED: "✏️",
    GAMIFIED_LEARNING: "🎮",
    READING_WRITING: "📖",
    SCIENCE_NATURE: "🌱",
    HISTORY_GEOGRAPHY: "🌍",
    ENGLISH_BASICS: "🗣️",
    MATHEMATICS_FOUNDATIONS: "🔢",
    CONSTITUTIONAL_ADMINISTRATIVE_LAW: "⚖️",
    QUANTITATIVE_REASONING: "🔢",
    PORTUGUESE_CONCURSO: "📖",
    CURRENT_AFFAIRS_GEOGRAPHY: "🌍",
    LOGICAL_REASONING: "🧠",
    EXAM_SPECIFIC_MODULES: "🎯",
};
const getSubjectIcon = (code: string, imageUrl: string | null) =>
    imageUrl ?? SUBJECT_ICON_MAP[code] ?? "📚";

type Subject = {
    id: string;
    label: string;
    subtitle: string;
    icon: string;
};

const EditModal = ({
    isOpen, initialLabel, initialSubtitle, initialIcon, onClose, onSubmit, loading,
}: {
    isOpen: boolean; initialLabel: string; initialSubtitle: string;
    initialIcon: string; onClose: () => void; onSubmit: (label: string, subtitle: string, icon: string) => void; loading?: boolean;
}) => {
    const [label, setLabel] = React.useState(initialLabel);
    const [subtitle, setSubtitle] = React.useState(initialSubtitle);
    const [icon, setIcon] = React.useState(initialIcon);
    const [iconLoading, setIconLoading] = React.useState(false);

    React.useEffect(() => {
        setLabel(initialLabel);
        setSubtitle(initialSubtitle);
        setIcon(initialIcon);
    }, [initialLabel, initialSubtitle, initialIcon, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-semibold text-[#121212]">Edit Subject</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FiX size={18} /></button>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="w-[80px] h-[80px] rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#0F3057] transition-colors"
                        onClick={() => !iconLoading && document.getElementById("edit-subject-icon-input")?.click()}
                    >
                        {iconLoading ? (
                            <Spin size="small" />
                        ) : icon ? (
                            <img src={icon} alt="icon" className="w-full h-full object-cover rounded-2xl" />
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-1">
                                <FiPlus size={20} className="text-gray-400" />
                                <span className="text-gray-400 text-[10px] text-center">Upload Image</span>
                            </div>
                        )}
                    </div>
                    <input
                        id="edit-subject-icon-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                                setIconLoading(true);
                                const { preSignedUrl, outPutUrl } = await getUploadUrl(file.name);
                                await uploadFileToS3(preSignedUrl, file);
                                setIcon(outPutUrl);
                            } catch {
                                message.error("Failed to upload image");
                            } finally {
                                setIconLoading(false);
                            }
                        }}
                    />
                    <label className="text-[12px] text-gray-500">Icon Image</label>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="text-[12px] text-gray-500 mb-1 block">Title</label>
                        <input value={label} onChange={(e) => setLabel(e.target.value)}
                            className="w-full h-[44px] px-3 border border-gray-200 rounded-[10px] text-[14px] outline-none focus:border-[#0F3057]"
                            placeholder="Enter label" autoFocus />
                    </div>
                    <div>
                        <label className="text-[12px] text-gray-500 mb-1 block">Subtitle</label>
                        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full h-[44px] px-3 border border-gray-200 rounded-[10px] text-[14px] outline-none focus:border-[#0F3057]"
                            placeholder="Enter subtitle" />
                    </div>
                </div>
                <div className="flex gap-3 w-full">
                    <button onClick={onClose} style={{ height: "44px" }} className="flex-1 border border-gray-200 rounded-[12px] text-[14px] text-gray-600 hover:bg-gray-50">Cancel</button>
                    <div className="flex-1">
                        <Button onClick={() => onSubmit(label, subtitle, icon)} loading={loading} disabled={loading} style={{ height: "44px" }} className="w-full bg-[#0F3057]! text-white! border-none! rounded-[12px]! text-[14px] font-semibold">Save</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; loading?: boolean; }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-sm flex flex-col items-center gap-4 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <FiTrash2 size={20} className="text-red-500" />
                </div>
                <h3 className="text-[16px] font-semibold text-[#121212] text-center">Are you sure?</h3>
                <p className="text-[13px] text-gray-500 text-center">This action cannot be undone.</p>
                <div className="flex gap-3 w-full">
                    <button onClick={onClose} style={{ height: "44px" }} className="flex-1 border border-gray-200 rounded-[12px] text-[14px] text-gray-600 hover:bg-gray-50">Cancel</button>
                    <div className="flex-1">
                        <Button onClick={onConfirm} loading={loading} disabled={loading} style={{ height: "44px" }} className="w-full bg-red-500! text-white! border-none! rounded-[12px]! text-[14px] font-semibold">Delete</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AddModal = ({ isOpen, onClose, onSubmit, loading }: { isOpen: boolean; onClose: () => void; onSubmit: (label: string, subtitle: string, icon: string) => void; loading?: boolean; }) => {
    const [label, setLabel] = React.useState("");
    const [subtitle, setSubtitle] = React.useState("");
    const [icon, setIcon] = React.useState("");
    const [iconLoading, setIconLoading] = React.useState(false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!label.trim()) return;
        onSubmit(label, subtitle, icon);
        setLabel(""); setSubtitle(""); setIcon("📚");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-semibold text-[#121212]">Add Subject</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FiX size={18} /></button>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col items-center gap-2">
                       <div
                            className="w-[80px] h-[80px] rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#0F3057] transition-colors"
                            onClick={() => !iconLoading && document.getElementById("add-subject-icon-input")?.click()}
                        >
                            {iconLoading ? (
                                <Spin size="small" />
                            ) : icon ? (
                                <img src={icon} alt="icon" className="w-full h-full object-cover rounded-2xl" />
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <FiPlus size={20} className="text-gray-400" />
                                    <span className="text-gray-400 text-[10px] text-center">Upload Image</span>
                                </div>
                            )}
                        </div>
                        <input
                            id="add-subject-icon-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                    setIconLoading(true);
                                    const { preSignedUrl, outPutUrl } = await getUploadUrl(file.name);
                                    await uploadFileToS3(preSignedUrl, file);
                                    setIcon(outPutUrl);
                                } catch {
                                    message.error("Failed to upload image");
                                } finally {
                                    setIconLoading(false);
                                }
                            }}
                        />
                        <label className="text-[12px] text-gray-500">Icon Image</label>
                    </div>
                    <div>
                        <label className="text-[12px] text-gray-500 mb-1 block">Title</label>
                        <input value={label} onChange={(e) => setLabel(e.target.value)}
                            className="w-full h-[44px] px-3 border border-gray-200 rounded-[10px] text-[14px] outline-none focus:border-[#0F3057]"
                            placeholder="e.g. Mathematics" autoFocus />
                    </div>
                    <div>
                        <label className="text-[12px] text-gray-500 mb-1 block">Subtitle</label>
                        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full h-[44px] px-3 border border-gray-200 rounded-[10px] text-[14px] outline-none focus:border-[#0F3057]"
                            placeholder="e.g. Algebra, geometry and more" />
                    </div>
                </div>
                <div className="flex gap-3 w-full">
                    <button onClick={onClose} style={{ height: "44px" }} className="flex-1 border border-gray-200 rounded-[12px] text-[14px] text-gray-600 hover:bg-gray-50">Cancel</button>
                    <div className="flex-1">
                        <Button onClick={handleSubmit} loading={loading} disabled={!label.trim() || loading} style={{ height: "44px" }} className="w-full bg-[#0F3057]! text-white! border-none! rounded-[12px]! text-[14px] font-semibold">Add</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface SubjectLevelProps {
    levelTitle: string;
    educationLevelId: string;
    onBack: () => void;
}
// Main component
const SubjectLevel = ({ levelTitle, educationLevelId, onBack }: SubjectLevelProps) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<Subject | null>(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        fetchSubjects();
    }, [educationLevelId]);

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const handlePopState = () => {
            onBack();
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const data = await getSubjects(educationLevelId);
            const sorted = [...data.list].sort((a, b) => a.sortOrder - b.sortOrder);
            setSubjects(sorted.map((s: ApiSubject) => ({
                id: s.id,
                label: s.name,
                subtitle: s.topics?.join(" , ") ?? s.description ?? "",
                icon: getSubjectIcon(s.code, s.imageUrl),
            })));
        } catch {
            message.error("Failed to load subjects");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (newLabel: string, newSubtitle: string, newIcon: string) => {
        if (!selectedItem) return;
        try {
            setEditLoading(true);
            await updateSubject(selectedItem.id, {
                educationLevelId,
                code: selectedItem.id,
                name: newLabel,
                description: "",
                imageUrl: newIcon.startsWith("http") ? newIcon : null,
                topics: newSubtitle ? newSubtitle.split(" · ") : [],
                moduleType: "Core",
                sortOrder: subjects.indexOf(selectedItem) + 1,
                status: "ENABLED",
            });
            setSubjects((prev) => prev.map((s) => s.id === selectedItem.id
                ? { ...s, label: newLabel, subtitle: newSubtitle, icon: newIcon }
                : s));
            setShowEdit(false);
            message.success("Subject updated successfully");
        } catch {
            message.error("Failed to update subject");
        } finally {
            setEditLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedItem) return;
        try {
            setDeleteLoading(true);
            await deleteSubject(selectedItem.id);
            setSubjects((prev) => prev.filter((s) => s.id !== selectedItem.id));
            setShowDelete(false);
            message.success("Subject deleted successfully");
        } catch {
            message.error("Failed to delete subject");
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleAdd = async (label: string, subtitle: string, icon: string) => {
        try {
            setAddLoading(true);
            const created = await createSubject({
                educationLevelId,
                code: label.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, ""),
                name: label,
                description: "",
                imageUrl: icon.startsWith("http") ? icon : null,
                topics: subtitle ? subtitle.split(" · ") : [],
                moduleType: "Core",
            });
            setSubjects((prev) => [...prev, {
                id: created.id,
                label,
                subtitle,
                icon,
            }]);
            setShowAdd(false);
            message.success("Subject added successfully");
        } catch {
            message.error("Failed to add subject");
        } finally {
            setAddLoading(false);
        }
    };

    return (
        <>
            <div className="px-4">
                <div
                    className="h-[calc(100vh-100px)] mt-2 mb-4 rounded-[32px] col-span-2 flex flex-col gap-4 overflow-hidden"
                    style={{ boxShadow: "0px 0px 4px 0px #00000040", backgroundColor: "#F7F9FC" }}
                >
                    <div className="py-3 px-6 flex items-center relative">
                        <GoArrowLeft className="text-xl cursor-pointer absolute left-6" onClick={onBack} />
                        <h1 className="text-[22px] font-semibold text-primaryText w-full text-center">{levelTitle}</h1>
                        <button
                            onClick={() => setShowAdd(true)}
                            className="absolute right-6 flex items-center gap-2 h-[38px] px-4 bg-[#0F3057] text-white rounded-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity"
                        >
                            <FiPlus size={16} /> Add
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 scrollbar">
                        {loading ? (
                            <div className="flex items-center justify-center h-full w-full py-20">
                                <Spin size="large" />
                            </div>
                        ) : subjects.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                <PiGraduationCap className="text-gray-300 text-5xl" />
                                <p className="text-[14px] text-gray-400">No subjects yet</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 py-3">
                                {subjects.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between px-3 py-3 bg-white rounded-[20px]"
                                        style={{ boxShadow: "0px 0px 4px 0px #00000040", minHeight: "76px" }}
                                    >
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            <div className="w-[52px] h-[52px] rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-2xl overflow-hidden">
                                                {item.icon.startsWith("http") ? (
                                                    <img src={item.icon} alt={item.label} className="w-[25px] h-[25px] object-contain" />
                                                ) : (
                                                    <span>{item.icon}</span>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-[17px] font-medium text-[#121212] truncate">{item.label}</h3>
                                                <p className="text-[13px] text-gray-400 mt-0.5 truncate">{item.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                            <button
                                                onClick={() => { setSelectedItem(item); setShowEdit(true); }}
                                                className="flex items-center gap-1.5 px-3 h-[34px] rounded-[10px] bg-white text-[13px] font-normal text-[#121212] hover:shadow-md transition-all"
                                                style={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.10)" }}
                                            >
                                                <FiEdit2 size={14} /> Edit
                                            </button>
                                            <button
                                                onClick={() => { setSelectedItem(item); setShowDelete(true); }}
                                                className="flex items-center gap-1.5 px-3 h-[34px] rounded-[10px] bg-white text-[13px] font-normal text-[#121212] hover:shadow-md transition-all"
                                                style={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.10)" }}
                                            >
                                                <FiTrash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <EditModal
                isOpen={showEdit}
                initialLabel={selectedItem?.label || ""}
                initialSubtitle={selectedItem?.subtitle || ""}
                initialIcon={selectedItem?.icon || ""}
                onClose={() => setShowEdit(false)}
                onSubmit={handleEdit}
                loading={editLoading}
            />
            <DeleteModal isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} loading={deleteLoading} />
            <AddModal isOpen={showAdd} onClose={() => setShowAdd(false)} onSubmit={handleAdd} loading={addLoading} />
        </>
    );
};

export default SubjectLevel;