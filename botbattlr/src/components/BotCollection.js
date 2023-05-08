import { useState, useEffect, useCallback } from 'react';
import { SimpleGrid, Center, Heading, Checkbox, CheckboxGroup } from '@chakra-ui/react';
import BotList from './BotList';
import YourBotArmy from './YourBotArmy';
import SortBar from './SortBar';

function BotCollection() {
// Defining states using hooks
const [bots, setBots] = useState([]);
const [selectedBots, setSelectedBots] = useState([]);
const [selectedFilters, setSelectedFilters] = useState([]);
const [enlistedClasses, setEnlistedClasses] = useState({});

// Fetching bot data from a local server using the useEffect hook
useEffect(() => {
fetch('http://localhost:3001/bots')
.then((response) => response.json())
.then((data) => {
setBots(data);
});
}, []);

// Handling the enlistment of a bot
const handleEnlist = useCallback((bot) => {
if (!selectedBots.find((selectedBot) => selectedBot.id === bot.id)) {
if (!enlistedClasses[bot.bot_class]) {
setSelectedBots((prevSelectedBots) => [...prevSelectedBots, bot]);
setEnlistedClasses((prevEnlistedClasses) => ({
...prevEnlistedClasses,
[bot.bot_class]: true,
}));
}
}
}, [selectedBots, enlistedClasses]);

// Handling the release of a bot
const handleRelease = useCallback((bot) => {
setSelectedBots((prevSelectedBots) => prevSelectedBots.filter((selectedBot) => selectedBot.id !== bot.id));
setEnlistedClasses((prevEnlistedClasses) => ({
...prevEnlistedClasses,
[bot.bot_class]: false,
}));
}, []);

// Handling the sorting of the bot array
const handleSort = useCallback((sortCategory, reverse) => {
// Create a copy of the bots array and sort it by the selected category
const sortedBots = [...bots].sort((a, b) => {
if (a[sortCategory] < b[sortCategory]) {
return reverse ? 1 : -1;
}
if (a[sortCategory] > b[sortCategory]) {
return reverse ? -1 : 1;
}
return 0;
});
setBots(sortedBots);
}, [bots]);

// Handling changes to the selected filter values
const handleFilterChange = useCallback((selected) => {
setSelectedFilters(selected);
}, []);

// Creating a new array of bots to be displayed based on the selected filters
const filteredBots = selectedFilters.length > 0
? bots.filter(bot => selectedFilters.includes(bot.bot_class))
: bots;

// Rendering the component

  return (
    <>
      <YourBotArmy army={selectedBots} handleRelease={handleRelease} />

      <Heading>
        <Center>Bot Collection</Center>
      </Heading>

      <SortBar handleSort={handleSort} />

      <CheckboxGroup colorScheme="green" onChange={handleFilterChange} value={selectedFilters}>
        <SimpleGrid columns={6} mt={6}>
          {['Assault',"Captain",'Defender' ,'Medic', 'Support','Witch'].map((botClass) => (
            <Checkbox key={botClass} value={botClass}>
              {botClass}
            </Checkbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>

      <SimpleGrid spacing={10} minChildWidth="200px" mt={6}>
        {filteredBots.map((bot) => (
          <BotList key={bot.id} bot={bot} handleEnlist={handleEnlist} />
        ))}
      </SimpleGrid>
    </>
  );
}

export default BotCollection;
