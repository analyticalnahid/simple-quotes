import { Route, Routes, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Comments from "./components/comments/Comments";
import Layout from "./components/layout/Layout";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const QuoteDetails = React.lazy(() => import("./pages/QuoteDetail"));

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<div className="centered">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="quotes" />} />
          <Route path="new" element={<NewQuote />} />
          <Route path="quotes" element={<AllQuotes />}>
            <Route path=":quoteId/*" element={<QuoteDetails />}>
              <Route path="comments" element={<Comments />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
