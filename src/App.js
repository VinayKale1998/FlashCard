import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const CreateFlashCard = React.lazy(() => import("./Pages/CreateFlashCard"));
const ErrorPage = React.lazy(() => import("./Pages/ErrorPage"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const MyFlashCards = React.lazy(() => import("./Pages/MyFlashCards"));
const FlashCard = React.lazy(() => import("./Pages/FlashCards"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CreateFlashCard />
            </Suspense>
          ),
        },
        {
          path: "MyFlashCards",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <MyFlashCards />
            </Suspense>
          ),
        },
        {
          path: "MyFlashCards/:index",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <FlashCard />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
