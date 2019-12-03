import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter, Link } from "react-router-dom";
import Loader from '../../Components/Loader';

const Container = styled.div`
  margin: 20px 0 0 40px;
  z-index: 1;
`;

const Backdrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url(${(props) => props.bgImage});
	background-size: cover;
	filter: blur(3px);
	opacity: 0.5;
	z-index: -1;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
`;

const Overview = styled.div`
  width: 80%;
  line-height: 18px;
  margin: 10px;
  font-size: 15px;
  color: lightgray;
`;

const Contents = styled.div`
  /* display: flex; */
  margin: 10px;
  display: flex;
`;

const Cover = styled.div`
	width: 30%;
	background-image: url(${(props) => props.bgImage});
	background-position: center center;
	background-size: cover;
	height: 100%;
	border-radius: 5px;
`;

const CollectionGroup = styled.div`
  z-index: 2;
  width: 60%;
  height: 500px;
  overflow: auto;
  overflow-x: hidden;
	/* width */
	::-webkit-scrollbar {
 	 width: 20px;
	}
	/* Track */
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey; 
		border-radius: 10px;
	}
	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #ffffff; 
		border-radius: 10px;
	}
	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #b30000; 
	}
`;

const CollectionImg = styled.img`
  border-radius: 15px;
  width: 25%;
  height: 25%;
  margin-top: 10px;
`;

const PartTitle = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PartBox = styled.div`
  margin: 10px 10px 20px 100px;
`
const PartGroup = styled.div`
  display: flex;
`;

const Rating = styled.span`
	top: 5px;
	right: 5px;
	position: absolute;
	opacity: 0;
	transition: opacity 0.1s linear;
`;

const PartImg = styled.img`
  border-radius: 15px;
  max-width: 150px;
  height: auto;
`;

const ImageContainer = styled.div`
	position: relative;
	&:hover {	
		${PartImg} {
			opacity: 0.3;
		}
		${Rating} {
			opacity: 1;
		}
	}
`;

const PartOverview = styled.p`
  width: 350px;
  margin: 30px 0 0 20px;
  line-height: 18px;
  color: lightgray;
`;


const CollectionPresenter = withRouter(({ loading, collection }) => 
  loading ? (
    <Loader />
  ) : (
    <>
      <Backdrop bgImage={`https://image.tmdb.org/t/p/original/${collection.backdrop_path}`} />
      <Container>
        <Cover
            bgImage={
              collection.poster_path ? (
                `https://image.tmdb.org/t/p/original${collection.poster_path}`
              ) : (
                require('../../assets/noPosterSmall.png')
              )
            }
          />
        <Title>{collection.name}</Title>
        <Overview>{collection.overview}</Overview>
        <Contents>
          <CollectionImg src={collection.poster_path ? `https://image.tmdb.org/t/p/w300/${collection.poster_path}` : require('../../assets/noPosterSmall.png')}></CollectionImg>
          
          <CollectionGroup>
            {collection.parts.title}
            {collection.parts && collection.parts.map(part => 
            <PartBox>
              <PartTitle>{part.title} ({part.release_date.substring(0, 4)})</PartTitle>
              <PartGroup>
                <Link to={`/movie/${part.id}`}>
                  <ImageContainer>
                    <PartImg src={part.poster_path ? `https://image.tmdb.org/t/p/w300${part.poster_path}` : require('../../assets/noPosterSmall.png')}/>
                    <Rating>{`⭐️ ${part.vote_average}`}/10</Rating>
                  </ImageContainer>
                </Link>
                <PartOverview>{part.overview}</PartOverview>
                <div>{part.video}</div>
              </PartGroup>
            </PartBox>
          )}
          </CollectionGroup>
        </Contents>
      </Container>
    </>
  )
); 

CollectionPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
	collection: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string.isRequired,
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        video: PropTypes.bool,
        vote_average: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired
      })
    )
  })
};

export default CollectionPresenter;