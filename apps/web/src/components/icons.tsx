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

import { VCardIconType } from "@/types/config";

export type IconMap = {
  [key: string]: VCardIconType;
}

export const icons: IconMap = {
  "attachment": Paperclip,
  "devices": MdOutlineDevices,
  "school": IoSchoolOutline,
  "briefcase": BriefcaseIcon,
  "graduation-cap": GraduationCapIcon,
  "award": AwardIcon,
  "calendar": CalendarIcon,
  "map-pin": MapPin,
}

/**
 * 
 * @example
 * getIcon("devices") // returns MdOutlineDevices
 * @param iconName - The name of the icon to retrieve.
 * @returns The icon component if found, otherwise undefined.
 */
export function getIcon(iconName: string): VCardIconType | undefined {
  if (!iconName || !icons[iconName]) {
    return undefined;
  }
  return icons[iconName];
}
