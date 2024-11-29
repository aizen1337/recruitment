import { z } from "zod";

// Define the NavigationElement schema using zod
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NavigationElementSchema = z.object({
  id: z.string().uuid(),
  parentId: z.string().uuid().nullable(),
  label: z.string().min(1, "Label is required"),
  url: z.string().url().optional(),
});

// Define the TypeScript type
export type NavigationElement = z.infer<typeof NavigationElementSchema> & {
    subelements?: NavigationElement[]; 
  };
