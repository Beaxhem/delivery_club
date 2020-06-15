import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCompany } from "../../redux/actions/index";
import Banner from "./banner";
import Products from "./products";

const Details = ({ get_company, slug, company }) => {
  useEffect(() => {
    get_company(slug);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Banner
        title={company.name}
        rating={4.0}
        specialization={company.specialization}
        slug={slug}
        backgroundUrl={company.image ? company.image.url : ""}
      />
      <Products products={company.products} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  company: state.company.company,
});

const mapDispatchToProps = (dispatch) => ({
  get_company: (slug) => dispatch(getCompany(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
