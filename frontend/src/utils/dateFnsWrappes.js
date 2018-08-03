import formatClean from "date-fns/format";
import isSameDayClean from "date-fns/isSameDay";
import startOfWeekClean from "date-fns/startOfWeek";
import endOfWeekClean from "date-fns/endOfWeek";
import isWithinIntervalClean from "date-fns/isWithinInterval";
import isValidClean from "date-fns/isValid";
import localeEn from "date-fns/locale/en-GB";

const format = (date, formatStr) => {
  return formatClean(date, formatStr, {
    locale: localeEn
  });
};
const isSameDay = (dateLeft, dateRight) => {
  return isSameDayClean(dateLeft, dateRight);
};
const startOfWeek = date => {
  return startOfWeekClean(date, { weekStartsOn: 1 });
};
const endOfWeek = date => {
  return endOfWeekClean(date, { weekStartsOn: 1 });
};
const isWithinInterval = (date, interval) => {
  return isWithinIntervalClean(date, interval);
};
const isValid = date => {
  return isValidClean(date);
};

export { format, isSameDay, startOfWeek, endOfWeek, isWithinInterval, isValid };
