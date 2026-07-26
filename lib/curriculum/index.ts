import type { Day, Item, Week } from "../types";
import { W01 } from "./w01";
import { W02 } from "./w02";
import { W03 } from "./w03";
import { W04 } from "./w04";
import { W05 } from "./w05";
import { W06 } from "./w06";
import { W07 } from "./w07";
import { W08 } from "./w08";
import { W09 } from "./w09";
import { W10 } from "./w10";
import { W11 } from "./w11";
import { W12 } from "./w12";
import { W13 } from "./w13";

export const WEEKS: Week[] = [
  W01,
  W02,
  W03,
  W04,
  W05,
  W06,
  W07,
  W08,
  W09,
  W10,
  W11,
  W12,
  W13,
];

export const DAYS: Day[] = WEEKS.flatMap((w) => w.days);

export const TOTAL_DAYS = DAYS.length;

export const getDay = (n: number): Day | undefined =>
  DAYS.find((d) => d.day === n);

export const getWeek = (n: number): Week | undefined =>
  WEEKS.find((w) => w.week === n);

/** Every item in the course, flat, for lookups by the weak-spot engine. */
export const ALL_ITEMS: Item[] = DAYS.flatMap((d) => d.items);

const ITEM_INDEX = new Map(ALL_ITEMS.map((i) => [i.id, i]));

export const getItem = (id: string): Item | undefined => ITEM_INDEX.get(id);

/** Items taught on or before a given day — the pool a test can draw from. */
export const itemsUpTo = (dayNumber: number): Item[] =>
  DAYS.filter((d) => d.day <= dayNumber).flatMap((d) => d.items);

/** Test days are every 7th day; day 90 is the final assessment. */
export const isTestDay = (n: number): boolean => n % 7 === 0 || n === TOTAL_DAYS;
