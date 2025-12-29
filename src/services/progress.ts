import { db } from "../lib/firebase";
import { doc, setDoc, updateDoc, arrayUnion, getDoc, increment, serverTimestamp } from "firebase/firestore";

// --- Types ---

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    level: number;
    xp: number;
    streak: number;
    lastActive: any; // Timestamp
}

export interface QuestionAttempt {
    questionId: string;
    questionText: string;
    selectedOption: string;
    isCorrect: boolean;
    timestamp: number;
}

export interface MissionProgress {
    userId: string;
    missionId: string;
    title: string;
    subject: string;
    completed: boolean;
    score: number; // 0-100 or raw XP
    attempts: QuestionAttempt[];
    confidenceLevel?: "guessing" | "unsure" | "solid" | "skip";
    lastUpdated: any;
}

export interface ConceptMastery {
    userId: string;
    conceptId: string; // e.g., generated from keywords
    conceptName: string;
    masteryScore: number; // 0-100
    interactions: number;
    lastPracticed: any;
}

// --- Services ---

// Initialize or update user profile on login
export const syncUserProfile = async (user: any) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const newProfile: UserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            level: 1,
            xp: 0,
            streak: 0,
            lastActive: serverTimestamp(),
        };
        await setDoc(userRef, newProfile);
    } else {
        await updateDoc(userRef, {
            lastActive: serverTimestamp()
        });
    }
};

// Save progress for a specific mission
export const saveMissionProgress = async (
    userId: string,
    missionId: string,
    data: Partial<MissionProgress>
) => {
    const progressRef = doc(db, "users", userId, "missions", missionId);

    // Check if exists to determine if we use set or update (merge: true handles both nicely with setDoc)
    await setDoc(progressRef, {
        ...data,
        userId,
        missionId,
        lastUpdated: serverTimestamp()
    }, { merge: true });
};

// Update global user stats (XP, Level)
export const awardXP = async (userId: string, amount: number) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        xp: increment(amount)
    });

    // TODO: Add level up logic here or in a cloud function
};

// Record a question attempt (could also update concept mastery here)
export const logQuestionAttempt = async (userId: string, missionId: string, attempt: QuestionAttempt) => {
    const progressRef = doc(db, "users", userId, "missions", missionId);

    await updateDoc(progressRef, {
        attempts: arrayUnion(attempt)
    });
};
