"use client";

import React, { useState } from "react";
import { message } from "antd";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { PiGraduationCap } from "react-icons/pi";

type Subject = {
    id: string;
    label: string;
    subtitle: string;
    icon: string;
};

const EditModal = ({
    isOpen, initialLabel, initialSubtitle, initialIcon, onClose, onSubmit,
}: {
    isOpen: boolean; initialLabel: string; initialSubtitle: string;
    initialIcon: string; onClose: () => void; onSubmit: (label: string, subtitle: string, icon: string) => void;
}) => {
    const [label, setLabel] = React.useState(initialLabel);
    const [subtitle, setSubtitle] = React.useState(initialSubtitle);
    const [icon, setIcon] = React.useState(initialIcon);

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
                    <div className="w-[80px] h-[80px] rounded-2xl bg-gray-50 flex items-center justify-center text-[48px]">
                        {icon}
                    </div>
                    <div>
                        <label className="text-[12px] text-gray-500 mb-1 block text-center">Icon (emoji)</label>
                        <input
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            className="w-[80px] h-[36px] text-center text-[20px] border border-gray-200 rounded-[10px] outline-none focus:border-[#0F3057]"
                            placeholder="📚"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="text-[12px] text-gray-500 mb-1 block">Label</label>
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
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 h-[44px] border border-gray-200 rounded-[12px] text-[14px] text-gray-600 hover:bg-gray-50">Cancel</button>
                    <button onClick={() => onSubmit(label, subtitle, icon)} className="flex-1 h-[44px] bg-[#0F3057] text-white rounded-[12px] text-[14px] font-semibold hover:opacity-90">Save</button>
                </div>
            </div>
        </div>
    );
};

const DeleteModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; }) => {
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
                    <button onClick={onClose} className="flex-1 h-[44px] border border-gray-200 rounded-[12px] text-[14px] text-gray-600 hover:bg-gray-50">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 h-[44px] bg-red-500 text-white rounded-[12px] text-[14px] font-semibold hover:opacity-90">Delete</button>
                </div>
            </div>
        </div>
    );
};

const AddModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (label: string, subtitle: string, icon: string) => void; }) => {
    const [label, setLabel] = React.useState("");
    const [subtitle, setSubtitle] = React.useState("");
    const [icon, setIcon] = React.useState("📚");

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
                        <div className="w-[80px] h-[80px] rounded-2xl bg-gray-50 flex items-center justify-center text-[48px]">
                            {icon || "🎓"}
                        </div>
                        <div>
                            <label className="text-[12px] text-gray-500 mb-1 block text-center">Icon (emoji)</label>
                            <input
                                value={icon}
                                onChange={(e) => setIcon(e.target.value)}
                                className="w-[80px] h-[36px] text-center text-[20px] border border-gray-200 rounded-[10px] outline-none focus:border-[#0F3057]"
                                placeholder="🎓"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[12px] text-gray-500 mb-1 block">Label *</label>
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
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 h-[44px] border border-gray-200 rounded-[12px] text-[14px] text-gray-600 hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSubmit} disabled={!label.trim()} className="flex-1 h-[44px] bg-[#0F3057] text-white rounded-[12px] text-[14px] font-semibold hover:opacity-90 disabled:opacity-50">Add</button>
                </div>
            </div>
        </div>
    );
};

interface SubjectLevelProps {
    levelTitle: string;
    initialSubjects: Subject[];
    onBack: () => void;
    onSubjectsChange: (subjects: Subject[]) => void;
}

const SubjectLevel = ({ levelTitle, initialSubjects, onBack, onSubjectsChange }: SubjectLevelProps) => {
    const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
    const [selectedItem, setSelectedItem] = useState<Subject | null>(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const update = (updated: Subject[]) => {
        setSubjects(updated);
        onSubjectsChange(updated);
    };

    const handleEdit = (newLabel: string, newSubtitle: string, newIcon: string) => {
        if (!selectedItem) return;
        update(subjects.map((s) => s.id === selectedItem.id
            ? { ...s, label: newLabel, subtitle: newSubtitle, icon: newIcon }
            : s));
        setShowEdit(false);
        message.success("Subject updated successfully");
    };

    const handleDelete = () => {
        if (!selectedItem) return;
        update(subjects.filter((s) => s.id !== selectedItem.id));
        setShowDelete(false);
        message.success("Subject deleted successfully");
    };

    const handleAdd = (label: string, subtitle: string, icon: string) => {
        update([...subjects, { id: Date.now().toString(), label, subtitle, icon }]);
        setShowAdd(false);
        message.success("Subject added successfully");
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
                        {subjects.length === 0 ? (
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
                                                {item.icon}
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
            />
            <DeleteModal isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} />
            <AddModal isOpen={showAdd} onClose={() => setShowAdd(false)} onSubmit={handleAdd} />
        </>
    );
};

export default SubjectLevel;