import "./App.css";

import Focus from "./components/Focus/Focus";
import Settings from "./components/Settings/Settings";
import Time from "./components/Time";
import Background from "./components/UI/Background";
import Alarm from "./components/Alarm/Alarm";
import Todo from "./components/Todo/Todo";
import Notes from "./components/Notes/Notes";
import Links from "./components/Links/Links";
import Groups from "./components/Groups/Groups";
import Apps from "./components/Apps/Apps";

function App() {
  return (
    <div className="app">
      <Background />
      <Apps />
      <Groups />
      <section className="links">
        <Links />
      </section>
      <main className="main">
        <Focus />
        <Time />
      </main>
      <Settings />
      <Alarm />
      <Notes />
      <Todo />
    </div>
  );
}

export default App;
