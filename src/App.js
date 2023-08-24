import { createBrowserRouter,RouterProvider } from "react-router-dom";
import CreateFlashCard from "./Pages/CreateFlashCard";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import MyFlashCards from "./Pages/MyFlashCards";
import FlashCard from "./Pages/FlashCards";




// Contains code for route configurations for react-router-dom and renders the RouterProvider , has an Errorpage to handle incorrect paths by the user
//contains HomePage, CreateFlashCard page ,myFlashCards page, FlashCard Page and Error page
 

function App() {
  const router = createBrowserRouter([
    
    {
      path:'/', element:<HomePage></HomePage>, errorElement:<ErrorPage></ErrorPage>
      , children: [
        {
          //create flashcard defaults for the outlet of homepage 
          index: true,
          element: <CreateFlashCard></CreateFlashCard>,
        },
        {
          path:'MyFlashCards',
          element: <MyFlashCards></MyFlashCards>,
        },


        {
          path:'MyFlashCards/:index',
          element:<FlashCard></FlashCard>
        }
      ]
    }
  
  ]);
//routerProvider called with router as the attribute
  return  <RouterProvider router={router}></RouterProvider>;
}

export default App;
