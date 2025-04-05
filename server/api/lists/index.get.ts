import { lists, organisations } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { secure } = await requireUserSession(event);
  if (!secure)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const listsData = await useDrizzle()
    .select()
    .from(lists)
    .where(eq(lists.organisationId, secure.organisationId));
  return listsData;
});
