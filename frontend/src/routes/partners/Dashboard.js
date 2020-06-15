import React, { useState, useCallback, useEffect } from "react";
import Sidebar from "../../components/partners/dashboard/sidebar";
import Main from "../../components/partners/dashboard/main";
import ProductsTab from "../../components/partners/dashboard/products/index";
import { connect } from "react-redux";
import { getCompany } from "../../redux/actions/index";
import { getProfile } from "../../components/auth/utils";
import AddForm from "../../components/partners/dashboard/products/add";
import Discounts from "../../components/partners/dashboard/discounts/index";
import PrivateAccess from "../../components/auth/private/index";
import { useHistory } from "react-router-dom";

const Dashboard = ({ get_company, company }) => {
  const [url, set_url] = useState("products");
  const [current_tab, set_current_tab] = useState(null);

  const profile = getProfile();

  const tabs = [
    {
      title: "Dashboard",
      url: "",
      component: <Main set_url={(v) => set_url(v)} company={company} />,
    },
    {
      title: "Products",
      url: "products",
      component: <ProductsTab set_url={(v) => set_url(v)} company={company} />,
    },
    {
      title: "Discounts",
      url: "discounts",
      component: <Discounts set_url={(v) => set_url(v)} company={company} />,
    },
    {
      url: "add_product",
      component: <AddForm set_url={(v) => set_url(v)} company={company} />,
    },
  ];

  const getTab = useCallback(() => {
    for (let tab of tabs) {
      if (tab.url === url) {
        set_current_tab(tab.component);
        return;
      }
    }

    set_current_tab(<div>Not found</div>);
  }, [tabs, url]);

  useEffect(() => {
    if (profile) {
      get_company(profile.user_claims.slug);
    }

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getTab();
    //eslint-disable-next-line
  }, [url, company]);

  return (
    <div className="dashboard">
      <Sidebar current_url={url} tabs={tabs} set_url={(v) => set_url(v)} />
      {current_tab}
    </div>
  );
};

const mapStateToProps = (state) => ({
  company: state.company.company,
});

const mapDispatchToProps = (dispatch) => ({
  get_company: (slug) => dispatch(getCompany(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
