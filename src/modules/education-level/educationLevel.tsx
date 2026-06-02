"use client";

import React, { useState } from "react";
import { message } from "antd";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { PiGraduationCap } from "react-icons/pi";
import SubjectLevel from "./subjectLevel";

const INITIAL_LEVELS = [
    {
        id: "1", label: "ENEM", subtitle: "Exame Nacional do Ensino Médio", icon: "🎯",
        subjects: [
            { id: "s1", label: "Mathematics", subtitle: "Algebra · Functions · Geometry · Statistics · Probability · Financial Math", icon: "🔢" },
            { id: "s2", label: "Natural Sciences", subtitle: "Biology · Physics · Chemistry · Ecology · Genetics", icon: "🔬" },
            { id: "s3", label: "Human Sciences", subtitle: "History · Geography · Philosophy · Sociology · Brazilian Culture", icon: "🌍" },
            { id: "s4", label: "Languages & Literacy", subtitle: "Portuguese · Literature · English · Spanish · Arts · Media", icon: "📖" },
            { id: "s5", label: "Essay Writing", subtitle: "Argumentative essay · 5 INEP criteria · Topic prediction · AI feedback", icon: "✏️" },
        ],
    },
    {
        id: "2", label: "High School", subtitle: "Ensino Médio · Years 1–3", icon: "📚",
        subjects: [
            { id: "s6", label: "Mathematics", subtitle: "Algebra · Quadratic functions · Logarithms · Trigonometry · Geometry", icon: "🔢" },
            { id: "s7", label: "Sciences", subtitle: "Biology · Physics · Chemistry · Environmental Science", icon: "🔬" },
            { id: "s8", label: "Portuguese & Literature", subtitle: "Grammar · Text analysis · Brazilian literary periods · Writing skills", icon: "📖" },
            { id: "s9", label: "Humanities", subtitle: "Brazilian History · World History · Geography · Philosophy · Sociology", icon: "🌍" },
            { id: "s10", label: "English", subtitle: "Reading comprehension · Vocabulary · Basic grammar · ENEM-style texts", icon: "🗣️" },
            { id: "s11", label: "Essay Basics", subtitle: "Paragraph structure · Argumentation · Connectives · Introduction to ENEM essay", icon: "✏️" },
        ],
    },
    {
        id: "3", label: "Pré-Vestibular", subtitle: "Intensive university prep", icon: "🏆",
        subjects: [
            { id: "s12", label: "Advanced Mathematics", subtitle: "Calculus intro · Complex numbers · Combinatorics · Analytical geometry", icon: "📐" },
            { id: "s13", label: "Advanced Sciences", subtitle: "Organic chemistry · Quantum physics · Molecular biology · Genetics", icon: "⚗️" },
            { id: "s14", label: "Portuguese & Literature", subtitle: "All literary periods · Advanced grammar · Text interpretation · Rhetoric", icon: "📖" },
            { id: "s15", label: "Humanities — Deep Dive", subtitle: "Brazilian Republic · Geopolitics · Contemporary philosophy · Social theory", icon: "🌍" },
            { id: "s16", label: "Essay — Advanced", subtitle: "ENEM + FUVEST essay formats · AI scoring · Thesis construction · Topic bank", icon: "✏️" },
            { id: "s17", label: "Timed Mock Exams", subtitle: "Full ENEM simulation · FUVEST format · UNICAMP format · Score analysis", icon: "⏱️" },
        ],
    },
    {
        id: "4", label: "University", subtitle: "Undergraduate support", icon: "🎓",
        subjects: [
            { id: "s18", label: "Calculus & Linear Algebra", subtitle: "Limits · Derivatives · Integrals · Matrices · Vectors", icon: "📐" },
            { id: "s19", label: "Science Foundations", subtitle: "Physics · Chemistry · Biology — university level concepts", icon: "🔬" },
            { id: "s20", label: "Logic & Computing", subtitle: "Boolean logic · Algorithms · Data structures · Python basics", icon: "💻" },
            { id: "s21", label: "Statistics & Research", subtitle: "Descriptive stats · Hypothesis testing · Data analysis · Academic writing", icon: "📊" },
            { id: "s22", label: "Academic Writing", subtitle: "TCC structure · Scientific articles · ABNT formatting · Thesis writing", icon: "📝" },
            { id: "s23", label: "Study Planning", subtitle: "Semester planning · Exam scheduling · Spaced repetition · Productivity", icon: "🗓️" },
        ],
    },
    {
        id: "5", label: "Competitive Exams", subtitle: "Concursos Públicos", icon: "📋",
        subjects: [
            { id: "s24", label: "Constitutional & Administrative Law", subtitle: "Brazilian Constitution · Public administration · Administrative acts · Rights", icon: "⚖️" },
            { id: "s25", label: "Quantitative Reasoning", subtitle: "Basic maths · Percentages · Ratios · Financial reasoning · Logic puzzles", icon: "🔢" },
            { id: "s26", label: "Portuguese — Concurso Style", subtitle: "Official language · Text interpretation · Grammar · Formal writing", icon: "📖" },
            { id: "s27", label: "Current Affairs & Geography", subtitle: "Brazilian current events · IBGE data · Geopolitics · Recent legislation", icon: "🌍" },
            { id: "s28", label: "Logical Reasoning", subtitle: "Deductive reasoning · Sequences · Logical propositions · Problem solving", icon: "🧠" },
            { id: "s29", label: "Exam-Specific Modules", subtitle: "CESPE · FCC · VUNESP formats · Question banks per banca", icon: "🎯" },
        ],
    },
    {
        id: "6", label: "Elementary", subtitle: "Ensino Fundamental · Years 1–9", icon: "✏️",
        subjects: [
            { id: "s30", label: "Mathematics Foundations", subtitle: "Numbers · Basic operations · Fractions · Intro to algebra · Basic geometry", icon: "🔢" },
            { id: "s31", label: "Reading & Writing", subtitle: "Literacy · Text interpretation · Grammar basics · Spelling · Composition", icon: "📖" },
            { id: "s32", label: "Science & Nature", subtitle: "Living things · Human body · Ecosystems · Simple experiments · Environment", icon: "🌱" },
            { id: "s33", label: "History & Geography", subtitle: "Brazil history · World history · Maps · Brazilian regions · Citizenship", icon: "🌍" },
            { id: "s34", label: "English Basics", subtitle: "Alphabet · Vocabulary · Numbers in English · Basic conversation phrases", icon: "🗣️" },
            { id: "s35", label: "Gamified Learning", subtitle: "Story-based lessons · Badges · Reward system · Progress characters", icon: "🎮" },
        ],
    },
];

