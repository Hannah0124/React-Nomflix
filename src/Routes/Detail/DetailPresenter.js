import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';

const Container = styled.div`
	height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	padding: 50px;
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
	z-index: 0;
`;

// We need to have 2 columns
const Content = styled.div`
	display: flex;
	width: 100%;
	position: relative;
	z-index: 1;
	height: 100%;
`;

const Cover = styled.div`
	width: 30%;
	background-image: url(${(props) => props.bgImage});
	background-position: center center;
	background-size: cover;
	height: 100%;
	border-radius: 5px;
`;

const Data = styled.div`
	width: 70%;
	margin-left: 10px;
`;

const Title = styled.h3`
	font-size: 32px;
	margin-bottom: 10px;
`;

const ItemContainer = styled.div`
	margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
	margin: 0 10px;
`;

const Overview = styled.p`
	font-size: 12px;
	opacity: 0.7;
	line-height: 1.5;
	width: 50%;
`;

// test (Hannah)
const Imdb = styled.a`
	font: 2em/1 Impact, HelveticaNeue-CondensedBold, sans-serif; 
  color: #000;
  text-shadow: 0 0 .15em #fff;
  text-decoration: none;
  vertical-align: bottom;
  padding: .25em .25em;
  border-radius: .15em;
  background: radial-gradient(#ffffb8, #ce981d);
	height: 20px;
	width: 40px;
	font-size: 10px;
	text-align: center;
  &:hover {
		opacity: .5;
  }
	z-index: 1;
`;


// test (Hannah)
const Link = styled.a`
	font: 2em/1 Impact, HelveticaNeue-CondensedBold, sans-serif; 
  color: #000;
  text-shadow: 0 0 .15em #fff;
  text-decoration: none;
  vertical-align: bottom;
  padding: .25em .25em;
  border-radius: .15em;
  background: #ffffff;
	height: 20px;
	width: 40px;
	font-size: 10px;
	text-align: center;
  &:hover {
		opacity: .5;
  }
	z-index: 1;
`;


const DetailPresenter = ({ result, error, loading }) =>
	loading ? (
		<>
		  <Helmet><title>Loading | Nomflix</title></Helmet>
			<Loader />
		</>
	) : (
	  error ? <Message text={error} color="#e74c3c"/> : <Container>
		<Helmet><title>{result.original_title ? result.original_title : result.original_name}{" "}| Nomflix</title></Helmet>
		<Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
		<Content>
			<Cover
				bgImage={
					result.poster_path ? (
						`https://image.tmdb.org/t/p/original${result.poster_path}`
					) : (
						require('../../assets/noPosterSmall.png')
					)
				}
			/>
			<Data>
				<Title>{result.original_title ? result.original_title : result.original_name}</Title>
				<ItemContainer>
					{/* year */}
					<Item>{result.release_date ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4)}</Item>
					<Divider>∙</Divider>

					{/* runtime */}
					<Item>{result.runtime ? result.runtime : result.episode_run_time} min</Item>
					<Divider>∙</Divider>

					{/* genres */}
					{/* If it is a last item (index === results.genres.length - 1) */}
					<Item>{result.genres && result.genres.map((genre, index) => index === result.genres.length - 1 ? genre.name : `${genre.name} / ` )} </Item>
					<Divider>∙</Divider>

					{/* imdb */}
					{/* test (Hannah) */}
					<Item>{result.imdb_id ? <Imdb href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank">IMDb</Imdb> : <Link href={result.homepage} target="_blank">Home</Link>}</Item>
					<Divider>∙</Divider>

					{/* star rating */}
					{/* test (Hannah) */}
					<Item>{result.vote_average ? 
					`⭐️⭐️⭐️⭐️⭐️ ${result.vote_average}/10` : 	`⭐️⭐️⭐️⭐️⭐️ ${result.last_episode_to_air.vote_average}/10`}
					</Item>
				</ItemContainer>

				{/* overview */}
				<Overview>{result.overview}</Overview>
			</Data>
		</Content>
	</Container>
	);

DetailPresenter.propTypes = {
	result: PropTypes.object,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
