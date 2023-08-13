import "react-big-calendar/lib/css/react-big-calendar.css";

import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventModal from "./EventModal";
import { getFormattedDate } from "../utils/common";
import { v4 as uuid } from "uuid";
import { defaultEvents } from "../resources/events";
import SignUpModal from "./SignUpModal";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const classes = useStyles();
  const [myEvents, setMyEvents] = useState(defaultEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, _setState] = useState({});
  const setState = (obj) => _setState({ ...state, ...obj });

  const handleSelectSlot = (data) => {
    setState({
      start: getFormattedDate(data.start),
      end: getFormattedDate(data.start),
      title: "My event",
    });
    setIsModalOpen(true);
  };

  const onClose = () => {
    _setState({});
    setIsModalOpen(false);
  };

  const onSubmitEvent = () => {
    const { id, title, start, end, isEdit } = state;

    if (!title.trim() || !start || !end) return;
    const currentEvent = {
      id: id || uuid(),
      title,
      start,
      end: getFormattedDate(moment(end).add(1, "days")),
    };
    const newEvents = isEdit
      ? myEvents.map((i) => (i.id === id ? { ...i, ...currentEvent } : i))
      : [...myEvents, currentEvent];
    setMyEvents(newEvents);
    onClose();
  };

  const onSelectEvent = (data) => {
    setState({
      ...data,
      isEdit: true,
      end: getFormattedDate(moment(data.end).subtract(1, "days")),
    });
    setIsModalOpen(true);
  };

  const onDeleteEvent = () => {
    setMyEvents(myEvents.filter((i) => i.id !== (state || {}).id));
    onClose();
  };

  return (
    <div className={classes.calendarContainer}>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={onSelectEvent}
        selectable
      />
      {isModalOpen && (
        <EventModal
          onClose={onClose}
          isOpen={isModalOpen}
          data={state}
          onChange={setState}
          onSubmit={onSubmitEvent}
          onDeleteEvent={onDeleteEvent}
        />
      )}
      <SignUpModal />
    </div>
  );
};

const useStyles = createUseStyles({
  calendarContainer: {
    position: "relative",
    "& .rbc-toolbar > span:last-child": {
      display: "none",
    },
  },
});
export default MyCalendar;
