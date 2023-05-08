import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button } from '@chakra-ui/react';
import { useState } from 'react';
import BotSpecs from './BotSpecs';

function BotList({ bot, handleEnlist, isInArmy }) {
  const [showSpecs, setShowSpecs] = useState(false);

  const handleClick = () => {
    setShowSpecs(true); // Function to set showSpecs state to true to show bot details
    };
    
    const handleGoBack = () => {
    setShowSpecs(false); // Function to set showSpecs state to false to hide bot details
    };
    
    const handleEnlistBot = (bot) => {
    handleEnlist(bot); // Function to add a bot to the user's bot army
    setShowSpecs(false); // Function to set showSpecs state to false to hide bot details
    };

  const handleRelease = () => {
    const shouldDelete = window.confirm(`Are you sure you want to release ${bot.name}?`);
    if (shouldDelete) {
      // Remove the bot from the backend
      fetch(`http://localhost:3001/bots/${bot.id}`, {
        method: 'DELETE'
      }).then(() => {
        if (isInArmy) {
          // Remove the bot from the frontend
          handleEnlist(bot.id);
        }
      });
    }
  };

  if (showSpecs) {     // Render bot details component if showSpecs state is true

    return (
      <BotSpecs bot={bot} handleEnlist={handleEnlistBot} handleGoBack={handleGoBack} />
    );
  }

  return (
    <Card maxW="sm" height="520px">
      <CardBody onClick={handleClick}>
        <Image src={bot.avatar_url} alt={bot.name} backgroundColor="#efeeef" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{bot.name}</Heading>
          <Text>{bot.catchphrase}</Text>
          <Text>{bot.bot_class}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <p>❤️‍🩹{bot.health}</p>
        <p>⚡{bot.damage}</p>
        <p>🛡️ {bot.armor}</p>

        {isInArmy && (
          <Button colorScheme="red" onClick={handleRelease} ml="3">X</Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default BotList;
