import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    getIdToken,
} from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { auth } from "../../configs/firebase.config";
import { setCookie } from "@/src/services/coockies/coockie.service";
import { logoutUser } from "@/src/services/api/auth.api";

const googleProvider = new GoogleAuthProvider();

/* EMAIL + PASSWORD LOGIN */
export const signInWithFirebase = async (
    email: string,
    password: string
): Promise<{ user: User; idToken: string }> => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;
    const idToken = await getIdToken(user, true);

    return { user, idToken };
};

/* LOGOUT */
export const signOutUser = async (): Promise<void> => {

    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;
    await logoutUser();
    await signOut(auth);
    console.log("🟣 logout");
    localStorage.clear();
    document.cookie = "adminToken=; max-age=0";
    setCookie("adminToken", "");
};

/* AUTH STATE LISTENER */
export const onAuthStateChangedListener = (
    callback: (user: User | null) => void
) => onAuthStateChanged(auth, callback);

/* CURRENT USER */
export const getCurrentUser = (): User | null => auth.currentUser;

export const forgotPasswordFirebase = async (
    email: string
): Promise<{ success: boolean; message?: string }> => {
    try {

        await sendPasswordResetEmail(auth, email);

        return {
            success: true,
            message: "Password reset email sent"
        };

    } catch (error: any) {

        if (error.code === "auth/user-not-found") {
            return { success: false, message: "Email not registered" };
        }

        return { success: false, message: "Failed to send reset email" };
    }
};