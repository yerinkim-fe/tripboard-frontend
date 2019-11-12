import { format } from 'date-fns';
import koLocale from 'date-fns/locale/ko';

const OPTS = {
  locale: koLocale
};

export default function getDateFormat(target) {
  const date = new Date(target);
  return format(date, "yyyy.MM.dd", OPTS);
}
