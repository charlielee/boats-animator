import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../testing/TestHelper";
import Button from "./Button";

const getButton = () => screen.getByRole("button");

it("should call onClick when button is clicked", async () => {
  const buttonTitle = "Hello";
  const onClick = jest.fn();
  renderWithProviders(<Button title={buttonTitle} onClick={onClick} />);

  expect(onClick).not.toBeCalled();

  await userEvent.click(getButton());

  expect(onClick).toBeCalled();
});

it("should not call onClick when button is disabled", async () => {
  const buttonTitle = "Hello";
  const onClick = jest.fn();
  renderWithProviders(<Button title={buttonTitle} onClick={onClick} disabled />);

  await userEvent.click(getButton());

  expect(onClick).not.toBeCalled();
  expect(getButton()).toBeDisabled();
});
