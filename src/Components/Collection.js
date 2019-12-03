import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

const Sbutton = styled.button`
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  background-color: peru;
  color: white;
  border: none;
  padding: 8px;
  &:hover {
    background-color: white;
    opacity: 0.5;
    color: black;
  }
`;

const ChildrenContainer = styled.div``;

const Collection = ({ collection_id, children }) => (
	<Link to={`/collection/${collection_id}`}>
		<Container>
      <Sbutton>Our Collection...</Sbutton>
      <ChildrenContainer>{children}</ChildrenContainer>
		</Container>
	</Link>
);

Collection.propTypes = {
  collection_id: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.node), PropTypes.node ])
};

export default Collection;
