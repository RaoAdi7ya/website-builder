import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { PreviewPane } from "../components/PreviewPane";

export const BuilderPage = () => {
  const { id } = useParams();

const { project, fetchProject, projectLoading, updateFile, saveProjectFiles } =
  useProject();
  const [selectedFile, setSelectedFile] = useState("/App.js");

  useEffect(() => {
    fetchProject(id);
  }, [id]);
  const handleSave = async () => {
    try {
      await saveProjectFiles();
      console.log("Project saved successfully");
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  if (projectLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-73px)] bg-gray-100">
      {/* Builder Header */}
      <header className="flex h-14 items-center justify-between border-b bg-white px-5">
        <div>
          <h1 className="font-semibold text-gray-900">{project.name}</h1>

          <p className="text-xs text-gray-500">Version {project.version}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            Save
          </button>

          <button className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
            Preview
          </button>

          <button className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800">
            Publish
          </button>
        </div>
      </header>

      {/* Builder Body */}
      <div className="grid h-[calc(100%-56px)] grid-cols-[220px_1fr_320px]">
        {/* File Explorer */}
        <aside className="border-r bg-white p-4">
          <h2 className="mb-4 text-xs font-semibold uppercase text-gray-500">
            Files
          </h2>

          <div className="space-y-1">
            {Object.keys(project.files).map((file) => (
              <button
                key={file}
                onClick={() => setSelectedFile(file)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                  selectedFile === file
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {file}
              </button>
            ))}
          </div>
        </aside>

        {/* Preview */}
        <main className="grid min-w-0 grid-rows-2 bg-gray-100">
          {/* Preview */}
          <div className="min-h-0">
            <PreviewPane files={project.files} />
          </div>

          {/* Code */}
          <div className="min-h-0 border-t bg-zinc-950">
            <div className="border-b border-zinc-800 px-4 py-2">
              <span className="text-xs text-zinc-400">{selectedFile}</span>
            </div>

            <textarea
              value={project.files[selectedFile]}
              onChange={(e) => updateFile(selectedFile, e.target.value)}
              className="h-full w-full resize-none bg-zinc-950 p-4 font-mono text-sm text-zinc-300 outline-none"
            />
          </div>
        </main>

        {/* Chat */}
        <aside className="flex flex-col border-l bg-white">
          <div className="border-b p-4">
            <h2 className="font-semibold">AI Assistant</h2>

            <p className="text-xs text-gray-500">
              Ask AI to modify your website
            </p>
          </div>

          <div className="flex-1 p-4">
            <p className="text-sm text-gray-500">
              Your conversation will appear here.
            </p>
          </div>

          <div className="border-t p-3">
            <textarea
              placeholder="Ask AI to change something..."
              rows={3}
              className="w-full resize-none rounded-lg border p-3 text-sm outline-none focus:border-gray-500"
            />

            <button className="mt-2 w-full rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-800">
              Send
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
