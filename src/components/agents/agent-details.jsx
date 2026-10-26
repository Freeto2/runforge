import React from 'react';
import Button from "../UI/Button.jsx";

const AgentDetails = ({agent}) => {
    const date = new Date(agent.createdAt).toLocaleDateString("ru-RU");


    return (
        <div className={'agent-detail'}>

            <div className="text-18 font-600 margin-bottom-12">
                {agent.name}
            </div>

            <div className='agent-details margin-bottom-30'>
                <div className='agent-details__item'>
                    <div className="text-14 color-dark font-600 margin-bottom-12">Repository</div>
                    <p>{agent.repository}</p>
                </div>
                <div className='agent-details__item'>
                    <div className="text-14 color-dark font-600 margin-bottom-12">Time</div>
                    <p>{agent.time}</p>
                </div>
                <div className='agent-details__item'>
                    <div className="text-14 color-dark font-600 margin-bottom-12">Date</div>
                    <p>{date}</p>
                </div>
                <div className='agent-details__item'>
                    <div className="text-14 color-dark font-600 margin-bottom-12">Status</div>
                    <div className={'margin-bottom-12'}>
                        {agent.status}
                    </div>
                </div>
            </div>

            <div className="text-18 font-600 margin-bottom-12">
                Terminal
            </div>

            <div className="terminal-logs">
                <p><strong>runforge@ws_a37c</strong> ~/repo $ pnpm lint</p>
                <p className={'red'}>✗ Failed · 3 lint errors remain</p>
                <p>agent Claude Code exited with status 1</p>
                <p>$ runforge logs --tail 20</p>
                <p>hint: retry the agent once the cause is fixed</p>
            </div>
        </div>
    );
};

export default AgentDetails;