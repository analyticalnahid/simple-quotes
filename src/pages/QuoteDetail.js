import { Outlet, useParams, Link, Routes, Route } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { Fragment, useEffect } from "react";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetails = () => {
  const params = useParams();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p className="centered">No Quote Found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Routes>
        <Route
          path={`/quotes/${params.quoteId}`}
          element={
            <div>
              <Link to={`/quotes/${params.quoteId}/comments`}>
                Load Comments
              </Link>
            </div>
          }
        />
        <Route
          path={`/quotes/${params.quoteId}/comments`}
          element={<Comments />}
        />
      </Routes>
      <Outlet />
    </Fragment>
  );
};

export default QuoteDetails;
