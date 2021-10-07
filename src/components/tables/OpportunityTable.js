import React from "react";
import Table from "./Table";
import { Link } from "react-router-dom";

// dataField (key) props (value)
const columnConfig = {
  opportunity_id: {
    children: "ID",
    width: "8%"
  },
  title: {
    children: "Title"
  },
  stream: {
    children: "Stream"
  },
  // userID: {
  //   children: "User ID",
  //   dataFormat: uid => <Link to={{ pathname: `/user/${uid}` }}>{uid}</Link>
  // }
};

const OpportunityTable = ({ opportunities, ...props }) => (
  <Table
    data={opportunities}
    columnConfig={columnConfig}
    keyField="opportunity_id"
    {...props}
  />
);

export default OpportunityTable;
