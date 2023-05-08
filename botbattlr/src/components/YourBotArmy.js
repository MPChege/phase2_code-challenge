import React from 'react';
import BotList from './BotList';
import { SimpleGrid, Heading, Center, Box } from '@chakra-ui/react';

function YourBotArmy({ army, handleRelease }) {
  return (
    <div>
      {army.length > 0 && (
        <Heading>
          <Center>Your Bot Army</Center>
        </Heading>
      )}

      <SimpleGrid spacing={10} minChildWidth="200px"  backgroundColor="#b3c931" >
        {army.map((bot) => (
          <Box key={bot.id} w="258px" padding="10px" textAlign="center">
            <BotList bot={bot} handleEnlist={handleRelease}  isInArmy={true}/>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default YourBotArmy;
