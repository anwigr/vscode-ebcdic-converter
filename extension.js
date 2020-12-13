// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const ebcdic2utf8 = require('./converters/ebcdic2utf8');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('Congratulations, your extension "ebcdic-converter" is now active!');
	
	let disposable = vscode.commands.registerCommand('ebcdic-converter.convert2utf8', function () {
		
		//Get text from current editor
		const activeEditor = vscode.window.activeTextEditor;
		var firstLine = activeEditor.document.lineAt(0);
		var lastLine = activeEditor.document.lineAt(activeEditor.document.lineCount - 1);
		var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);
		var wholeText = activeEditor.document.getText(textRange);

		ebcdic2utf8.convert(wholeText);
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello, I am EBCDIC Converter! Soon I will be able to convert your precious EBCDIC characters to something less legacy-ish.');

	});

	context.subscriptions.push(disposable);
}
//exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {

	console.log('Extension "ebcdic-converter" is now deactiveted!');
}

module.exports = {
	activate,
	deactivate
}
