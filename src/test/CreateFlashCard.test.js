import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // used to work with DOM
import CreateFlashCard from "../Pages/CreateFlashCard";
import userEvent from "@testing-library/user-event"; // pre built with create-react-app for acting
import { Provider } from "react-redux";
import store from "../Store/index";
import { act } from "react-dom/test-utils";
import App from "../App"



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
  test("renders Group description field", () => {
    //arrange
    render(
      <Provider store={store}>
        <CreateFlashCard />
      </Provider>
    );
    //assert
    const groupName = screen.getByText(/Group Description/i);
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
  })

  test("renders the FlashKrew Header Text", () => {
    render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    const linkElement = screen.getByText(/FlashKrew/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the Create New Link", () => {
    render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    const linkElement = screen.getByText(/Create New/i);
    expect(linkElement).toBeInTheDocument();
  });



  
  test("renders the My FlashCards link", () => {
    render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    const linkElement = screen.getByText(/My FlashCards/i);
    expect(linkElement).toBeInTheDocument();
  });
 
  
  
});
