import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

export const PreviewPane = ({ files }) => {
  const sandpackFiles = {
    ...files,

    "/index.js": {
      code: `
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
      `,
    },

    "/public/index.html": {
      code: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generated Website</title>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
      `,
    },
  };

  return (
    <SandpackProvider template="react" files={sandpackFiles}>
      <SandpackLayout className="h-full">
        <SandpackPreview className="h-full" showOpenInCodeSandbox={false} />
      </SandpackLayout>
    </SandpackProvider>
  );
};
