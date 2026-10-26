import React from 'react';

const Sidebar = () => {

    const links = [
        {title: 'Runs', class: 'active'},
        {title: 'Projects', class: ''},
        {title: 'Devboxes', class: ''},
        {title: 'Previews', class: ''},
        {title: 'Snapshots', class: ''},
    ]

    return (
        <div>
            <div className="logo">
                Runforge
            </div>
            <div className="sidebar-nav">
                {links.map((link, key) => (
                    <a href={'#'} key={key} className={'sidebar-nav__link ' + link.class}>{link.title}</a>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;