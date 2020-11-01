// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const axios = require("axios");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('"joke-grammer" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "joke-grammer.helloWorld",
    async () => {
      const URI = "https://official-joke-api.appspot.com/jokes/random";

      try {
        const joke = await axios.get(URI);
        const items = ["Lol 🤣", "That was stupid 😒"];
        if (joke.data) {
          const jokeMsg = joke.data.setup + "\n" + joke.data.punchline;
          const res = await vscode.window.showInformationMessage(
            jokeMsg,
            ...items
          );

          switch (res) {
            case items[0]:
              vscode.window.showInformationMessage(
                "Yeah it was indeed funny 🤣 !"
              );
              break;
            case items[1]:
              vscode.window.showInformationMessage(
                "Yeah that was not funny 😒 , the API is responsible though 🤣"
              );
              break;
          }
        }
      } catch (err) {
        console.log(err.message);
        vscode.window.showErrorMessage("Ohh snap 🤔  , there's some issue !");
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
