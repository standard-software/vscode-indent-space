const vscode = require(`vscode`);
const {
  _trimFirst, _trim,
  _subIndex,
} = require(`./parts/parts.js`);

const loopSelectionsLines = (editor, func) => {
  for (const { start, end } of editor.selections) {
    for (let i = start.line; i <= end.line; i += 1) {
      if (
        start.line !== end.line &&
        i === end.line &&
        end.character === 0
      ) {
        break;
      }
      func(i);
    }
  }
};

const getIndent = (line) => {
  return line.length - _trimFirst(line, [` `, `\t`]).length;
};

const getMinIndent = (editor) => {
  let minIndent = Infinity;
  loopSelectionsLines(editor, i => {
    const line = editor.document.lineAt(i).text;
    if (_trim(line) === ``) { return; }
    const indent = getIndent(line);
    if (indent < minIndent) {
      minIndent = indent;
    }
  });
  if (minIndent === Infinity) { minIndent = 0; }
  return minIndent;
};

function activate(context) {

  const registerCommand = (commandName, func) => {
    context.subscriptions.push(
      vscode.commands.registerCommand(
        commandName, func
      )
    );
  };

  const commandQuickPick = (commandsArray, placeHolder) => {
    const commands = commandsArray.map(c => ({label:c[0], description:c[1], func:c[2]}));
    vscode.window.showQuickPick(
      commands.map(({label, description}) => ({label, description})),
      {
        canPickMany: false,
        placeHolder
      }
    ).then((item) => {
      if (!item) { return; }
      commands.find(({label}) => label === item.label).func();
    });
  };

  const mark = `>>`;

  registerCommand(`IndentSpace.SelectFunction`, () => {

    commandQuickPick([
      [`Change`,                    mark, () => { commandQuickPick([
        [`Space 2 to 4`,            ``,   () => { mainEdit(`Space2To4`); }],
        [`Space 2 to Tab`,          ``,   () => { mainEdit(`Space2ToTab`); }],
        [`Space 4 to 2`,            ``,   () => { mainEdit(`Space4To2`); }],
        [`Space 4 to Tab`,          ``,   () => { mainEdit(`Space4ToTab`); }],
        [`Tab to Space 2`,          ``,   () => { mainEdit(`TabToSpace2`); }],
        [`Tab to Space 4`,          ``,   () => { mainEdit(`TabToSpace4`); }],
      ], `Indent Space : Change`); }],
      [`Cut`,                       mark, () => { commandQuickPick([
        [`Cut Min Indent`,          ``,   () => { mainEdit(`CutMinIndent`); }],
        [`Cut Indent (Trim Begin)`, ``,   () => { mainEdit(`TrimBegin`); }],
      ], `Indent Space : Cut`); }],
    ], `Indent Space : Select Function`);

  });

  const mainEdit = (commandName) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage(`No editor is active`);
      return;
    }

    editor.edit(editBuilder => {

      const changeIndent = (str, newStr) => {
        loopSelectionsLines(editor, i => {
          const line = editor.document.lineAt(i).text;
          const trimLine = _trimFirst(line, [` `, `\t`]);
          const indent = _subIndex(line, 0, line.length - trimLine.length - 1);
          const range = new vscode.Range(
            i, 0, i, line.length - trimLine.length,
          );
          editBuilder.replace(range, indent.replaceAll(str, newStr));
        });
      };

      switch (commandName) {
      case `Space2To4`: {
        changeIndent(`  `, `    `);
      } break;
      case `Space2ToTab`: {
        changeIndent(`  `, `\t`);
      } break;

      case `Space4To2`: {
        changeIndent(`    `, `  `);
      } break;
      case `Space4ToTab`: {
        changeIndent(`    `, `\t`);
      } break;

      case `TabToSpace2`: {
        changeIndent(`\t`, `  `);
      } break;
      case `TabToSpace4`: {
        changeIndent(`\t`, `    `);
      } break;

      case `CutMinIndent`: {
        const minIndent = getMinIndent(editor);
        loopSelectionsLines(editor, i => {
          const line = editor.document.lineAt(i).text;
          if ((_trim(line) === ``) && (line.length < minIndent)) { return; }
          const range = new vscode.Range(
            i, 0, i, minIndent,
          );
          editBuilder.delete(range);
        });
      } break;

      case `TrimBegin`: {
        loopSelectionsLines(editor, i => {
          const line = editor.document.lineAt(i).text;
          const trimLine = _trimFirst(line, [` `, `\t`]);
          if (line.length === trimLine.length) { return; }
          const range = new vscode.Range(
            i, 0, i, line.length - trimLine.length,
          );
          editBuilder.delete(range);
        });
      } break;

      }
    });
  };

  registerCommand(`IndentSpace.Space2To4`, () => {
    mainEdit(`Space2To4`);
  });
  registerCommand(`IndentSpace.Space2ToTab`, () => {
    mainEdit(`Space2ToTab`);
  });

  registerCommand(`IndentSpace.Space4To2`, () => {
    mainEdit(`Space4To2`);
  });
  registerCommand(`IndentSpace.Space4ToTab`, () => {
    mainEdit(`Space4ToTab`);
  });

  registerCommand(`IndentSpace.TabToSpace2`, () => {
    mainEdit(`TabToSpace2`);
  });
  registerCommand(`IndentSpace.TabToSpace4`, () => {
    mainEdit(`TabToSpace4`);
  });

  registerCommand(`IndentSpace.CutMinIndent`, () => {
    mainEdit(`CutMinIndent`);
  });
  registerCommand(`IndentSpace.TrimBegin`, () => {
    mainEdit(`TrimBegin`);
  });

}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
