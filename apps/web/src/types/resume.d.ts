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

export type TagType = {
  key: string;
  value: string;
  icon: string;
};

export type ResumeCardType = {
  institution: string;
  institutionImage: string;
  title: string;
  tags: TagType[];
  details: string[];
};

export type ResumeTimeLineV2 = {
  icon: VCardIconType;
  title: string;
  timeLineExperiences: ResumeCardType[];
  iconName: string;
};

export type ResumesV2 = {
  [key: string]: ResumeTimeLineV2;
};

export type ResumeTimeLine = {
  icon: VCardIconType;
  title: string;
  timeLineExperiences: TimeLineExperience[];
  iconName: string; // Changed from icon component to string identifier
};

export type Resumes = {
  [key: string]: ResumeTimeLine;
};
