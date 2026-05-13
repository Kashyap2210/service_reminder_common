/**
 * Utility class for validating date codes in `YYYYMMDD` format.
 *
 * @example new DateCodeUtils(20240315)
 *
 * @methods
 * - `isValidYYYYMMDD()` — checks if the date code is a real calendar date. e.g. `new DateCodeUtils(20240315).isValidYYYYMMDD() // true`
 */
export class DateCodeUtils {
  stringifiedDateCode: string;
  constructor(private readonly dateCode: string | number) {
    this.stringifiedDateCode = String(this.dateCode);
    if (!this.isValidYYYYMMDD()) {
      throw new Error(
        `Invalid date code: "${this.stringifiedDateCode}". Expected format: YYYYMMDD.`,
      );
    }
  }

  isValidYYYYMMDD(): boolean {
    if (!/^\d{8}$/.test(this.stringifiedDateCode)) return false;

    const { year, month, day } = this.parseDateParts();

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  toLongDateString(): string {
    const { year, month, day } = this.parseDateParts();

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  addMonths(months: number): string {
    const { year, month, day } = this.parseDateParts();

    const date = new Date(year, month - 1 + months, day);

    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    const newDay = String(date.getDate()).padStart(2, "0");

    return `${newYear}${newMonth}${newDay}`;
  }

  addDays(days: number): string {
    const { year, month, day } = this.parseDateParts();

    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days);

    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    const newDay = String(date.getDate()).padStart(2, "0");

    return `${newYear}${newMonth}${newDay}`;
  }

  addWeeks(weeks: number): string {
    return this.addDays(weeks * 7);
  }

  addYears(years: number): string {
    const { year, month, day } = this.parseDateParts();

    const date = new Date(year + years, month - 1, day);

    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    const newDay = String(date.getDate()).padStart(2, "0");

    return `${newYear}${newMonth}${newDay}`;
  }

  private parseDateParts(): { year: number; month: number; day: number } {
    return {
      year: parseInt(this.stringifiedDateCode.substring(0, 4), 10),
      month: parseInt(this.stringifiedDateCode.substring(4, 6), 10),
      day: parseInt(this.stringifiedDateCode.substring(6, 8), 10),
    };
  }

  static getCurrentYear(): number {
    return new Date().getFullYear();
  }

  static daysDiff(dateCode: string | number): number {
    const { year, month, day } = new DateCodeUtils(dateCode).parseDateParts();
    const target = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffMs = target.getTime() - today.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  static getCurrentDateCode(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }
}
