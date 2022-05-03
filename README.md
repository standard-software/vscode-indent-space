# vscode-indent-space

[![Version][version-badge]][marketplace]
[![Ratings][ratings-badge]][marketplace-ratings]
[![Installs][installs-badge]][marketplace]
[![License][license-badge]][license]

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

## Version

### 1.3.0
- Set title icon
- update README
- Remove unnecessary npm packages
- Change command structure
- set vscode debug config

### 1.2.0
2021/12/11(Sat)
- "Clipboard Copy" >> "Copy Clipboard"

### 1.1.1
2021/12/08(Wed)
- refactoring
- eslint fix

### 1.1.0
2021/12/08(Wed)
- update README
- update fix Select Range endLine

### 1.0.0
2021/12/06(Mon)
- release

### 0.2.0
2021/12/06(Mon)
- add
  - Edit Cut | Cut Min Indent
  - Clipboard Copy | Cut Min Indent
  - Clipboard Copy | Cut Indent (Trim Begin)

### 0.1.0
2021/12/05(Sun)
- Created by migrating from vscode-begin-of-line  
https://github.com/standard-software/vscode-begin-of-line

[version-badge]: https://vsmarketplacebadge.apphb.com/version/SatoshiYamamoto.vscode-indent-space.svg
[ratings-badge]: https://vsmarketplacebadge.apphb.com/rating/SatoshiYamamoto.vscode-indent-space.svg
[installs-badge]: https://vsmarketplacebadge.apphb.com/installs/SatoshiYamamoto.vscode-indent-space.svg
[license-badge]: https://img.shields.io/github/license/standard-software/vscode-indent-space.svg

[marketplace]: https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-indent-space
[marketplace-ratings]: https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-indent-space#review-details
[license]: https://github.com/standard-software/vscode-indent-space/blob/master/LICENSE
