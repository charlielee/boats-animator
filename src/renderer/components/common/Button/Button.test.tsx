import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../testing/TestHelper";
import Button from "./Button";

it("should call onClick when button is clicked", async () => {
  const buttonTitle = "Hello";
  const onClick = jest.fn();
  renderWithProviders(<Button title={buttonTitle} onClick={onClick} />);

  expect(onClick).not.toBeCalled();

  await userEvent.click(screen.getByText(buttonTitle));

  expect(onClick).toBeCalled();
});
