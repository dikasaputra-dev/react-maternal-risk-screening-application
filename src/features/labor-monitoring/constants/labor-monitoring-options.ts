import type {
  AmnioticFluidColor,
  ContractionIntensity,
  FetalMovementStatus,
  HeadDescentLevel,
  MembraneStatus,
  UrineMarker,
} from "../types/labor-monitoring.type";

export type LaborMonitoringOption<TValue extends string> = {
  label: string;
  value: TValue;
};

function createLabelMap<TValue extends string>(
  options: LaborMonitoringOption<TValue>[],
) {
  return Object.fromEntries(
    options.map((option) => [option.value, option.label]),
  ) as Record<TValue, string>;
}

export const fetalMovementOptions: LaborMonitoringOption<FetalMovementStatus>[] =
  [
    {
      label: "Aktif",
      value: "active",
    },
    {
      label: "Berkurang",
      value: "reduced",
    },
    {
      label: "Tidak Terasa",
      value: "not_felt",
    },
  ];

export const contractionIntensityOptions: LaborMonitoringOption<ContractionIntensity>[] =
  [
    {
      label: "Lemah",
      value: "weak",
    },
    {
      label: "Sedang",
      value: "moderate",
    },
    {
      label: "Kuat",
      value: "strong",
    },
  ];

export const headDescentOptions: LaborMonitoringOption<HeadDescentLevel>[] = [
  {
    label: "Belum Dinilai",
    value: "not_assessed",
  },
  {
    label: "Hodge I",
    value: "hodge_i",
  },
  {
    label: "Hodge II",
    value: "hodge_ii",
  },
  {
    label: "Hodge III",
    value: "hodge_iii",
  },
  {
    label: "Hodge IV",
    value: "hodge_iv",
  },
];

export const membraneStatusOptions: LaborMonitoringOption<MembraneStatus>[] = [
  {
    label: "Utuh",
    value: "intact",
  },
  {
    label: "Pecah",
    value: "ruptured",
  },
];

export const amnioticFluidColorOptions: LaborMonitoringOption<AmnioticFluidColor>[] =
  [
    {
      label: "Jernih",
      value: "clear",
    },
    {
      label: "Hijau",
      value: "green",
    },
    {
      label: "Cokelat",
      value: "brown",
    },
    {
      label: "Bercampur Darah",
      value: "bloody",
    },
    {
      label: "Lainnya",
      value: "other",
    },
  ];

export const urineMarkerOptions: LaborMonitoringOption<UrineMarker>[] = [
  {
    label: "Negatif (-)",
    value: "negative",
  },
  {
    label: "Positif (+)",
    value: "positive",
  },
];

export const fetalMovementLabelMap = createLabelMap(fetalMovementOptions);

export const contractionIntensityLabelMap = createLabelMap(
  contractionIntensityOptions,
);

export const headDescentLabelMap = createLabelMap(headDescentOptions);

export const membraneStatusLabelMap = createLabelMap(membraneStatusOptions);

export const amnioticFluidColorLabelMap = createLabelMap(
  amnioticFluidColorOptions,
);

export const urineMarkerLabelMap = createLabelMap(urineMarkerOptions);
