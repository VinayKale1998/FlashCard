import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // used to work with DOM
import CreateFlashCard from "../../Pages/CreateFlashCard";
import userEvent from "@testing-library/user-event"; // pre built with create-react-app for acting
import { Provider } from "react-redux";
import store from "../../Store";
import { act } from "react-dom/test-utils";

describe("testing createFlashCardPage  ", () => {
  test("renders Group and Group description fields", () => {
    //arrange
    render(
      <Provider store={store}>
        <CreateFlashCard />
      </Provider>
    );
    //assert
    const groupName = screen.getByText(/Group Name/i);
    expect(groupName).toBeInTheDocument();
  });
  test("renders 'Term Name' twice when clicked on add more ", () => {
    //arrange

    render(
      <Provider store={store}>
        <CreateFlashCard />
      </Provider>
    );

    //act
    const addMore = screen.getByText(/Add More +/i);
    act(() => {
      userEvent.click(addMore);
      screen.debug();
    });

    //assert
    const outPutElement = screen.getAllByPlaceholderText(
      /Enter Term Description/i
    );
    expect(outPutElement).toHaveLength(4); // should be two but we have two text area renders for 2 tailwind break points
  });
});
