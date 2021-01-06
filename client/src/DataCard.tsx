import React from 'react';
import { ISeries } from './types';
import { Link } from 'react-router-dom';

export default function DataCard(props: any) {
  const { singleSeries, selected, toggle } = props;
  return (
    <div className="card-container">
      <section key={singleSeries.seriesID} className="series-box">
        <Link to={`/demo/details/${singleSeries.seriesID}`}>
          {singleSeries.name}
        </Link>

        <br />
        <div>{singleSeries.units}</div>
        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <button type="button" onClick={toggle}>
            {selected.find(
              (select: ISeries) => select.seriesID === singleSeries.seriesID
            )
              ? 'Deselect'
              : 'Select'}
          </button>
        </section>
      </section>
    </div>
  );
}
