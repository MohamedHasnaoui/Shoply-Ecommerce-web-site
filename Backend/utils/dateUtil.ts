import { PeriodFilter } from "../src/graphql/types/resolvers-types.js";

export class DateUtil {
  getStartDateOfPeriod(period?: PeriodFilter) {
    let date: undefined | Date = undefined;
    if (period) {
      date = new Date();
      date.setHours(0, 0, 0, 0);
    }
    if (period === PeriodFilter.Month) date.setDate(1);
    else if (period === PeriodFilter.Week) date.setDate(date.getDate() - 7);
    else if (period === PeriodFilter.Year) date.setMonth(0, 1);
    return date;
  }
}

export const dateUtil = new DateUtil();
