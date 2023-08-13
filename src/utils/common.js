import moment from "moment";
import { DEFAULT_DATE } from "./constant";

export const getFormattedDate = (date = moment(), type = DEFAULT_DATE) => {
  return moment(date).format(type);
};
