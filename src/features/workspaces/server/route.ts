import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkSpaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";

const app = new Hono()
    .post(
        "/",
        zValidator("form", createWorkSpaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("databases");
            const storage = c.get('storage');
            const user = c.get("user");

            const { name, imageUrl } = c.req.valid('form');

            let uploadedImageUrl: string | undefined;

            if (imageUrl instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    imageUrl
                );

                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`;
            }

            const workspaces = await databases.createDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl
                },
            );

            return c.json({ data: workspaces })
        }
    )

export default app;