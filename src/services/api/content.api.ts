// import { fetch } from "@/src/libs/helpers";
// import { GetMaterialsResponse, StudyMaterial, UploadFileResponse } from "@/src/libs/types/content.types";
// import axios from "axios";

// export const uploadFile = async (file: File, signal?: AbortSignal) => {
//     // Get presigned URL
//     const res = await fetch<UploadFileResponse>({
//         url: "/upload/upload-file",
//         method: "POST",
//         data: {
//             fileName: file.name,
//             type: "doc",
//         },
//         signal
//     });

//     // Upload to S3
//     await axios.put(res.preSignedUrl, file, {
//         headers: {
//             "Content-Type": file.type,
//         },
//     });

//     return res.outPutUrl;
// };

// export const uploadQuestionBank = async (
//     subject: string,
//     educationLevel: string,
//     fileUrl: string,
//     signal?: AbortSignal
// ) => {
//     return fetch({
//         url: "/admin/upload-question-bank",
//         method: "POST",
//         data: {
//             subject,
//             educationLevel,
//             fileUrl,
//         },
//         signal
//     });
// };

// export interface GetMaterialsParams {
//     subjects?: string[];
//     educationLevels?: string[];
//     skip?: number;
//     take?: number;
//     search_column?: string[];
//     search?: string;
//     orderBy?: string;
// }

// export const getMaterials = async (params: GetMaterialsParams) => {
//     return fetch<GetMaterialsResponse>({
//         url: "/Admin/get-question-bank",
//         method: "GET",
//         params,
//     });
// };

// export const deleteMaterial = async (id: string) => {
//     return fetch({
//         url: `/Admin/question-bank/${id}`,
//         method: "DELETE",
//     });
// };

import { fetch } from "@/src/libs/helpers";
import { GetMaterialsResponse, StudyMaterial, UploadFileResponse } from "@/src/libs/types/content.types";
import axios from "axios";

export const uploadFile = async (file: File, signal?: AbortSignal) => {
    // Get presigned URL
    const res = await fetch<UploadFileResponse>({
        url: "/upload/upload-file",
        method: "POST",
        data: {
            fileName: file.name,
            type: "doc",
        },
        signal
    });

    // Upload to S3
    await axios.put(res.preSignedUrl, file, {
        headers: {
            "Content-Type": file.type,
        },
    });

    return res.outPutUrl;
};

export const uploadQuestionBank = async (
    subjectId: string,
    educationLevelId: string,
    fileUrl: string,
    signal?: AbortSignal
) => {
    return fetch({
        url: "/admin/upload-question-bank",
        method: "POST",
        data: {
            subjectId,
            educationLevelId,
            fileUrl,
        },
        signal
    });
};

export interface GetMaterialsParams {
    subjectIds?: string[];
    educationLevelIds?: string[];
    skip?: number;
    take?: number;
    search_column?: string[];
    search?: string;
    orderBy?: string[];
}

export const getMaterials = async (params: GetMaterialsParams) => {
    return fetch<GetMaterialsResponse>({
        url: "/Admin/get-question-bank",
        method: "GET",
        params,
    });
};

export const deleteMaterial = async (id: string) => {
    return fetch({
        url: `/Admin/question-bank/${id}`,
        method: "DELETE",
    });
};