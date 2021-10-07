import React from "react";
import { Router as ReactRouter, Route, Switch } from "react-router-dom";
import { DepositModalForm } from "./forms/DepositForm";
import { TransferModalForm } from "./forms/TransferForm";
import AddressPage from "../pages/OpportunityPage";


import AuthRoute from "../components/AuthRoute";
// import RefreshLoginModal from "../components/forms/LoginForm/RefreshLoginModal";
// import AccountInfoesModalEdit from "./forms/AccountInfoesForm/AccountInfoesModalEdit";
// import DepositHintsModalForm from "../components/forms/DepositHintsForm/DepositHintsModalForm";
// import PendingTransferModalForm from "../components/forms/PendingTransferForm/PendingTransferModalForm";
// import { createBrowserHistory } from "history";
// import EnterprisesPage from "../pages/EnterprisesPage";
// import EnterpriseModalEdit from "./forms/EnterprisesForm/EnterpriseModalEdit";
// import RebuildDepositFormModal from "./forms/RebuildDepositForm/RebuildDepositFormModal";
// import ReferralStrategyModal from "./forms/ReferralStrategyForm/ReferralStrategyModal";
// import ReferralSettingModel from "./forms/ReferralStrategyForm/ReferralSettingModel";
// import UnmatchedDeposit from "../pages/UnmatchedDepositPage";

export const history = createBrowserHistory();

const Router = () => (
  <ReactRouter history={history}>
    <RefreshLoginModal />
    <Switch>
      <Route path="/login" component={LoginPage} />
      <AuthRoute path="/deposits/upload" component={DepositsUploadPage} />
      <AuthRoute path="/deposits/unmatched" component={UnmatchedDeposit} />
      <AuthRoute path="/deposits" component={DepositsPage} />
      <AuthRoute path="/pendingtransfers" component={PendingTransfersPage} />
      <AuthRoute path="/transfers" component={TransfersPage} />
      <AuthRoute path="/transactions" component={TransactionsPage} />
      <AuthRoute path="/addresses" component={AddressPage} />
      <AuthRoute path="/history" component={HistoryPage} />
      <AuthRoute path="/referral" component={ReferralPage} />
      <AuthRoute path="/users" component={UserPage} />
      <AuthRoute path="/user/:id" component={UserDetailsPage} />
      <AuthRoute path="/enterprises" component={EnterprisesPage} />
      <AuthRoute path="/" component={HomePage} />
    </Switch>
    <Switch>
      <AuthRoute
        path="/referral/strategy/add"
        component={ReferralStrategyModal}
      />
      <AuthRoute
        path="/referral/strategy/edit/:id"
        component={ReferralStrategyModal}
      />
      <AuthRoute
        path="/referral/setting/add"
        component={ReferralSettingModel}
      />
      <AuthRoute
        path="/referral/setting/edit/:id"
        component={ReferralSettingModel}
      />
      <AuthRoute path="/enterprises/add" component={EnterpriseModalEdit} />
      <AuthRoute path="/enterprises/edit/:id" component={EnterpriseModalEdit} />
      <AuthRoute path="/deposits/add" component={DepositModalForm} />
      <AuthRoute path="/deposits/edit/:id" component={DepositModalForm} />
      <AuthRoute
        path="/deposits/rebuild/:id"
        component={RebuildDepositFormModal}
      />
      <AuthRoute path="/transfers/edit/:id" component={TransferModalForm} />
      <AuthRoute
        path="/user/:id/accountinfoes/edit"
        component={AccountInfoesModalEdit}
      />
      <AuthRoute
        path="/user/:id/deposithints/edit"
        component={DepositHintsModalForm}
      />
      <AuthRoute
        path="/pendingtransfers/process/:selected"
        component={PendingTransferModalForm}
      />
      <Route path="*/refreshlogin" component={RefreshLoginModal} />
    </Switch>
  </ReactRouter>
);

export default Router;
