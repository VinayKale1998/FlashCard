import React from "react";
import { Suspense } from "react";
const FlashCardsView = React.lazy(() =>
  import("../UI-Components/FlashCardsView")
);
const FlashCards = () => {
  return (
    <Suspense fallback={() => <div>Loading..</div>}>
      <FlashCardsView />;
    </Suspense>
  );
};

export default FlashCards;
