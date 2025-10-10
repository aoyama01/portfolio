import { z } from "zod";

// Skills Schema
export const SkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  level: z.number().min(1).max(5),
  yearsOfExperience: z.number().min(0),
  evidence: z.string(),
  description: z.string().optional(),
});

export type Skill = z.infer<typeof SkillSchema>;

// Experience Schema
export const ExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  description: z.string(),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
});

export type Experience = z.infer<typeof ExperienceSchema>;

// Education Schema
export const EducationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  field: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  lab: z.string().optional(),
  gpa: z.string().optional(),
  activities: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
});

export type Education = z.infer<typeof EducationSchema>;

// Personal Info Schema
export const PersonalInfoSchema = z.object({
  name: z.string(),
  title: z.string(),
  email: z.string().email(),
  location: z.string().optional(),
  bio: z.string(),
  socialLinks: z
    .object({
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
    })
    .optional(),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
