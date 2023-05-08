import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button } from '@chakra-ui/react';

function BotSpecs({ bot, handleEnlist, handleGoBack }) {
  const handleClick = () => {
    handleEnlist(bot);
  };

  return (
    <Card maxW="sm" height="450px">
      <CardBody>
        <Image src={bot.avatar_url} alt={bot.name} backgroundColor="#efeeef" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{bot.name}</Heading>
          <Text>{bot.catchphrase}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <p>❤️‍🩹{bot.health}</p>
        <p>⚡{bot.damage}</p>
        <p>🛡️ {bot.armor}</p>
      </CardFooter>
      <Button colorScheme="green" size="sm" mt="2" onClick={handleClick}>
        Enlist
      </Button>
      <Button colorScheme="blue" size="sm" mt="2" onClick={handleGoBack}>
        Go Back
      </Button>
    </Card>
  );
}

export default BotSpecs;