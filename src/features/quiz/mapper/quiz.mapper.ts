import type {
  QuizPayloadDto,
  QuizResultDto,
} from "@/features/quiz/types/quiz.dto";
import type {
  QuizFormValues,
  QuizResult,
} from "@/features/quiz/types/quiz.type";

export function mapQuizFormToPayload(values: QuizFormValues): QuizPayloadDto {
  return {
    maternal_age: values.maternalAge,
    gestational_age_weeks: values.gestationalAgeWeeks,
    systolic_bp: values.systolicBp,
    diastolic_bp: values.diastolicBp,
    symptoms: {
      bleeding: values.hasBleeding,
      severe_headache: values.hasSevereHeadache,
      swollen_hands_face: values.hasSwollenHandsFace,
      fever: values.hasFever,
      reduced_fetal_movement: values.hasReducedFetalMovement,
    },
  };
}

export function mapQuizResultDtoToResult(dto: QuizResultDto): QuizResult {
  return {
    token: dto.token,
    riskScore: dto.risk_score,
    riskCategory: dto.risk_category,
    recommendation: dto.recommendation,
    submittedAt: dto.submitted_at,
  };
}
