import { MdOutlineDevices } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import { Paperclip } from "lucide-react";
import {
  BriefcaseIcon,
  GraduationCapIcon,
  AwardIcon,
  CalendarIcon,
  MapPin,
} from "lucide-react";
import {
  LuGithub,
  LuPencil,
  LuLinkedin,
  LuRss,
  LuMail,
  LuMapPin,
} from "react-icons/lu";

import { VCardIconType } from "@/types/config";

export enum ICON_NAMES {
  ATTACHMENT = 'attachment',
  DEVICES = 'devices',
  SCHOOL = 'school',
  BRIEFCASE = 'briefcase',
  GRADUATION_CAP = 'graduation-cap',
  AWARD = 'award',
  CALENDAR = 'calendar',
  MAP_PIN = 'map-pin',
  GITHUB = 'github',
  LINKEDIN = 'linkedin',
  RSS = 'rss',
  MAIL = 'mail',
  PENCIL = 'pencil',
  LOCATION = 'location',
  MAP_PIN_LU = 'map-pin-lu',
}

export const icons: Record<ICON_NAMES, VCardIconType> = {
  [ICON_NAMES.ATTACHMENT]: Paperclip,
  [ICON_NAMES.DEVICES]: MdOutlineDevices,
  [ICON_NAMES.SCHOOL]: IoSchoolOutline,
  [ICON_NAMES.BRIEFCASE]: BriefcaseIcon,
  [ICON_NAMES.GRADUATION_CAP]: GraduationCapIcon,
  [ICON_NAMES.AWARD]: AwardIcon,
  [ICON_NAMES.CALENDAR]: CalendarIcon,
  [ICON_NAMES.MAP_PIN]: MapPin,
  [ICON_NAMES.GITHUB]: LuGithub,
  [ICON_NAMES.LINKEDIN]: LuLinkedin,
  [ICON_NAMES.RSS]: LuRss,
  [ICON_NAMES.MAIL]: LuMail,
  [ICON_NAMES.PENCIL]: LuPencil,
  [ICON_NAMES.LOCATION]: MapPin, // Assuming you want to use the same icon as MAP_PIN
  [ICON_NAMES.MAP_PIN_LU]: LuMapPin, // Using a different icon for this
};

export function getIcon(iconName: ICON_NAMES | string): VCardIconType {
  return icons[iconName];
}



// 方案 3: 使用 enum
// import { ICON_NAMES, getIcon } from "@/components/icons";

// ✅ enum 方式
{/* <ResumeCard 
  iconName={ICON_NAMES.BRIEFCASE} 
  timeLineExperience={experience} 
/> */}

// 或者
// const icon = getIcon(ICON_NAMES.DEVICES);