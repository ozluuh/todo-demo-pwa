import React from "react";
import Button from "./Button";

export default function TaskItem({ task, onSuccess, onFailure }) {
  return (
    <div className="block p-2 pb-4 rounded-lg shadow-sm shadow-indigo-100 bg-white">
      <button className="relative">
        <img
          alt={`Task: ${task?.title}`}
          src={task?.image ?? "https://images.unsplash.com/photo-1554995207-c18c203602cb"}
          className="object-cover w-full h-56 rounded-t-md"
        />
        <span className="absolute bottom-0 w-full left-0 text-white bg-gray-600">LightBulb: Change image pressing on them</span>
      </button>

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Created at</dt>

            <dd className="text-sm text-gray-500">{task?.createdAt}</dd>
          </div>

          <div>
            <dt className="sr-only">Task Title</dt>

            <dd className="font-medium">{task?.title}</dd>
          </div>
        </dl>

        <dl className="flex items-center mt-6 space-x-2">
          <Button
            className="flex-grow"
            color="success"
            text="Complete"
            icon="&#10003;"
            onClick={onSuccess}
            />
          <Button
            className="flex-grow"
            color="danger"
            text="Exclude"
            icon="&#10005;"
            onClick={onFailure}
          />
        </dl>
      </div>
    </div>
  );
}
