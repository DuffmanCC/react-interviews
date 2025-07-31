import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("renders main heading", () => {
    expect(
      screen.getByText(/useState and useRef counter/i)
    ).toBeInTheDocument();
  });

  test("updates state value on button click", () => {
    const stateButton = screen.getByText("Count state");
    const stateValue = screen.getByTestId("state-value");

    fireEvent.click(stateButton);
    fireEvent.click(stateButton);

    expect(stateValue).toHaveTextContent("2");
  });

  test("does not update ref value in DOM without re-render", () => {
    const refButton = screen.getByText("Count ref");
    const refValue = screen.getByTestId("ref-value");

    fireEvent.click(refButton);
    fireEvent.click(refButton);

    // useRef does not trigger a re-render, so value remains stale in DOM
    expect(refValue).toHaveTextContent("0");
  });

  test("displays updated ref value after state re-render", () => {
    const stateButton = screen.getByText("Count state");
    const stateValue = screen.getByTestId("state-value");
    const refButton = screen.getByText("Count ref");
    const refValue = screen.getByTestId("ref-value");

    fireEvent.click(stateButton); // state: 1
    fireEvent.click(stateButton); // state: 2
    fireEvent.click(refButton); // ref: 1
    fireEvent.click(refButton); // ref: 2
    fireEvent.click(stateButton); // state: 3 → triggers re-render

    expect(stateValue).toHaveTextContent("3");
    expect(refValue).toHaveTextContent("2"); // ref is now visible due to re-render
  });
});
