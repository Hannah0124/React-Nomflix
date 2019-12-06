import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Collection from '../../Components/Collection';
import Iframe from 'react-iframe' // test (npm i react-iframe)
import {tabView} from '../../Components/Tab';

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
	width: 80%;
`;


// test (Hannah)
const LogoContainer = styled.span`
	display: inline;
`;

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

const TabContainer = styled.div``;

const VideoContainer = styled.div`
	display: flex;
	width: 100%;
	margin-top: 10px;
	overflow: auto;
  overflow-y: hidden;
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

const CContainer = styled.div`
	display: flex;
	height: 300px;
	width: 100%;
	left: auto;
	right: auto;
	margin-top: 10px;
	padding-left: 30px;
	overflow: auto;
  overflow-wrap: hidden;
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


const CompanyContainer = styled.div` 
	font-size: 15px;
	padding: 0px;
`;

const CompanyLogo = styled.img`
  width: 180px;
	height: auto;
	display: block;
	margin: 0 auto 10px auto;
	padding: 5px;
	background-color: lightgray; 
	opacity: 0.8;
`;

const CompanyName = styled.div`
  margin: 0 auto 15px auto;
	text-align: center;
  font-weight: normal;
	font-weight: bold;
`;

const CreatorContainer = styled.div`
  margin-left: 100px;
	font-size: 15px;
`;

const CreatorImg = styled.img`
  width: 180px;
	height: auto;
`;

const CreatorName = styled.li`
  font-weight: normal;
	list-style: none;
	text-align: center;
	margin: 0px auto 15px auto;
	/* display: inline;
	::after {
		content: ", ";
	}

	:last-child::after {
    content: "";
	} */
`;

const LocationContainer = styled.div`
	font-size: 25px;
	margin-left: 10px;
`;

const SeasonContainer = styled.div`
display: flex;
height: 300px;
overflow: auto;
overflow-wrap: hidden;
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

const Season = styled.div``;

const SeasonImg = styled.img`
	width: 180px;
	height: auto;
	max-height: 250px;
	padding: 0;
	margin-right: 5px;
	border-radius: 5px;
`;

const SeasonContents = styled.div`
  width: 180px;  
	margin-right: 5px;
`;

const CollectionContainer = styled.span`
 float: right;
 top: 0;
 right: 0;
 /* display: grid; */
`;

const DetailPresenter = ({ result, error, loading, isMovie }) =>
	loading ? (
		<>
		  <Helmet><title>Loading | Nomflix</title></Helmet>
			<Loader />
		</>
	) : (
	  error ? <Message text={error} color="#e74c3c"/> : 
		<Container>
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
					{/* test */}
				  <CollectionContainer>
						{isMovie && result.belongs_to_collection && <Collection collection_id={result.belongs_to_collection.id} key={result.belongs_to_collection.id} {...result}/>}
					</CollectionContainer>

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
						{result.imdb_id &&
						<LogoContainer>
							<Item>{ <Imdb key={result.imdb_id} href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank">IMDb</Imdb>}</Item>
					  	<Divider>∙</Divider>
						</LogoContainer>
						}
						
						{/* homepage */}
						{result.homepage &&
						<LogoContainer>
							<Item><Link href={result.homepage} target="_blank">Home</Link></Item>
							<Divider>∙</Divider>
				  	</LogoContainer> 
						}
						
						{/* star rating */}
						{/* test */}
						<Item>{result.vote_average ? 
						`⭐️⭐️⭐️⭐️⭐️ ${result.vote_average}/10` : 	`⭐️⭐️⭐️⭐️⭐️ ${result.last_episode_to_air.vote_average}/10`}
						</Item>
					</ItemContainer>

					{/* overview */}
					<Overview>{result.overview}</Overview>	

					{/* test */}
					{/* trailers, produced by, filiming location, season */}
					<TabContainer>
						{tabView(['Trailers', (isMovie ? 'Produced By' : 'Produced & Created By'), (isMovie ? 'Filiming Location' : "Seasons")], 
						[
							<VideoContainer>
								{result.videos.results.length > 0 ? result.videos.results.map(video => video.key &&  <Iframe key={video.id} title="youtube vidoes" width="320" height="245" src={`https://www.youtube.com/embed/${video.key}`}></Iframe>) 
								:
								<div>There is no trailer</div>
								}
							</VideoContainer>,

							isMovie ?
							// company 
							<CContainer>
								<CompanyContainer>
									{result.production_companies && result.production_companies.map(company => company.logo_path ? <div key={company.id}><CompanyLogo src={`https://image.tmdb.org/t/p/w300${company.logo_path}`} alt={company.name}></CompanyLogo><CompanyName>{company.name}</CompanyName></div> : 
									<div key={company.id}><CompanyLogo src={require("../../assets/image-not-available.png")} alt="Image Not avaiable"></CompanyLogo><CompanyName>{company.name}</CompanyName></div>)}
									</CompanyContainer>
							</CContainer> :

							// company & creator
							<CContainer>
								<CompanyContainer>
									{result.production_companies && result.production_companies.map(company => company.logo_path ? <div><CompanyLogo key={company.id} src={`https://image.tmdb.org/t/p/w300${company.logo_path}`} alt={company.name}></CompanyLogo><CompanyName key={`${company.id}${Date.now()}`}>{company.name}</CompanyName></div> : 
									<div><CompanyLogo key={company.id} src={require("../../assets/image-not-available.png")} alt="Image Not avaiable"></CompanyLogo><CompanyName key={`${company.id}${Date.now()}`}>{company.name}</CompanyName></div>)}	
								</CompanyContainer>	
								<CreatorContainer>
									{result.created_by && result.created_by.map(creator => creator.profile_path ? 
										<div>
											<CreatorImg key={creator.id} src={`https://image.tmdb.org/t/p/w300${creator.profile_path}`} alt={creator.name}></CreatorImg><CreatorName key={`${creator.id}${Date.now()}`}>{creator.name}</CreatorName></div> :
										<div>
											<CreatorImg key={creator.id} src={require("../../assets/image-not-available.png")} alt="Image Not avaiable"></CreatorImg>
											<CreatorName key={`${creator.id}${Date.now()}`}>{creator.name}</CreatorName>
										</div> 				
									)}
								</CreatorContainer>
							</CContainer>, 
							
							isMovie ? 
							// location
							<LocationContainer key={Date.now()}>
								{result.production_countries && result.production_countries.map(country => country.name)}
							</LocationContainer> : 
							// seasons
							<SeasonContainer>
								{result.seasons && result.seasons.map(season => season.air_date && (
									<Season>
										{season.name} ({season.air_date && season.air_date.substring(0,4)}) 
										<br/><br/>
										<SeasonImg key={season.id} src={season.poster_path ? (
											`https://image.tmdb.org/t/p/w300${season.poster_path}` 
									  	) : (
												require("../../assets/noPosterSmall.png")
									  	)}>
										</SeasonImg>  
										<SeasonContents><br/>{season.overview && season.overview}</SeasonContents>	
									</Season>) 
								)}
							</SeasonContainer>
						])
						}
					</TabContainer>

				</Data>
			</Content>
	  </Container>
	);

DetailPresenter.propTypes = {
	result: PropTypes.object,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	isMovie: PropTypes.bool
};

export default DetailPresenter;
