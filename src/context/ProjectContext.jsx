import React, { createContext, useContext, useState } from "react";
import api from "../Api/api";

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(false);

  const createProject = async (prompt) => {
    const { data } = await api.post("/api/projects", {
      prompt,
    });

    setProject(data);

    return data;
  };

  const fetchProject = async (id) => {
    try {
      setProjectLoading(true);

      const { data } = await api.get(`/api/projects/${id}`);

      setProject(data);

      return data;
    } finally {
      setProjectLoading(false);
    }
  };
  const updateFile = (filePath, content) => {
    setProject((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [filePath]: content,
      },
    }));
  };
  const saveProjectFiles = async () => {
    if (!project) return;

    const { data } = await api.put(`/api/projects/${project._id}/files`, {
      files: project.files,
    });

    setProject(data);

    return data;
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        projectLoading,
        createProject,
        fetchProject,
        updateFile,
        saveProjectFiles,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used inside ProjectProvider");
  }

  return context;
};
