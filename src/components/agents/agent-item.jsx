import React from 'react';
import Button from "../UI/Button.jsx";

const AgentItem = ({agent, getIdAgent, removeAgent}) => {

    const date = new Date(agent.createdAt).toLocaleDateString("ru-RU");

    return (
        <div className='card agent-item'>
            <div className={'agent-item__status ' + (agent.status.replace(/ /g, '_'))}>
                {agent.status}
            </div>
            <div className='agent-item__name'>
                {agent.name}
            </div>

            <div className='agent-item__info'>
                <span>{agent.repository}</span>
                <span>{agent.time}</span>
                <span>{date}</span>
            </div>

            <div className="btns-row">
                <Button onClick={() => getIdAgent(agent.id)}>
                    Open details
                </Button>
                <Button
                    classes="btn-dark"
                    onClick={() => removeAgent(agent.id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default AgentItem;