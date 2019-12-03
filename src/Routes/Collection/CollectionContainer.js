import React from 'react';
import CollectionPresenter from './CollectionPresenter';
import { moviesApi } from 'api';

export default class extends React.Component {
	  state = {
			collection: null,
			loading: true
    };

    setCollection = async () => {
      const {
        match: {
          params: { collection_id }
        }
      } = this.props;
    
      try {
        const { data: collection } = await moviesApi.getCollection(collection_id);
        this.setState({
          collection
        });
      } catch(e) {
        console.log("Can't find collection.: " + e);
      } finally {
        this.setState({
          loading: false
        })
      }
	};

	componentDidMount() {
    this.setCollection();
	}

	render() {
		return <CollectionPresenter {...this.state}/>;
	}
}
