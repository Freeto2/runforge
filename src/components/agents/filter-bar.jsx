import React from 'react';
import Button from "../UI/Button.jsx";
import Select from "../UI/Select.jsx";
import Input from "../UI/Input.jsx";

const FilterBar = ({search, setSearch, sort, setSort, agentsStatuses, changeFilter, filter}) => {
    return (
        <div className="agents-wrapper__header">

            <div className="agents-search">
                <form>
                    <label>
                        <Input
                            type="text"
                            placeholder={'Search by name or repository...'}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </label>
                </form>
            </div>

            <Select
                defaultValue={'Select sorted'}
                value={sort}
                onChange={sort => setSort(sort)}
                options={[
                    {value: 'durations', label: 'Durations'},
                    {value: 'date', label: 'Date'},
                ]}
            />


            <div className="agents-filters">
                {agentsStatuses.map((status, key) => (
                    <Button
                        key={key}
                        onClick={() => changeFilter(status)}
                        classes={filter === status ? 'active' : ''}
                    >{status}</Button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;