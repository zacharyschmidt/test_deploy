import React from 'react';
import { ISeries } from './types';
import { Link } from 'react-router-dom';

export default function CatCard(props: any) {
  const { singleCat, selected, toggle, dispatch, fetchParentCats, filters } = props;
  const handleClick = () => {
    console.log(singleCat);
    fetchParentCats(dispatch, singleCat.category_id, filters);
  };
  return (
    <div className="card-container">
      <section
        key={singleCat.category_id}
        className="series-box"
        onClick={handleClick}
      >
        {/* <Link to={`/demo/details/${singleSeries.seriesID}`}> */}
        <div>{singleCat.name}</div>
        <br />
        <div>{singleCat.dataset_name}</div>
        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          {/* <button type="button" onClick={toggle}>
            {selected.find(
              (select: ISeries) => select.seriesID === singleSeries.seriesID
            )
              ? 'Deselect'
              : 'Select'} */}
          {/* </button> */}
        </section>
      </section>
    </div>
  );
}