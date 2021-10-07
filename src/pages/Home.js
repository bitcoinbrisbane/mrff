import React from "react";
import Layout from "../components/Layout";
import Exchange from "../components/Wallets/Exchange";
import Wallet from "../components/Wallets/Wallet";
import TimeSeries from "../components/Stats/TimeSeries";
import NodeDetails from "../components/NodeDetails";
import Card from "../components/Card";

const Home = () => {
  return (
    <Layout>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col">
            <Card>
              <NodeDetails />
            </Card>
            <Card>
              <Wallet />
            </Card>
            <Card>
              <Exchange />
            </Card>
          </div>
          <div className="col">
            <Card>
              <TimeSeries title="Weekly transfer amounts" series="timeseries" />
            </Card>
            <Card>
              <TimeSeries title="Monthly signup count" series="signups" />
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
