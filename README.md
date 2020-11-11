
# React Native Drag Text Editor

React Native Drag Text Editor is Draggable & Editable Text Component,still in early development for photo editing / manipulation cases.

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-drag-text-editor">
<img src="https://img.shields.io/badge/dynamic/json?color=success&label=npm&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Feneskarpuz%2Freact-native-drag-text-editor%2Fmaster%2Fpackage.json&style=flat-square"/> 
  <img src="https://img.shields.io/npm/l/react-native-drag-text-editor?style=flat-square"/> 
  <img src="https://img.shields.io/badge/platform-%20IOS%20%7C%20Android%20-black?style=flat-square"/> 
  <img src="https://img.shields.io/github/languages/code-size/eneskarpuz/react-native-drag-text-editor?style=flat-square"/> 
</a>
</p>

##   :star: If this project has helped you out, please support with a star.


## Showcase [ IOS13 / AndroidAPI30 ]
### Check https://github.com/eneskarpuz/TextEditorPlus for full Example in Readme.

<p align="center">
  <img src="https://github.com/eneskarpuz/TextEditorPlus/blob/master/gifs/wIOS.gif" alt="IOS13"/>
  <img src="https://github.com/eneskarpuz/TextEditorPlus/blob/master/gifs/wpAndro.gif" alt="AndroidAPI30"/>
</p> 

  - Drag and Drop Text
  - Resize Text
  - Edit & Type 

## Installation

```sh
$ npm install react-native-drag-text-editor --save
```

## Usage

```javascript  
import React, { Component } from "react";
import {Dimensions} from "react-native";
import {DragTextEditor} from 'react-native-drag-text-editor';
const WINDOW = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (  
        <DragTextEditor
          minWidth={100}
          minHeight={100}
          w={200}
          h={200}
          x={WINDOW.width/4}
          y={WINDOW.height/3}
          FontColor={"#000000"}
          LineHeight={15}
          TextAlign={"left"}
          LetterSpacing={0}
          FontSize={15}
          isDraggable={true}
          isResizable={true}
          TopRightAction={()=>console.log("-Top Right Pressed")}
          centerPress={()=>console.log("-Center Pressed")} 
          onDragStart={()=>console.log("-Drag Started")}
          onDragEnd={()=>console.log("- Drag ended")}
          onDrag={()=>console.log("- Dragging...")}
          onResizeStart={()=>console.log("- Resize Started")}
          onResize={()=>console.log("- Resizing...")}
          onResizeEnd={()=>console.log("- Resize Ended")}
        /> 
    )
  }
}

```

## Properties

|    Prop    |   Default     |  Type     |  Description  |
| :--------------: |:------------------:| :----------------:|:------------------------|
|centerPress               |  -    |    function      | Center Pressed handler |
|TopRightAction               | -          |    function      | Top Right Press handler |
|TopLeftAction               | -          |    function     |Top Left Press handler |
|isDraggable               | `true`          |    boolean      | Draggable condition |
|isResizable               | `true`          |    boolean    |Resizable condition|
|onDragStart               | -        |    function      | Drag Start event handler|
|onDrag               | -          |    function      | Drag handler |
|onDragEnd               | -          |    function      |Drag End event handler |
|onResizeStart               | -          |    function      | Resize Start event handler |
|onResize            | -        |    function      | Resize event handler |
|onResizeEnd| -          |    function      | Resize End event handler |
| TopLeftIcon| `./icons/compassed.png`| function | Clickable Top Left Icon Function Component |
 | TopRightIcon | `./icons/closed.png`| function | Clickable Top Right Icon Function Component |   
 |text               | `Lorem Ipsum...`          |    String      | Value of text |
 |FontFamily        | `Roboto`  | String|Font Family|
 |FontColor     | `#000`  | String | Text Color|
 |FontSize    | `15`  | String|Font Size|
 |LetterSpacing   | `0`  | String|Letter Spacing|
 |BackgroundColor   | `transparent`  | String|Background Color|
 |TextAlign   | `Roboto`  | String|Text Align| 
 |LineHeight   | `18`  | String|Line Height|
 | x   | `80`  | String|X location of Components|
 |y   | `150`  | String| Y location of Components|
  |w  | `200`  | Number| First Width |
  |h   | `200`  | Number| First Height |
  |minWidth   | `200`  | Number| Minimum Width |
  |minHeight   | `200`  | Number| Minimum Height |

## Features

#### - Performs(Visible) in Black and White Backgrounds

<p align="center">
<img src="https://github.com/eneskarpuz/TextEditorPlus/blob/master/gifs/borderinfo.gif"/>
</p>

#### - Logs  

<p align="center">
<img src="https://github.com/eneskarpuz/TextEditorPlus/blob/master/gifs/draginfo.gif"/>
</p>

## To Do
- [ ] Performance Optimization (Code Duplicates etc.)
- [ ] textID and textInAction Bug (Type Error)
- [ ] Dynamic Border Management
- [ ]  Add Rotation/Rotate Icon
- [ ]  Add Center-Snap


License
----
This project is licensed under the [MIT License](https://opensource.org/licenses/mit-license.html).
