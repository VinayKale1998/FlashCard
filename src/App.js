import { createBrowserRouter,RouterProvider } from "react-router-dom";
import CreateFlashCard from "./Pages/CreateFlashCard";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";


function App() {
  const router = createBrowserRouter([
    
    {
      path:'/', element:<HomePage></HomePage>, errorElement:<ErrorPage></ErrorPage>
      , children: [
        {
          index: true,
          element: <CreateFlashCard></CreateFlashCard>,
        },
        {
          path: "/MyFlashCards",
          element: <MyFlashCards></MyFlashCards>,
        }
        // {
        //   path:'/MyFlashCards/:index',
        //   element:<FlashCardDetails></FlashCardDetails>
        // }
      ],
    }
  
  ]);

  return  <RouterProvider router={router}></RouterProvider>;
}

export default App;
