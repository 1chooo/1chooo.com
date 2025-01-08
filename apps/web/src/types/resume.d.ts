import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";

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
    icon: ReactIconType | OcticonsType;
    title: string;
    text: string;
  }[];
};

export type Education = {
  icon: ReactIconType | OcticonsType;
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
  icon: ReactIconType | OcticonsType;
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
  icon: ReactIconType | OcticonsType;
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
  icon: ReactIconType | OcticonsType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};
