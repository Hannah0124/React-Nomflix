import React from 'react';
import DetailPresenter from './DetailPresenter';

export default class extends React.Component {
  state = {
    // I don't care if it is a movieDetail or showDetail, I'm going to get results
    result: null,
    error: null,
    loading: true
  }

  render() {
    const { result, error, loading} = this.state;

    return <DetailPresenter result={result} error={error} loading={loading}/>;
  }
}