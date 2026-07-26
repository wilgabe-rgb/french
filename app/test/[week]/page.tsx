import { notFound } from "next/navigation";
import { WEEKS, getWeek } from "@/lib/curriculum";
import { TestRunner } from "./TestRunner";

export function generateStaticParams() {
  return WEEKS.map((w) => ({ week: String(w.week) }));
}

export default async function TestPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const w = getWeek(Number(week));
  if (!w) notFound();

  const lastDay = w.days[w.days.length - 1].day;
  return <TestRunner week={w.week} title={w.title} outcome={w.outcome} day={lastDay} />;
}
