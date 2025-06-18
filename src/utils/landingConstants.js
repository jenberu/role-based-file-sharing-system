// src/utils/landingConstants.js
import { FiUpload, FiShield, FiUsers, FiCheck } from "react-icons/fi";

export const FEATURES = [
  {
    icon: FiUpload,
    title: "Easy Upload",
    description:
      "Drag and drop or browse to upload files with department tagging",
  },
  {
    icon: FiShield,
    title: "Secure Access",
    description:
      "Role-based permissions ensure documents stay within authorized teams",
  },
  {
    icon: FiUsers ,
    title: "Team Collaboration",
    description:
      "Share files with departments or individuals with controlled access",
  },
];

export const POLICIES = [
  "All confidential documents must be properly categorized",
  "Department heads are responsible for access controls",
  "External sharing requires VP approval",
  "Documents should be reviewed quarterly",
  "Use standardized naming conventions",
  "Report any suspicious activity immediately",
];

export const FEATURES_ICON = FiCheck;
