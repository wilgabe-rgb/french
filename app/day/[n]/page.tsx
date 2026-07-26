import { notFound } from "next/navigation";
import { DAYS, getDay, isTestDay } from "@/lib/curriculum";
import { scenarioById } from "@/lib/scenarios";
import { DayRunner } from "./DayRunner";

export function generateStaticParams() {
  return DAYS.map((d) => ({ n: String(d.day) }));
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const day = getDay(Number(n));
  if (!day) notFound();

  return (
    <DayRunner
      day={day}
      scenario={scenarioById(day.scenario)}
      isTestDay={isTestDay(day.day)}
    />
  );
}
