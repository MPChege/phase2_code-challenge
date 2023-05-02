import React from 'react';

function YourBotArmy(props) {
  const { selectedBots, removeFromArmy, dischargeBot } = props;

  return (
    <>
      <h2>Your Bot Army</h2>
      <div className="bots-container">
        {selectedBots.map(bot => (
          <div key={bot.id} className="bot-card" onClick={() => {
            // Replace YourBotArmy with BotSpecs
          }}>
            <img src={bot.avatar_url} alt="Bot Avatar" />
            <h3>{bot.name}</h3>
            <p>{bot.bot_class}</p>
            <button onClick={(e) => {
              e.stopPropagation();
              removeFromArmy(bot.id);
            }}>Release</button>
            <button className="delete-btn" onClick={(e) => {
              e.stopPropagation();
              dischargeBot(bot.id);
            }}>X</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default YourBotArmy;
