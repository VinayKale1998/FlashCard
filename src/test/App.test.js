import { render, screen } from "@testing-library/react";
import App from "../App";

import { Provider } from "react-redux";
import store from "../Store";
import "@testing-library/jest-dom"; // used to work with DOM

describe("App Homepage", () => {
  test("renders the FlashKrew Header Text", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/FlashKrew/i);
    expect(linkElement).toBeInTheDocument();
  });

  // test()
});
