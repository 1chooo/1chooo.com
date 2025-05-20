import type { VCardIconType } from "@/types/config";

/**
 * @todo Create a BaseTimeLineType to be extended by School, Award, Teaching, and Professional types
 */
export type TimeLine = {
  company: string;
  companyImage: string;
  title: string;
  employmentType: string;
  location: string;
  timePeriod: string;
  details: string[];
  detailsShowOrHide: boolean;
};

export type Resume = {
  educations: Education;
  awardLeaderships: AwardLeaderships;
  teachingExperiences: TeachingExperience;
  professionalExperiences: ProfessionalExperience;
};

/**
 * TODO: https://github.com/1chooo/1chooo.com/issues/98
 */
export type ResumeProps = {
  name: string;
  title: string;
  items: {
    icon: VCardIconType;
    title: string;
    text: string;
  }[];
};

export type Education = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type AwardLeaderships = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type TeachingExperience = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type ProfessionalExperience = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};
