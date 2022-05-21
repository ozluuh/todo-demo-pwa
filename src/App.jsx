import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { v4 as uuid } from "uuid";
import { clear, index, item, store } from "./api/database";
import TaskItem from "./components/TaskItem";
import { LAST_UPDATE_KEY, TASKS_KEY } from "./utils/keys";
import { version, versionReleaseDateTime } from "./utils/metadata";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [hasTasks, setHasTasks] = useState(false);

  useEffect(() => {
    const dbTasks = index(TASKS_KEY);

    setTasks(dbTasks);

    setHasTasks(dbTasks.length > 0);

    const hasLastUpdateDate = item(LAST_UPDATE_KEY);

    if (hasLastUpdateDate === null) {
      const currentUTCTimestamp = new Date(versionReleaseDateTime).getTime();
      store({ key: LAST_UPDATE_KEY, data: currentUTCTimestamp });
      return;
    }

    const clientLastUpdateTimestamp = parseInt(hasLastUpdateDate);

    const appLastUpdateTimestamp = new Date(versionReleaseDateTime).getTime();

    if (appLastUpdateTimestamp > clientLastUpdateTimestamp) {
      store({ key: LAST_UPDATE_KEY, data: appLastUpdateTimestamp });
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    setHasTasks(tasks.length > 0);
  }, [tasks]);

  const addTask = () => {
    const inputValue = value.trim();

    if (!inputValue.length > 0) return;

    setTasks((prev) => {
      const response = [
        ...prev,
        {
          _id: uuid(),
          title: inputValue,
          active: true,
          createdAt: new Date().toLocaleDateString(),
          image: "",
        },
      ];

      setValue("");
      store({ key: TASKS_KEY, data: response });

      return response;
    });

    if (process.env.NODE_ENV === "development") console.log(tasks);
  };

  const completeTask = (taskId) => {
    const task = tasks.find((p) => p._id === taskId);
    task.active = false;

    const currentTasks = tasks.filter((p) => p._id !== taskId);
    const response = [...currentTasks, task];

    setTasks(response);
    store({ key: TASKS_KEY, data: response });

    if (process.env.NODE_ENV === "development") console.log(tasks);
  };

  const excludeTask = (taskId) => {
    const currentTasks = tasks.filter((p) => p._id !== taskId);
    setTasks(currentTasks);

    store({ key: TASKS_KEY, data: currentTasks });

    if (process.env.NODE_ENV === "development") console.log(tasks);
  };

  const clearTasks = () => {
    setTasks([]);
    clear(TASKS_KEY);
  };

  const WhenEmptyTasks = () => {
    return (
      <div className="text-center">
        <img
          src="https://www.hyperui.dev/photos/confused-travolta.gif"
          alt="John Travolta confused"
          className="object-cover w-full h-64 rounded-lg"
        />

        <p className="mt-6 text-gray-500">
          We can't find any task, try adding new one.
        </p>
      </div>
    );
  };

  return (
    <div className="App h-full flex flex-col">
      {/* Header */}
      <header className="p-4 bg-slate-900 text-slate-200 mb-6">
        <div className="flex justify-center flex-col items-center">
          <h1>
            ToDo <BrowserView renderWithFragment>Web</BrowserView>App
          </h1>
          <p className="hidden md:block">Your personal ToDo</p>
        </div>
      </header>

      <div className="content flex flex-col justify-between flex-1">
        <main className="px-4">
          {/* InputBox */}
          <div className="relative mb-8">
            <label className="sr-only">Task Title</label>

            <input
              className="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
              type="text"
              placeholder="Type task..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="absolute top-1/2 right-4 -translate-y-1/2 inline-flex">
              <button
                className="p-2 text-white bg-slate-900 rounded-l"
                type="button"
                onClick={addTask}
              >
                <span className="hidden md:inline-block">Add</span>
                <i className="w-2 h-2 p-2" style={{ fontStyle: "normal" }}>
                  &#43;
                </i>
              </button>

              <button
                className="p-2 text-white bg-rose-600 rounded-r"
                type="button"
                onClick={clearTasks}
              >
                <span className="hidden md:inline-block">Clear</span>
                <i className="w-2 h-2 p-2" style={{ fontStyle: "normal" }}>
                  &#215;
                </i>
              </button>
            </div>
          </div>

          {/* Tasks */}
          <section className="tasks flex flex-wrap gap-4 justify-center">
            {!hasTasks && <WhenEmptyTasks />}

            {hasTasks &&
              tasks
                .filter((p) => p.active === true)
                .map((task) => (
                  // Task card
                  <TaskItem
                    key={task._id}
                    task={task}
                    onSuccess={() => completeTask(task._id)}
                    onFailure={() => excludeTask(task._id)}
                  />
                ))}
          </section>
        </main>
        {/* Footer */}
        <footer className="p-4 flex flex-col items-center justify-center">
          <p>&copy; 2022 - Demo PWA</p>
          <p>
            Made specially to your&nbsp;
            <BrowserView renderWithFragment>&#x1F4BB; Desktop</BrowserView>
            <MobileView renderWithFragment>&#x1F4F1; Mobile</MobileView>
            &nbsp;Device
          </p>
          <p>Build Version: v{version}</p>
        </footer>
      </div>
    </div>
  );
}
