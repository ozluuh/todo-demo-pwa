import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "./Button";

export default function TaskItem({
  task,
  onSuccess,
  onFailure,
  onChangeImage,
}) {
  const webcamRef = useRef(null);
  const [isCamActive, setCamActive] = useState(false);

  const openCam = () => {
    if (isCamActive) return;

    setCamActive(true);
  };

  const takePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    task.image = imageSrc;
    onChangeImage(task);
    setCamActive(false);
  };

  return (
    <div className="block p-2 pb-4 rounded-lg shadow-sm shadow-indigo-100 bg-white">
      <div className={`relative w-full ${!isCamActive && "cursor-pointer"}`} onClick={openCam}>
        {isCamActive ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="object-cover w-full h-56 rounded-t-md"
            />
            <div className="absolute bottom-0 w-full left-0 mb-4">
              <button
                className="mx-auto block p-2 text-rose-600 border border-rose-600 rounded-full hover:text-white active:bg-rose-500 focus:outline-none focus:ring"
                onClick={takePhoto}
              >
                <span className="sr-only"> Take photo </span>

                <span className="block w-5 h-5 p-5 bg-rose-600 rounded-full"></span>
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              alt={`Task: ${task?.title}`}
              src={
                task?.image ??
                "https://images.unsplash.com/photo-1554995207-c18c203602cb"
              }
              className="object-cover w-full h-56 rounded-t-md"
            />
            <span className="absolute bottom-0 w-full left-0 text-white bg-gray-600">
              &#x1F4A1; Change the picture by clicking on it
            </span>
          </>
        )}
      </div>

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
