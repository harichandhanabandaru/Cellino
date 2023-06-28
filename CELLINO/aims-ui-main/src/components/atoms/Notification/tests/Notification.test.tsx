import { render } from "@testing-library/react";
import { NotificationIcon } from "../index";

describe("NotificationIcon test cases", () => {
  test("NotificationIcon rendered", () => {
    render(<NotificationIcon variant="dot" overlap="circular" />);
  });
});
