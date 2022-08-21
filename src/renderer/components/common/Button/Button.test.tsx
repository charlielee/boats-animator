import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

it("should call onClick when button is clicked", () => {
  const onClick = jest.fn();
  render(<Button title="Hello" onClick={onClick} />);

  expect(onClick).not.toBeCalled();

  userEvent.click(screen.getByText("Hello"));

  expect(onClick).toBeCalled();
});
