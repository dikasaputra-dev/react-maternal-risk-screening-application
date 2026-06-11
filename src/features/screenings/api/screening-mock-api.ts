import { getAuthSession } from "@/features/auth/utils/auth-storage";
import type { ScreeningDto } from "@/features/screenings/types/screening.dto";
import type {
  ScreeningFormValues,
  ScreeningResult,
} from "@/features/screenings/types/screening.type";
import { calculateRisk } from "@/features/screenings/utils/risk-calculator";

const STORAGE_KEY = "maternity_screenings_mock";

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readScreenings(): ScreeningDto[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as ScreeningDto[];
  } catch {
    return [];
  }
}

function writeScreenings(screenings: ScreeningDto[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(screenings));
}

export async function submitScreeningMock(
  values: ScreeningFormValues,
): Promise<ScreeningResult> {
  await delay();

  const result = calculateRisk(values);
  const session = getAuthSession();

  const newScreening: ScreeningDto = {
    id: crypto.randomUUID(),
    patient_id: values.patientId,
    nurse_id: session?.user.id,
    nurse_name: session?.user.username ?? "Unknown",
    maternal_age: values.maternalAge,
    gravida: values.gravida,
    partus: values.partus,
    abortus: values.abortus,
    gestational_age_weeks: values.gestationalAgeWeeks,
    systolic_bp: values.systolicBp,
    diastolic_bp: values.diastolicBp,
    estimated_fetal_weight: values.estimatedFetalWeight,
    medical_history: values.medicalHistory,
    checklist_items: values.checklistItems,
    risk_score: result.riskScore,
    risk_category: result.riskCategory,
    created_at: new Date().toISOString(),
  };

  const screenings = readScreenings();

  writeScreenings([newScreening, ...screenings]);

  return result;
}
