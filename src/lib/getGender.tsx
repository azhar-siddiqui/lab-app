import { Gender } from "@/generated/prisma/enums";
import {
  IconGenderBigender,
  IconGenderFemale,
  IconGenderMale,
} from "@tabler/icons-react";

export function getGenderIcon(gender: Gender) {
  switch (gender) {
    case Gender.Male:
      return (
        <span className="flex items-center gap-1">
          <IconGenderMale className="size-4" />
          {gender}
        </span>
      );

    case Gender.Female:
      return (
        <span className="flex items-center gap-1">
          <IconGenderFemale className="size-4" />
          {gender}
        </span>
      );

    default:
      return (
        <span className="flex items-center gap-1">
          <IconGenderBigender className="size-4" />
          {gender}
        </span>
      );
  }
}
