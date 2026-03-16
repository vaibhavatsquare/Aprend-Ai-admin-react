export interface response {
    data?: any;
    message?: string;
}

export type UserRole = "USER" | "ADMIN";

export type AuthType = "EMAIL_PASSWORD" | "GOOGLE" | "APPLE";

export type Status = "ENABLED" | "DISABLED";

export interface AdminDetail {
    id: string;
    email: string;
    name: string | null;
    authType: AuthType;
    timezone: string | null;
    firebaseUId: string;
    image: string | null;
    role: UserRole;
    status: Status;

    user_language: string | null;
    user_EducationLevel: string | null;

    notificationsEnabled: boolean;
    isDeleted: boolean;
    isEmailVerified: boolean;
    isPasswordReset: boolean;
    isPlacementQuizDone: boolean;

    createdAt: string;
    updatedAt: string;

    userSession: UserSession | null;
}

export interface UserSession {
    id: string;
    userId: string;
    notificationToken: string | null;
    status: Status;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}