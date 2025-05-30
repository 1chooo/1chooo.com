import type { VCardIconType } from "@/types/config";

export type TimeLineExperience = {
  company: string;
  companyImage: string;
  title: string;
  employmentType: string;
  location: string;
  timePeriod: string;
  details: string[];
};

// export type TimeLineExperience = {
//   // Either work experience or education, not both
//   company?: string;
//   companyImage?: string;
//   title: string;
//   employmentType?: string;
//   school?: string;
//   location: string;
//   timePeriod: string;
//   details: string[];
// } & (
//   | { company: string; school?: never; employmentType: string; }
//   | { school: string; company?: never; employmentType?: never; }
// );

export type ResumeTimeLine = {
  icon: VCardIconType;
  title: string;
  timeLineExperiences: TimeLineExperience[];
};

export type Resumes = {
  [key: string]: ResumeTimeLine;
};
