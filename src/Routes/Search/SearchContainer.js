import React from 'react';
import SearchPresenter from './SearchPresenter';

export default class extends React.Component {
	state = {
		movieResult: null,
    tvResult: null,
    searchTerm: "",
		error: null,
		loading: false // After searching, loading becomes true
	};

	render() {
		const { movieResult, tvResult, searchTerm, error, loading } = this.state;
		return <SearchPresenter movieResult={movieResult} tvResult={tvResult} searchTerm={searchTerm} error={error} loading={loading} />;
	}
}
