import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { RiskBadge } from "@/features/clinical-risk/components/risk-badge";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/date";

import { clinicalTimelineEventConfig } from "../constants/patient-journey-config";
import type { ClinicalTimelineEvent } from "../types/patient-journey.type";

type ClinicalTimelineProps = {
  events: ClinicalTimelineEvent[];
};

function TimelineEventCard({
  event,
  isLast,
}: {
  event: ClinicalTimelineEvent;
  isLast: boolean;
}) {
  const eventConfig = clinicalTimelineEventConfig[event.type];

  return (
    <li className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4">
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute left-5 top-10 h-[calc(100%-1rem)] w-px bg-slate-200"
        />
      )}

      <div
        aria-hidden="true"
        className={cn(
          "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold",
          eventConfig.markerClassName,
        )}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-current" />
      </div>

      <article className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="default">{eventConfig.label}</Badge>

            <h3 className="mt-3 font-semibold text-slate-900">{event.title}</h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              {event.description}
            </p>
          </div>

          {event.risk && (
            <RiskBadge
              category={event.risk.category}
              score={event.risk.score}
              showScore
            />
          )}
        </div>

        {event.details.length > 0 && (
          <dl className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {event.details.map((detail) => (
              <div
                key={`${detail.label}-${detail.value}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <dt className="text-xs text-slate-500">{detail.label}</dt>

                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-4 flex flex-col gap-1 border-t border-slate-200 pt-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <time dateTime={event.occurredAt}>
            {formatDateTime(event.occurredAt)}
          </time>

          {event.recordedBy && (
            <p>
              Dicatat oleh{" "}
              <span className="font-medium text-slate-700">
                {event.recordedBy}
              </span>
            </p>
          )}
        </div>
      </article>
    </li>
  );
}

export function ClinicalTimeline({ events }: ClinicalTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Timeline</CardTitle>

        <CardDescription>
          Urutan aktivitas pelayanan pasien dari yang paling baru hingga paling
          lama.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {events.length === 0 ? (
          <EmptyState
            title="Belum ada aktivitas klinis"
            description="Timeline akan terisi setelah skrining awal atau pelayanan pasien mulai dicatat."
          />
        ) : (
          <ol
            aria-label="Timeline pelayanan klinis pasien"
            className="space-y-0"
          >
            {events.map((event, index) => (
              <TimelineEventCard
                key={`${event.type}-${event.id}`}
                event={event}
                isLast={index === events.length - 1}
              />
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
