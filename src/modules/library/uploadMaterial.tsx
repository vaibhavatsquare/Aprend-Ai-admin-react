"use client";

import { Modal, Select, Upload, Button, message, Tooltip, Progress } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { subjects, educationLevels } from "@/src/libs/helpers";
import { uploadFile, uploadQuestionBank } from "@/src/services/api/content.api";

const allowedExtensions = [
    "pdf", "txt", "md", "json", "html", "xml",
    "doc", "docx", "rtf", "odt",
    "ppt", "pptx",
    "csv", "xls", "xlsx"
];

export default function UploadMaterialModal({ open, onClose, refresh }: any) {

    const [file, setFile] = useState<File | null>(null);
    const [subject, setSubject] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const controllerRef = useRef<AbortController | null>(null);

    const resetForm = () => {
        setFile(null);
        setSubject("");
        setEducationLevel("");
        setProgress(0);
        setLoading(false);
    };

    const handleClose = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        resetForm();
        onClose();
    };

    const handleUpload = async () => {

        if (!file || !subject || !educationLevel) {
            message.error("Please fill all fields");
            return;
        }

        try {

            controllerRef.current = new AbortController();

            setLoading(true);
            setProgress(30);

            const url = await uploadFile(file, controllerRef.current.signal);

            setProgress(70);

            await uploadQuestionBank(subject, educationLevel, url, controllerRef.current.signal);

            setProgress(100);

            message.success("Material uploaded successfully");

            refresh();
            resetForm();
            onClose();

        } catch (e: any) {
            if (e.name === "CanceledError") {
                message.info("Upload cancelled");
            } else {
                // message.error(e.message);
            }
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Upload Study Material"
            open={open}
            onCancel={handleClose}
            footer={null}
        >

            <div className="flex flex-col gap-4">

                {/* SUBJECT */}
                <Select
                    placeholder="Select Subject"
                    options={subjects}
                    value={subject || undefined}
                    onChange={setSubject}
                    disabled={loading}
                />

                {/* LEVEL */}
                <Select
                    placeholder="Select Education Level"
                    options={educationLevels}
                    value={educationLevel || undefined}
                    onChange={setEducationLevel}
                    disabled={loading}
                />

                {/* FILE UPLOAD */}
                {!file ? (
                    <Upload.Dragger
                        maxCount={1}
                        disabled={loading}
                        showUploadList={false}
                        className={loading ? "pointer-events-none opacity-60" : ""}
                        accept=".pdf,.txt,.md,.json,.html,.xml,.doc,.docx,.rtf,.odt,.ppt,.pptx,.csv,.xls,.xlsx"
                        beforeUpload={(file) => {

                            if (loading) return Upload.LIST_IGNORE; // prevent during upload

                            const ext = file.name.split(".").pop()?.toLowerCase();

                            if (!ext || !allowedExtensions.includes(ext)) {
                                message.error("Unsupported file format");
                                return Upload.LIST_IGNORE;
                            }

                            setFile(file);
                            return false;
                        }}
                    >

                        <p className="ant-upload-drag-icon">
                            <UploadOutlined style={{ color: "#0F3057", fontSize: 30 }} />
                        </p>

                        <p className="font-medium">
                            Drag & Drop file here
                        </p>

                        <p className="text-secondary text-sm">
                            or click to upload
                        </p>

                        <Tooltip
                            title="pdf, txt, md, json, html, xml, doc, docx, rtf, odt, ppt, pptx, csv, xls, xlsx"
                        >
                            <span className="text-xs text-secondary cursor-pointer">
                                Supported formats <InfoCircleOutlined />
                            </span>
                        </Tooltip>

                    </Upload.Dragger>

                ) : (

                    <div className={`flex items-center justify-between border p-3 rounded-lg ${loading ? "opacity-60" : ""}`}>

                        <span className="truncate">{file.name}</span>

                        <Button
                            size="small"
                            disabled={loading} // ✅ prevent remove during upload
                            onClick={() => setFile(null)}
                        >
                            Remove
                        </Button>

                    </div>

                )}

                {/* FILE NAME */}
                {file && (
                    <div className="text-sm text-secondary">
                        Selected file: {file.name}
                    </div>
                )}

                {/* PROGRESS */}
                {loading && (
                    <Progress
                        percent={progress}
                        strokeColor="#0F3057"
                    />
                )}

                {/* BUTTON */}
                <Button
                    loading={loading}
                    disabled={loading}
                    onClick={handleUpload}
                    style={{
                        background: "#0F3057",
                        color: "white",
                        border: "none"
                    }}
                >
                    Upload
                </Button>

            </div>

        </Modal>
    );
}