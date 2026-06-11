import { useMutation } from "@tanstack/react-query";

import { submitScreening } from "@/api/screenings.api";
import { env } from "@/config/env";
import type { ScreeningFormValues } from "@/features/screenings/types/screening.type";
import { submitScreeningMock } from "@/features/screenings/api/screening-mock-api";

export function useSubmitScreening() {
  return useMutation({
    mutationFn: (values: ScreeningFormValues) => {
      if (env.mock.screenings) {
        return submitScreeningMock(values);
      }

      return submitScreening(values);
    },
  });
}
