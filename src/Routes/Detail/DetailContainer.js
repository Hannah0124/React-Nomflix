import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from 'api';

export default class extends React.Component {
	constructor(props) {
		super(props);
		const { location: { pathname } } = props;
		this.state = {
			// I don't care if it is a movieDetail or showDetail, I'm going to get results
			result: null,
			error: null,
			loading: true,
			isMovie: pathname.includes('/movie/')
		};
	}

	async componentDidMount() {
		const { match: { params: { id } }, history: { push } } = this.props;

		const { isMovie } = this.state;

		// parseInt Id to detect if it is number or NaN.
		const parsedId = parseInt(id);

		if (isNaN(parsedId)) {
			return push('/');
		}

		let result = null;
    
		try {
			if(isMovie) {
				// If it is a movie, we are going to look for a movieDetail.
				const request = await moviesApi.movieDetail(parsedId);
				result = request.data;
			} else {
				const request = await tvApi.showDetail(parsedId);
				result = request.data;
			}

			console.log(result);

		} catch {
			this.setState({error: "Can't find any results."})

		} finally {
			this.setState({loading: false, result})
		}
	}

	render() {
		const { result, error, loading } = this.state;
		console.log(this.state);

		return <DetailPresenter result={result} error={error} loading={loading} />;
	}
}
