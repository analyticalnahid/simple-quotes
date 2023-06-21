import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { getAllQuotes } from "../lib/api";
import { Fragment } from "react";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <div className="centered">Loading...</div>;
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <Fragment>
      <QuoteList quotes={loadedQuotes}></QuoteList>
      <Outlet />
    </Fragment>
  );
};

export default AllQuotes;
