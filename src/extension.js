const vscode = require('vscode');
const {
  isUndefined,
  _isFirst,
  _trimFirst, _trim,
  _subIndex,
} = require('./parts/parts.js')

const getIndent = (line) => {
  return line.length - _trimFirst(line, [' ', '\t']).length;
}

const getMinIndent = (editor) => {
  let minIndent = Infinity;
  for (let { start, end } of editor.selections) {
    for (let i = start.line; i <= end.line; i += 1) {
      const line = editor.document.lineAt(i).text;
      if (_trim(line) === '') { continue; }
      const indent = getIndent(line);
      if (indent < minIndent) {
        minIndent = indent
      }
    }
  };
  if (minIndent === Infinity) { minIndent = 0; }
  return minIndent;
}

function activate(context) {

  const registerCommand = (commandName, func) => {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        commandName, func
      )
    );
  }

  registerCommand(`IndentSpace.SelectFunction`, () => {

    let select1Space;
    const commands = [
      [`Space`,         '', () => { select1Space(); }],
    ].map(c => ({label:c[0], description:c[1], func:c[2]}));
    vscode.window.showQuickPick(
      commands.map(({label, description}) => ({label, description})),
      {
        canPickMany: false,
        placeHolder: "Begin Of Line | Select Function"
      }
    ).then((item) => {
      if (!item) { return; }
      commands.find(({label}) => label === item.label).func();
    });

    select1Space = () => {
      const commands = [
        [`Space 2 to 4`,  '', () => { mainSpace(`Space2To4`); }],
        [`Space 4 to 2`,  '', () => { mainSpace(`Space4To2`); }],
        [`Space 4 to Tab`,'', () => { mainSpace(`Space4ToTab`); }],
        [`Tab to Space 4`,'', () => { mainSpace(`TabToSpace4`); }],
        [`Trim Begin`,    '', () => { mainSpace(`TrimBegin`); }],
      ].map(c => ({label:c[0], description:c[1], func:c[2]}));
      vscode.window.showQuickPick(
        commands.map(({label, description}) => ({label, description})),
        {
          canPickMany: false,
          placeHolder: "Begin Of Line | Space",
        }
      ).then((item) => {
        if (!item) { return; }
        commands.find(({label}) => label === item.label).func();
      });
    }

  });

  const mainSpace = (commandName) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage(`No editor is active`);
      return;
    }
    editor.edit(editBuilder => {
      switch (commandName) {

        case `Space2To4`: {
          for (let { start, end } of editor.selections) {
            for (let i = start.line; i <= end.line; i += 1) {
              const line = editor.document.lineAt(i).text;
              const trimLine = _trimFirst(line, [' ', '\t']);
              const indent = _subIndex(line, 0, line.length - trimLine.length - 1)
              const range = new vscode.Range(
                i, 0, i, line.length - trimLine.length,
              );
              editBuilder.replace(range, indent.replaceAll('  ', '    '));
            }
          };
        } break;

        case `Space4To2`: {
          for (let { start, end } of editor.selections) {
            for (let i = start.line; i <= end.line; i += 1) {
              const line = editor.document.lineAt(i).text;
              const trimLine = _trimFirst(line, [' ', '\t']);
              const indent = _subIndex(line, 0, line.length - trimLine.length - 1)
              const range = new vscode.Range(
                i, 0, i, line.length - trimLine.length,
              );
              editBuilder.replace(range, indent.replaceAll('    ', '  '));
            }
          };
        } break;

        case `Space4ToTab`: {
          for (let { start, end } of editor.selections) {
            for (let i = start.line; i <= end.line; i += 1) {
              const line = editor.document.lineAt(i).text;
              const trimLine = _trimFirst(line, [' ', '\t']);
              const indent = _subIndex(line, 0, line.length - trimLine.length - 1)
              const range = new vscode.Range(
                i, 0, i, line.length - trimLine.length,
              );
              editBuilder.replace(range, indent.replaceAll('    ', '\t'));
            }
          };
        } break;

        case `TabToSpace4`: {
          for (let { start, end } of editor.selections) {
            for (let i = start.line; i <= end.line; i += 1) {
              const line = editor.document.lineAt(i).text;
              const trimLine = _trimFirst(line, [' ', '\t']);
              const indent = _subIndex(line, 0, line.length - trimLine.length - 1)
              const range = new vscode.Range(
                i, 0, i, line.length - trimLine.length,
              );
              editBuilder.replace(range, indent.replaceAll('\t', '    '));
            }
          };
        } break;

        case `TrimBegin`: {
          for (let { start, end } of editor.selections) {
            for (let i = start.line; i <= end.line; i += 1) {
              const line = editor.document.lineAt(i).text;
              const trimLine = _trimFirst(line, [' ', '\t']);
              const range = new vscode.Range(
                i, 0, i, line.length,
              );
              editBuilder.replace(range, trimLine);
            }
          };
        } break;

      }
    });
  };

  registerCommand(`IndentSpace.Space2To4`, () => {
    mainSpace(`Space2To4`);
  });

  registerCommand(`IndentSpace.Space4To2`, () => {
    mainSpace(`Space4To2`);
  });

  registerCommand(`IndentSpace.Space4ToTab`, () => {
    mainSpace(`Space4ToTab`);
  });

  registerCommand(`IndentSpace.TabToSpace4`, () => {
    mainSpace(`TabToSpace4`);
  });

  registerCommand(`IndentSpace.TrimBegin`, () => {
    mainSpace(`TrimBegin`);
  });

}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
