import AgentsList from "./components/agents/agents-list.jsx";
import Sidebar from "./components/sidebar.jsx";


function App() {

    return (
        <>
            <div className='app-wrapper'>
                <aside className="app-wrapper__sidebar">
                    <Sidebar />
                </aside>
                <main className='app-wrapper__content'>
                    <section className={'breadcrumbs-section'}>
                        <div className="container">
                            <div className="header-row">
                                <div className="logo hidden-desc">
                                    Runforge
                                </div>
                                <div className="breadcrumbs">
                                    project / agents
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <AgentsList title={'Agents'} />
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default App
