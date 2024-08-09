# vscode-indent-space

[![](https://vsmarketplacebadges.dev/version-short/SatoshiYamamoto.vscode-indent-space.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-indent-space)
[![](https://vsmarketplacebadges.dev/installs-short/SatoshiYamamoto.vscode-indent-space.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-indent-space)
[![](https://vsmarketplacebadges.dev/rating-short/SatoshiYamamoto.vscode-indent-space.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-indent-space)
[![](https://img.shields.io/github/license/standard-software/vscode-indent-space.png)](https://github.com/standard-software/vscode-indent-space/blob/main/LICENSE)

This extension has the following functions
- Change the indentation type. Space 2 or 4 or Tab.
- Remove indent space and edit.
- Remove indent space and copy to clipboard.

## Install

https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-indent-space

## Usage

Processing is performed according to the following command for each line in the selected range.
Enter the character string after selecting the command.

Following commands are available:

```
- Indent Space | Edit Change | Space 2 to 4
- Indent Space | Edit Change | Space 2 to Tab
- Indent Space | Edit Change | Space 4 to 2
- Indent Space | Edit Change | Space 4 to Tab
- Indent Space | Edit Change | Tab to Space 2
- Indent Space | Edit Change | Tab to Space 4

- Indent Space | Edit Cut | Cut Min Indent
- Indent Space | Edit Cut | Cut Indent (Trim Begin)

- Indent Space | Copy Clipboard | Cut Min Indent
- Indent Space | Copy Clipboard | Cut Indent (Trim Begin)
```

Or Select Function

```
- Indent Space | Select Function
  - Edit Change
    - Space 2 to 4
    - Space 2 to Tab
    - Space 4 to 2
    - Space 4 to Tab
    - Tab to Space 2
    - Tab to Space 4
  - Edit Cut
    - Cut Min Indent
    - Cut Indent (Trim Begin)
  - Copy Clipboard
    - Cut Min Indent
    - Cut Indent (Trim Begin)
```

## License

Released under the [MIT License][license].

## Change log

[./CHANGELOG.md](./CHANGELOG.md)


