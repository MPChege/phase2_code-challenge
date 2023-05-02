import React from 'react';

function BotCollection(props) {
  const { bots, addToArmy } = props;

  return (
    <>
      <h2>Bots Collection</h2>
      <div className="bots-container">
        {bots.map(bot => (
          <div key={bot.id} className="bot-card" onClick={() => {
            // Replace BotCollection with BotSpecs
          }}>
            <img src={bot.avatar_url} alt="Bot Avatar" />
            <h3>{bot.name}</h3>
            <p>{bot.bot_class}</p>
            <button onClick={(e) => {
              e.stopPropagation();
              addToArmy(bot.id);
            }}>Enlist</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default BotCollection;
