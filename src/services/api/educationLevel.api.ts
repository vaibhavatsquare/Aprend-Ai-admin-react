import { getCookie } from "@/src/services/coockies/coockie.service";

const BASE_URL = process.env.NEXT_API_ENDPOINT || "https://api.mestreia.co";

const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: `Bearer ${getCookie("token")}`,
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EducationLevel {
    id: string;
    code: string;
    name: string;
    description: string;
    sortOrder: number;
    imageUrl: string | null;
    status: "ENABLED" | "DISABLED";
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetEducationLevelsResponse {
    total: number;
    list: EducationLevel[];
    hasMany: boolean;
    count: number;
}

// ─── API Functions ────────────────────────────────────────────────────────────

export interface CreateEducationLevelPayload {
    code: string;
    name: string;
    description: string;
    sortOrder: number;
    imageUrl: string | null;
    status: "ENABLED" | "DISABLED";
}

export const deleteEducationLevel = async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/Admin/education-levels/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete education level");
};

export const updateEducationLevel = async (id: string, payload: CreateEducationLevelPayload): Promise<EducationLevel> => {
    const res = await fetch(`${BASE_URL}/Admin/education-levels/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update education level");
    return res.json();
};

export const createEducationLevel = async (payload: CreateEducationLevelPayload): Promise<EducationLevel> => {
    const res = await fetch(`${BASE_URL}/Admin/education-levels`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create education level");
    return res.json();
};

export interface Subject {
    id: string;
    educationLevelId: string;
    code: string;
    name: string;
    description: string | null;
    topics: string[];
    moduleType: string;
    imageUrl: string | null;
    sortOrder: number;
    status: "ENABLED" | "DISABLED";
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetSubjectsResponse {
    total: number;
    list: Subject[];
    hasMany: boolean;
    count: number;
}

export const getSubjects = async (educationLevelId: string): Promise<GetSubjectsResponse> => {
    const res = await fetch(`${BASE_URL}/Admin/subjects?educationLevelId=${educationLevelId}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch subjects");
    return res.json();
};

export interface CreateSubjectPayload {
    educationLevelId: string;
    code: string;
    name: string;
    description: string;
    imageUrl: string | null;
    topics: string[];
    moduleType: string;
}

export interface UpdateSubjectPayload {
    educationLevelId: string;
    code: string;
    name: string;
    description: string;
    imageUrl: string | null;
    topics: string[];
    moduleType: string;
    sortOrder: number;
    status: "ENABLED" | "DISABLED";
}

export const deleteSubject = async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/Admin/subjects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete subject");
};

export const updateSubject = async (id: string, payload: UpdateSubjectPayload): Promise<Subject> => {
    const res = await fetch(`${BASE_URL}/Admin/subjects/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update subject");
    return res.json();
};

export const createSubject = async (payload: CreateSubjectPayload): Promise<Subject> => {
    const res = await fetch(`${BASE_URL}/Admin/subjects`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create subject");
    return res.json();
};

export const getEducationLevels = async (): Promise<GetEducationLevelsResponse> => {
    const res = await fetch(`${BASE_URL}/Admin/education-levels`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch education levels");
    return res.json();
};