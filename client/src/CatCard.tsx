import React from 'react';
import { ISeries } from './types';
import { Link } from 'react-router-dom';

export default function CatCard(props: any) {
  const { singleCat, selected, toggle, dispatch, fetchParentCats, filters } = props;
  console.log(singleCat)
  const handleClick = () => {

    fetchParentCats(dispatch, singleCat.category_id, filters);
  };
  return (
    <div className="card-container">
      <section
        key={singleCat.category_id}
        className="series-box"
        onClick={handleClick}
      >
        {/* <Link to={`/demo/details/${singleSeries.series_id}`}> */}
        <div><h4>{singleCat.name}</h4></div>
        <br />
        <div><strong>Ancestors:</strong></div>
        <div>{singleCat.ancestor_names.length < 4 ? singleCat.ancestor_names.join(' > ') : singleCat.ancestor_names.length > 3 ? singleCat.ancestor_names[0] + ' > '
          + singleCat.ancestor_names[1] + ' ... ' + singleCat.ancestor_names[singleCat.ancestor_names.length - 1] : singleCat.dataset_name}</div>

        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          {/* <button type="button" onClick={toggle}>
            {selected.find(
              (select: ISeries) => select.series_id === singleSeries.series_id
            )
              ? 'Deselect'
              : 'Select'} */}
          {/* </button> */}
        </section>
      </section>
    </div>
  );
}
