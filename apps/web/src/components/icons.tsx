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
import { PiMediumLogoBold } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { MdAttachment } from "react-icons/md";


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
  GITHUB_LU = 'github',
  LINKEDIN_LU = 'linkedin',
  RSS_LU = 'rss',
  MAIL_LU = 'mail',
  PENCIL_LU = 'pencil',
  MAP_PIN_LU = 'map-pin-lu',
  MEDIUM_PI = 'medium',
  TWITTER_FA = 'twitter',
  ATTACHMENT_MD = 'attachment-md',
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
  [ICON_NAMES.GITHUB_LU]: LuGithub,
  [ICON_NAMES.LINKEDIN_LU]: LuLinkedin,
  [ICON_NAMES.RSS_LU]: LuRss,
  [ICON_NAMES.MAIL_LU]: LuMail,
  [ICON_NAMES.PENCIL_LU]: LuPencil,
  [ICON_NAMES.MAP_PIN_LU]: LuMapPin,
  [ICON_NAMES.MEDIUM_PI]: PiMediumLogoBold,
  [ICON_NAMES.TWITTER_FA]: FaXTwitter,
  [ICON_NAMES.ATTACHMENT_MD]: MdAttachment,
};

export function getIcon(iconName: ICON_NAMES | string): VCardIconType {
  return icons[iconName];
}
