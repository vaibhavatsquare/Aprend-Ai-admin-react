// export interface UploadFileResponse {
//     preSignedUrl: string;
//     outPutUrl: string;
// }

// export interface StudyMaterial {
//     id: string;
//     subject: string;
//     educationLevel: string;
//     fileUrl: string;
//     createdAt: string;
// }

// export interface StudyMaterial {
//     id: string;
//     subject: string;
//     educationLevel: string;
//     fileUrl: string;
//     name: string;
//     numberOfQuestions: number;
//     status: "PENDING" | "FAILED" | "COMPLETED";
//     isDeleted: boolean;
//     createdAt: string;
//     updatedAt: string;
// }

// export type GetMaterialsResponse = {
//     total: number;
//     list: StudyMaterial[];
//     hasMany: boolean;
//     count: number;
// };

export interface UploadFileResponse {
    preSignedUrl: string;
    outPutUrl: string;
}

export interface StudyMaterial {
    id: string;
    subject: string;
    subjectId: string;
    educationLevel: string;
    educationLevelId: string;
    fileUrl: string;
    name: string | null;
    numberOfQuestions: number;
    status: "PENDING" | "FAILED" | "COMPLETED";
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export type GetMaterialsResponse = {
    total: number;
    list: StudyMaterial[];
    hasMany: boolean;
    count: number;
    source?: string;
};