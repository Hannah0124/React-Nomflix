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
	:hover {
			color: peru;
		}
`

export const tabView = (tabTitles, contents) => (
	<Container>
		<Tabs>
			<TabList>
        {tabTitles.map((title, idx) => <Tab key={`${idx}${Date.now()}`}><Title>{title}</Title></Tab>)}
      </TabList>

			{contents.map((content, idx) => (
				<TabPanel key={`${idx}${Date.now()}`}>
					<h2>{content}</h2>
				</TabPanel>
			))}
		</Tabs>
	</Container>
);
