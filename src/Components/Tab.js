import React from 'react'; // 'React' must import from the react
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 15px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
`

export const tabView = (tabTitles, contents) => (
	<Container>
		<Tabs>
			<TabList>
        {tabTitles.map((title) => <Tab><Title>{title}</Title></Tab>)}
      </TabList>

			{contents.map((content) => (
				<TabPanel>
					<h2>{content}</h2>
				</TabPanel>
			))}
		</Tabs>
	</Container>
);
