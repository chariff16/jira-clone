"use server";
import { createSessionClient } from "@/lib/appwrite";

export const getCurrent = async () => {
    try {
        const { account } = await createSessionClient();

        const user = await account.get();

        return user;
    } catch {
        return null;
    }
}