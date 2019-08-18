import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function formatDate(date, addHour = false) {
  // Get the month and change the first character to upper case
  const month = format(date, 'MMMM', {
    locale: pt,
  });
  const capitalMonth = month.replace(
    month.charAt(0),
    month.charAt(0).toUpperCase()
  );

  // Get the date and add the month with the first character capitalized
  const formattedDate = addHour
    ? // Format the Month to have the first character in uppercase
      format(date, "d 'de' MMMM', às 'H'h'", {
        locale: pt,
      }).replace(month, capitalMonth)
    : format(date, "d 'de' ", {
        locale: pt,
      }) + capitalMonth;

  return formattedDate;
}
