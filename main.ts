// This is the main file for the VS Code extension.
// It defines the extension's activation event, command, and configuration.

import * as vscode from "vscode";

// The activation event is called when the extension is activated.
// In this case, we will ask the user for the paths to the two files that need to be analyzed.
const onDidChangeTextDocument = async (event) => {
  if (event.document.fileName.endsWith(".txt")) {
    const paths = await vscode.window.showInputBox({
      prompt: "Enter the paths to the two files that need to be analyzed:",
    });
    if (paths) {
      // Call the server that has the microservice running and transfer the text read from the two files.
      const response = await callServer(paths);

      // Save the output locally and also display it in the terminal.
      vscode.workspace.openTextDocument(response).then((document) => {
        document.save();
        vscode.terminal.show(document);
      });
    }
  }
};

// The command is called when the user presses the `Analyze Code` command.
// In this case, we will call the server that has the microservice running and transfer the text read from the two files.
function analyzeCode() {
  const paths = ["path/to/file1.txt", "path/to/file2.txt"];
  const response = callServer(paths);

  // Save the output locally and also display it in the terminal.
  vscode.workspace.openTextDocument(response).then((document) => {
    document.save();
    vscode.terminal.show(document);
  });
}

// The configuration is used to store the paths to the two files that need to be analyzed.
function activate(context) {
  // Get the configuration from the extension's settings.
  const configuration = vscode.workspace.getConfiguration("myExtension");

  // Set the paths to the two files that need to be analyzed.
  configuration.set("paths", ["path/to/file1.txt", "path/to/file2.txt"]);
}

// This function calls the server that has the microservice running and transfers the text read from the two files.
async function callServer(paths) {
  const url = "http://localhost:3000/analyze";
  const data = {
    files: paths,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    return await response.text();
  } else {
    return null;
  }
}

export {
  activate,
  analyzeCode,
};