type Level = typeof INITIAL_LEVELS[0];

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
                    <h3 className="text-[16px] font-semibold text-[#121212]">Edit Education Level</h3>
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
                            placeholder="🎓"
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
    const [icon, setIcon] = React.useState("🎓");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!label.trim()) return;
        onSubmit(label, subtitle, icon);
        setLabel(""); setSubtitle(""); setIcon("🎓");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-semibold text-[#121212]">Add Education Level</h3>
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
                            placeholder="e.g. High School" autoFocus />
                    </div>
                    <div>
                        <label className="text-[12px] text-gray-500 mb-1 block">Subtitle</label>
                        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full h-[44px] px-3 border border-gray-200 rounded-[10px] text-[14px] outline-none focus:border-[#0F3057]"
                            placeholder="e.g. School curriculum support" />
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

const EducationLevelPage = () => {
    const [levels, setLevels] = useState(INITIAL_LEVELS);
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleEdit = (newLabel: string, newSubtitle: string, newIcon: string) => {
        if (!selectedItem) return;
        setLevels((prev) => prev.map((l) => l.id === selectedItem.id
            ? { ...l, label: newLabel, subtitle: newSubtitle, icon: newIcon }
            : l));
        setShowEdit(false);
        message.success("Updated successfully");
    };

    const handleDelete = () => {
        if (!selectedItem) return;
        setLevels((prev) => prev.filter((l) => l.id !== selectedItem.id));
        setShowDelete(false);
        message.success("Deleted successfully");
    };

    const handleAdd = (label: string, subtitle: string, icon: string) => {
        setLevels((prev) => [...prev, { id: Date.now().toString(), label, subtitle, icon, subjects: [] }]);
        setShowAdd(false);
        message.success("Added successfully");
    };

    const handleSubjectsChange = (subjects: any[]) => {
        if (!selectedLevel) return;
        setLevels((prev) => prev.map((l) => l.id === selectedLevel.id ? { ...l, subjects } : l));
    };

    if (selectedLevel) {
        return (
            <SubjectLevel
                levelTitle="Subjects"
                initialSubjects={selectedLevel.subjects}
                onBack={() => setSelectedLevel(null)}
                onSubjectsChange={handleSubjectsChange}
            />
        );
    }

    return (
        <>
            <div className="px-4">
                <div
                    className="h-[calc(100vh-100px)] mt-2 mb-4 rounded-[32px] col-span-2 flex flex-col gap-4 overflow-hidden"
                    style={{ boxShadow: "0px 0px 4px 0px #00000040", backgroundColor: "#F7F9FC" }}
                >
                    <div className="py-3 px-6 flex items-center relative">
                        <h1 className="text-[22px] font-semibold text-primaryText w-full text-center">Education Levels</h1>
                        <button
                            onClick={() => setShowAdd(true)}
                            className="absolute right-6 flex items-center gap-2 h-[38px] px-4 bg-[#0F3057] text-white rounded-[10px] text-[13px] font-medium hover:opacity-90 transition-opacity"
                        >
                            <FiPlus size={16} /> Add
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 scrollbar">
                        {levels.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                <PiGraduationCap className="text-gray-300 text-5xl" />
                                <p className="text-[14px] text-gray-400">No education levels yet</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 py-3">
                                {levels.map((level) => (
                                    <div
                                        key={level.id}
                                        onClick={() => setSelectedLevel(level)}
                                        className="flex items-center justify-between px-3 py-3 bg-white rounded-[20px] cursor-pointer hover:shadow-md transition-shadow"
                                        style={{ boxShadow: "0px 0px 4px 0px #00000040", minHeight: "76px" }}
                                    >
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            <div className="w-[52px] h-[52px] rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-2xl overflow-hidden">
                                                {level.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-[17px] font-medium text-[#121212] truncate">{level.label}</h3>
                                                <p className="text-[13px] text-gray-400 mt-0.5 truncate">{level.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0 ml-4" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => { setSelectedItem(level); setShowEdit(true); }}
                                                className="flex items-center gap-1.5 px-3 h-[34px] rounded-[10px] bg-white text-[13px] font-normal text-[#121212] hover:shadow-md transition-all"
                                                style={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.10)" }}
                                            >
                                                <FiEdit2 size={14} /> Edit
                                            </button>
                                            <button
                                                onClick={() => { setSelectedItem(level); setShowDelete(true); }}
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

export default EducationLevelPage;