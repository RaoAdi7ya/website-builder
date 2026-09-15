import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { homeTags } from "../assets/assets";
import { useProject } from "../context/ProjectContext";

export const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const { createProject } = useProject();

 const handleGenerate = async () => {
   if (!prompt.trim()) return;

   try {
     const project = await createProject(prompt);

     console.log("Created project:", project);

     navigate(`/builder/${project._id}`);
   } catch (error) {
     console.error("Failed to create project:", error);
   }
 };

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Build your website with AI
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-gray-600">
          Describe the website you want and let AI build it for you.
        </p>

        <div className="mt-10 w-full max-w-3xl">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the website you want to build..."
            rows={5}
            className="w-full resize-none rounded-xl border border-gray-300 p-4 text-gray-900 outline-none focus:border-gray-500"
          />

          <button
            onClick={handleGenerate}
            className="mt-4 rounded-xl bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
          >
            Generate Website
          </button>
        </div>

        <div className="mt-10">
          <p className="mb-4 text-sm font-medium text-gray-500">
            Try one of these
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {homeTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setPrompt(tag)}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
