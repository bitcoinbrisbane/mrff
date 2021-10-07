import React from "react";
import useSWR from "swr";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import NodeTable from "./tables/NodeTable";

const NodeDetails = () => {
  const { data, error } = useSWR("/nodes");
  const isLoading = !data && !error;
  return (
    <div style={{ position: "relative" }}>
      <h2>Nodes</h2>
      <ErrorMessage error={error} />
      <Loader loading={isLoading} />
      <NodeTable nodes={data} />
    </div>
  );
};

export default NodeDetails;
