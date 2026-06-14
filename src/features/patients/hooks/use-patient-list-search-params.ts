import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import type {
  PatientListFilterValues,
  PatientRiskFilter,
  PatientStatusFilter,
} from "../types/patient-list.type";

const patientStatusFilters: PatientStatusFilter[] = [
  "all",
  "not_started",
  "active",
  "completed",
];

const patientRiskFilters: PatientRiskFilter[] = [
  "all",
  "unassessed",
  "low_risk",
  "moderate_risk",
  "high_risk",
];

const supportedPageSizes = [5, 10, 20];

function isPatientStatusFilter(
  value: string | null,
): value is PatientStatusFilter {
  return patientStatusFilters.includes(value as PatientStatusFilter);
}

function isPatientRiskFilter(value: string | null): value is PatientRiskFilter {
  return patientRiskFilters.includes(value as PatientRiskFilter);
}

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
}

function parsePageSize(value: string | null) {
  const pageSize = parsePositiveInteger(value, 5);

  return supportedPageSizes.includes(pageSize) ? pageSize : 5;
}

export function usePatientListSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search")?.trim() ?? "";

  const journeyStatusParam = searchParams.get("journey_status");

  const riskCategoryParam = searchParams.get("risk_category");

  const journeyStatus = isPatientStatusFilter(journeyStatusParam)
    ? journeyStatusParam
    : "all";

  const riskCategory = isPatientRiskFilter(riskCategoryParam)
    ? riskCategoryParam
    : "all";

  const page = parsePositiveInteger(searchParams.get("page"), 1);

  const pageSize = parsePageSize(searchParams.get("page_size"));

  const filters: PatientListFilterValues = useMemo(
    () => ({
      search,
      journeyStatus,
      riskCategory,
      pageSize,
    }),
    [search, journeyStatus, riskCategory, pageSize],
  );

  const applyFilters = useCallback(
    (values: PatientListFilterValues) => {
      const nextSearchParams = new URLSearchParams(searchParams);

      const normalizedSearch = values.search.trim();

      if (normalizedSearch) {
        nextSearchParams.set("search", normalizedSearch);
      } else {
        nextSearchParams.delete("search");
      }

      if (values.journeyStatus !== "all") {
        nextSearchParams.set("journey_status", values.journeyStatus);
      } else {
        nextSearchParams.delete("journey_status");
      }

      if (values.riskCategory !== "all") {
        nextSearchParams.set("risk_category", values.riskCategory);
      } else {
        nextSearchParams.delete("risk_category");
      }

      if (values.pageSize !== 5) {
        nextSearchParams.set("page_size", String(values.pageSize));
      } else {
        nextSearchParams.delete("page_size");
      }

      nextSearchParams.set("page", "1");

      setSearchParams(nextSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const setPage = useCallback(
    (nextPage: number) => {
      const nextSearchParams = new URLSearchParams(searchParams);

      if (nextPage <= 1) {
        nextSearchParams.delete("page");
      } else {
        nextSearchParams.set("page", String(nextPage));
      }

      setSearchParams(nextSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    filters,
    page,
    applyFilters,
    setPage,
    resetFilters,
  };
}
