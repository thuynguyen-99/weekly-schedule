import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Button, Modal, Form, Input, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const SignUpModal = () => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classes.signUpWrapper}>
      <Button primary onClick={showModal}>
        Log in
      </Button>
      <Modal
        title="LOGIN"
        open={isModalOpen}
        onCancel={handleCancel}
        className={classes.content}
        footer={[]}
        width={350}
      >
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a>Forgot password</a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <div className={classes.signUpText}>
              <div>Have not an account?</div>
              <a>Sign up here</a>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const useStyles = createUseStyles({
  signUpWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    justifyContent: "flex-end",
  },
  placeholder: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    color: "gray",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: 8,
  },
  content: {
    "& .ant-modal-header": {
      textAlign: "center",
    },
    "& .ant-form-item": {
      position: "relative",
    },
    "& .ant-form-item-control-input-content": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& > button": {
        width: "100%",
      },
    },
  },
  signUpText: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    width: "100%",
    marginTop: "2rem",
  },
});
export default SignUpModal;
