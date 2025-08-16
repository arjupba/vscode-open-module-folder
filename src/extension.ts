import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  const openModuleCmd = vscode.commands.registerCommand(
    "extension.openModuleFolder",
    async (modulePath: string) => {
      if (fs.existsSync(modulePath)) {
        const uri = vscode.Uri.file(modulePath);
        await vscode.commands.executeCommand("revealInExplorer", uri);
      } else {
        vscode.window.showErrorMessage(`Module not found: ${modulePath}`);
      }
    }
  );

  context.subscriptions.push(openModuleCmd);

  const provider = vscode.languages.registerDocumentLinkProvider(
    { language: "json", scheme: "file" },
    {
      provideDocumentLinks(document) {
        const links: vscode.DocumentLink[] = [];

        console.log("file detected");

        if (!document.fileName.endsWith("package.json")) {
          return links;
        }

        console.log("file detected");

        try {
          const text = document.getText();
          const json = JSON.parse(text);

          const sections = [
            "dependencies",
            "devDependencies",
            "peerDependencies",
          ];

          sections.forEach((section) => {
            const deps = json[section];
            if (deps) {
              Object.keys(deps).forEach((depName) => {
                const regex = new RegExp(`"${depName}"\\s*:\\s*"[^"]+"`);
                const match = regex.exec(document.getText());
                if (match) {
                  const startPos = document.positionAt(match.index + 1);
                  const endPos = document.positionAt(
                    match.index + 1 + depName.length
                  );
                  const modulePath = path.join(
                    path.dirname(document.fileName),
                    "node_modules",
                    depName
                  );
                  const args = encodeURIComponent(JSON.stringify([modulePath]));
                  const commandUri = vscode.Uri.parse(
                    `command:extension.openModuleFolder?${args}`
                  );

                  const link = new vscode.DocumentLink(
                    new vscode.Range(startPos, endPos),
                    commandUri
                  );
                  link.tooltip = `Reveal ${depName} in Explorer`;
                  links.push(link);
                }
              });
            }
          });
        } catch (error) {
          console.error("Failed to parse package.json", error);
        }

        return links;
      },
    }
  );

  context.subscriptions.push(provider);
}

export function deactivate() {}
