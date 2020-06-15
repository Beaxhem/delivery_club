import React, { useState, useEffect, useCallback } from "react";
import Card from "./card";
import { connect } from "react-redux";
import { getCompanies } from "../../redux/actions/index";

const Companies = ({ get_companies, companies, last_id, locked }) => {
  const [again, set_again] = useState(false);

  const load_more = useCallback(() => {
    get_companies(last_id, process.env.REACT_APP_COMPANIES_PER_PAGE);
    if (!again) {
      set_again(true);
    }
  }, [again, get_companies, last_id]);

  useEffect(() => {
    load_more();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className="font-weight-bold mt-3">Restaurants</h2>
      <div className="d-flex  catalog justify-content-between flex-wrap">
        {companies.map((item, i) => (
          <Card key={i} item={item} items={companies} />
        ))}
      </div>
      <center className="mt-3 mb-3">
        <button
          disabled={locked}
          onClick={() => load_more()}
          className="btn btn-lg bg-info text-white"
        >
          Load more
        </button>
      </center>
    </div>
  );
};

const mapStateToProps = (state) => ({
  last_id: state.companies.last_id,
  locked: state.companies.locked,
  companies: state.companies.companies,
});

const mapDispatchToProps = (dispatch) => ({
  get_companies: (last_id, per_page) =>
    dispatch(getCompanies(last_id, per_page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
