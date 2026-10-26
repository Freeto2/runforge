import React, {useMemo, useEffect, useState} from 'react';
import AgentItem from "./agent-item.jsx";
import {fetchAgentRuns} from '../../data/agents.js';
import Button from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx";
import AgentDetails from "./agent-details.jsx";
import {getQueryParam} from "../../utils/url.js";
import FilterBar from "./filter-bar.jsx";



const AgentsList = ({ title}) => {

    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAgent, setOpenAgent] = useState(null);
    const [search, setSearch] = useState(() => getQueryParam('search', ''));
    const [filter, setFilter] = useState(() => getQueryParam('status', 'all'));
    const [sort, setSort] = useState(() => getQueryParam('sort', 'durations'));
    const agentsStatuses = [ "all", "queued", "running", "failed",  "succeeded" ];
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams();

        // Записываем параметры в URL, только если они не дефолтные (чтобы URL оставался чистым)
        if (search) params.set('search', search);
        if (filter !== 'all') params.set('status', filter);
        if (sort !== 'durations') params.set('sort', sort);

        // Формируем новую строку запроса (например: ?search=auth&status=running)
        const newRelativePathQuery = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');

        // Обновляем URL в браузере БЕЗ перезагрузки страницы
        window.history.replaceState(null, '', newRelativePathQuery);
    }, [search, filter, sort]); // Эффект срабатывает при изменении любого из параметров


    const loadData = () => {
        setLoading(true);
        setError(null);
        fetchAgentRuns()
            .then(response => {
                setAgents(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError('Failed to load data')
                setLoading(false)
            })
    }

    useEffect(() => {
        loadData();
    }, []);

    function changeFilter(filter) {
        setFilter(filter);
    }

    function resetFilters() {
        setFilter("all");
        setSearch('');
        setSort('durations')
    }

    const filteredAgents = useMemo(() => {
        const result = agents.filter(agent => {

            const matchedSearch =
                agent.name.toLowerCase().includes(search.toLowerCase()) ||
                agent.repository.toLowerCase().includes(search.toLowerCase());

            const filtered = agent.status === filter || filter === "all";

            return filtered && matchedSearch;
        })

        return [...result].sort((a, b) => {
            if(sort === 'date') {
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            }
            if(sort === 'durations') {
                return (a.durationSeconds || 0) - (b.durationSeconds || 0);
            }
            return 0;
        });

    }, [filter, search, agents, sort]);


    function openModalAgentDetails(id) {
        setModal(true);
        setOpenAgent([...agents].find(agent => agent.id === id));
    }

    function removeAgent(id) {
        setAgents(agents.filter(agent => agent.id !== id));
        if(id === openAgent.id) {
            setModal(false);
        }
    }

    return (
        <div className='agents-wrapper'>
            <h1 className={'margin-bottom-30 text-28 font-600'}>{title}</h1>

            <FilterBar
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                agentsStatuses={agentsStatuses}
                changeFilter={changeFilter}

                filter={filter}
            />

            {loading ? (
                <div className={'card card-alert'}><p>Loading...</p></div>
                ) : error ? (
                    <div className={'card card-alert'}>
                        <p>Failed to load data</p>

                        <Button
                            classes={'btn-primary'}
                            onClick={() => loadData()}
                        >
                            Repeat
                        </Button>
                    </div>
                ) :

                filteredAgents.length
                ?
                    (
                        <div className='agents-list'>
                            {filteredAgents.map(agent => (
                                <AgentItem
                                    key={agent.id}
                                    getIdAgent={openModalAgentDetails}
                                    removeAgent={removeAgent}
                                    agent={agent}
                                />
                            ))}
                        </div>
                    )
                :
                    (
                        <div className={'card card-alert'}>
                            <p>Nothing found...</p>

                            <Button
                                classes={'btn-primary'}
                                onClick={() => resetFilters()}
                            >
                                Reset filters
                            </Button>
                        </div>
                    )
            }


            <Modal
                title={'Agent Details'}
                visible={modal}
                setVisible={setModal}
            >
                {openAgent && <AgentDetails agent={openAgent} />}
            </Modal>
        </div>
    );
};

export default AgentsList;