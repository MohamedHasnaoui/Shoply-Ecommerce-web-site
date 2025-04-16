import {
  addDays,
  endOfMonth,
  endOfWeek,
  endOfYear,
  isBefore,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { PeriodFilter } from "../src/graphql/types/resolvers-types.js";
import { format } from "date-fns";

export class DateUtil {
  getStartDateOfPeriod(period?: PeriodFilter) {
    if (!period) return undefined;
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    if (period === PeriodFilter.Month) date = startOfMonth(date);
    else if (period === PeriodFilter.Week)
      date = startOfWeek(date, { weekStartsOn: 1 });
    else if (period === PeriodFilter.Year) date = startOfYear(date);
    return date;
  }
  getEndDateOfPeriod(period?: PeriodFilter) {
    if (!period) return undefined;
    let date = new Date();
    if (period === PeriodFilter.Month) date = endOfMonth(date);
    else if (period === PeriodFilter.Week)
      date = endOfWeek(date, { weekStartsOn: 1 });
    else if (period === PeriodFilter.Year) date = endOfYear(date);
    return date;
  }
  generateDateRange(start: Date, end: Date): string[] {
    const dates: string[] = [];
    let current = start;

    while (isBefore(current, addDays(end, 1))) {
      dates.push(format(current, "yyyy-MM-dd"));
      current = addDays(current, 1);
    }
    return dates;
  }
}

export const dateUtil = new DateUtil();
