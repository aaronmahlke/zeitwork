import { z } from "zod";
import { lists } from "~~/server/database/schema";

const bodySchema = z.object({
  name: z.string().min(1).max(50),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const { secure } = await requireUserSession(event);
  if (!secure)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const { name, icon, color } = await readValidatedBody(
    event,
    bodySchema.parse,
  );

  const [list] = await useDrizzle()
    .insert(lists)
    .values({
      title: name,
      icon: icon || "DocumentText",
      color: color || "blue",
      organisationId: secure.organisationId,
      creatorId: secure.userId,
    })
    .returning();

  if (!list)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create list",
    });

  return list;
});
