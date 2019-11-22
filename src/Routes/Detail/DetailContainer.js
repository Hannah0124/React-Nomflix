import React from 'react';
import DetailPresenter from './DetailPresenter';

export default class extends React.Component {
	state = {
		// I don't care if it is a movieDetail or showDetail, I'm going to get results
		result: null,
		error: null,
		loading: true
	};

	async componentDidMount() {

		// Get "id" to get movies or shows information.
		// Get "push" to use the method later.
		const { match: { params: { id } }, history: {push} } = this.props;

		// parseInt Id to detect if it is number or NaN.
		const parsedId = parseInt(id);

		if (isNaN(parsedId)) {
			return push("/");
		}
	}

	render() {
		const { result, error, loading } = this.state;

		return <DetailPresenter result={result} error={error} loading={loading} />;
	}
}
