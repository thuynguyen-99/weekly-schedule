import React from "react";
import { Modal, Input, DatePicker, Button } from "antd";
import moment from "moment";
import { createUseStyles } from "react-jss";
import dayjs from "dayjs";
import { DEFAULT_DATE } from "../utils/constant";
import { getFormattedDate } from "../utils/common";

const EventModal = (props) => {
  const classes = useStyles();
  const {
    data = {},
    isOpen,
    onClose = () => {},
    onChange = () => {},
    onSubmit = () => {},
    onDeleteEvent = () => {},
  } = props;
  const { start, end, title, isEdit } = data;
  const invalidTitle = title.trim() === "";

  const onUpdateData = (newValue, type) => {
    let value = newValue;
    if (["start", "end"].includes(type) && !newValue.trim()) {
      value = getFormattedDate();
    }
    if (
      (type === "start" && moment(value).diff(moment(end)) > 0) ||
      (type === "end" && moment(value).diff(moment(start)) < 0)
    ) {
      onChange({ start: value, end: value });
      return;
    }

    onChange({ [type]: value });
  };

  const customFooter = [
    <Button key="back" onClick={onClose}>
      Cancel
    </Button>,
    isEdit && (
      <Button key="delete" type="primary" danger onClick={onDeleteEvent}>
        Delete
      </Button>
    ),
    <Button
      key="submit"
      type="primary"
      onClick={onSubmit}
      disabled={invalidTitle}
    >
      {isEdit ? "Update" : "Create"}
    </Button>,
  ];

  return (
    <Modal
      title={isEdit ? "Update event" : "Create event"}
      open={isOpen}
      onCancel={onClose}
      onOk={onSubmit}
      footer={customFooter}
    >
      <div className={classes.mainLayout}>
        <div>
          <div>Name</div>
          <Input
            value={title}
            onChange={(e) => onUpdateData(e.target.value, "title")}
          />
          {invalidTitle && (
            <i style={{ color: "tomato" }}>*Please fill for event name.</i>
          )}
        </div>
        <div className={classes.dateContainer}>
          <div>
            <div>Start date</div>
            <DatePicker
              value={start ? dayjs(start, DEFAULT_DATE) : ""}
              format={DEFAULT_DATE}
              onChange={(_, date) => onUpdateData(date, "start")}
            />
          </div>
          <div>
            <div>End date</div>
            <DatePicker
              value={end ? dayjs(end, DEFAULT_DATE) : ""}
              format={DEFAULT_DATE}
              onChange={(_, date) => onUpdateData(date, "end")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

const useStyles = createUseStyles({
  mainLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    margin: "2rem 0",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    "& > div": {
      flex: "50%",
      "& > div": {
        width: "100%",
      },
    },
  },
});

export default EventModal;
