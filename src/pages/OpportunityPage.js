import React from "react";
import Layout from "../components/Layout";
import useSWR from "swr";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import AddressTable from "../components/tables/OpportunityTable";

const OpportunityPage = () => {
  const { data, error } = useSWR("/address");
  const isLoading = !data && !error;

  return (
    <Layout activeTab="Opportunity">
      <div className="container-fluid py-5">
        <Loader loading={isLoading} />
        <h1 className="mb-3">Opportunity</h1>
        <ErrorMessage error={error} />
        <AddressTable addresses={data} />
      </div>
    </Layout>
  );
};

export default OpportunityPage;
