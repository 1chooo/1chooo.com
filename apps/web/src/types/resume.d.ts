import type { VCardIconType } from "@/types/config";

export type TimeLine = {
  company: string;
  companyImage: string;
  title: string;
  employmentType: string;
  location: string;
  timePeriod: string;
  details: string[];
};

export type ResumeTimeLine = {
  icon: VCardIconType;
  title: string;
  timeLines: TimeLine[];
};

export type Resumes = {
  [key: string]: ResumeTimeLine;
};
