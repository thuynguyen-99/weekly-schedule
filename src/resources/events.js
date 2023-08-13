import moment from "moment";
const now = moment();

export const defaultEvents = [
  {
    id: 0,
    title: "Event with a very long title",
    start: now,
    end: now,
  },
  {
    id: 1,
    title: "Long Event",
    start: moment("2023-07-31"),
    end: moment("2023-08-10"),
  },
  {
    id: 2,
    title: "Short event",
    start: moment("2023-08-02"),
    end: moment("2023-08-02"),
  },
];
