# Open Module Folder

**Open Module Folder** is a Visual Studio Code extension that allows you to quickly reveal the folder of any npm module listed in your `package.json` file. Simply click on a module name in the `dependencies`, `devDependencies`, or `peerDependencies` section, and the corresponding folder in `node_modules` will be revealed in the Explorer panel — automatically expanded for easy access.

---

## Features

- Click on any dependency in `package.json` to reveal its folder in `node_modules`.
- Supports `dependencies`, `devDependencies`, and `peerDependencies`.
- Automatically expands the folder in the Explorer so you can see its contents immediately.
- Speeds up navigation and inspection of module source code.

---

## Usage

1. Open a `package.json` file in your project.
2. Hover over a dependency name (e.g., `"react": "^18.0.0"`).
3. Click the module name.
4. The folder will be revealed and expanded in the Explorer panel.

---

## Requirements

- Visual Studio Code
- A project with `node_modules` installed (`npm install` or `yarn install`)

---

## Extension Settings

This extension does not require any settings. Just install and start clicking module names in `package.json`.

---

## Known Issues

- Works only with `dependencies`, `devDependencies`, and `peerDependencies`.
- If the module folder does not exist (not installed), an error message is shown.

---

## Release Notes

### 1.0.0

- Initial release
- Clickable modules in `package.json`
- Reveal and auto-expand folders in Explorer

---

## License

MIT
