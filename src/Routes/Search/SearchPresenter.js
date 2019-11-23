import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``; 

const SearchPresenter = ({ moveResults, tvResults, searchTerm, handleSubmit, error, loading }) => null;

SearchPresenter.propTypes = {
	moveResults: PropTypes.array,
	tvResults: PropTypes.array,
	searchTerm: PropTypes.string,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired
};

export default SearchPresenter;
