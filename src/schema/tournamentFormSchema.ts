import { z } from "zod";

const tournamentFormSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  email: z.string().email("Invalid email address"),
  //   image: z.instanceof(File).nullable().optional(),
  image: z.instanceof(File).nullable(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  totalSlot: z.number().min(1, "Total slots must be at least 1"),
  prizePool: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  totalTeamMembers: z.number().min(1, "Total team members must be at least 1"),
  joinFees: z.number().nonnegative("Join fees must be a positive number"),
  joinFeesType: z.enum(["Per Team", "Per Player"], {
    errorMap: () => ({ message: "Please select a fees type" }),
  }),
});

export type TournamentFormData = z.infer<typeof tournamentFormSchema>;
export default tournamentFormSchema;
