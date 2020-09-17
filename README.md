# React Native Text Prototype

React Native Text Prototype is kind a Text Editor still in development for photo editing / manipulation cases.

  - Drag and Drop Text
  - Resize Text
  - Edit & Type 

### Installation

```sh
$ npm install react-native-text-prototype
```

### Usage

```javascript  
import React, { Component } from "react";
import TextPrototype from 'react-native-text-prototype'

export default class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (  
 <TextPrototype/> 
  }
 )
}

```

### Properties
|    Prop    |   Default     |  Type     |  Description  |
| :--------------: |:------------------:| :----------------:|:------------------------|
| TopLeftIcon| ` <SimpleLineIcons name={"compass"}/>`|Component| Clickable Top Left Icon Component |
 | TopRightIcon | `<SimpleLineIcons name={"close"}/>`| Component| Clickable Top Right Icon Component |   
 |text               | `Lorem Ipsum...`          |    String      | Value of text |
 |fontFamily        | `Roboto`  | String|Font Family|
 |color     | `#000`  | String | Text Color|
 |fontSize    | `15`  | String|Font Size|
 |letterSpacing   | `0`  | String|Letter Spacing|
 |backgroundColor   | `transparent`  | String|Background Color|
|textAlign   | `Roboto`  | String|Text Align|
|lineHeight   | `18`  | String|Line Height|
 | x   | `80`  | String|X location of Components|
  |y   | `150`  | String| Y location of Components|
  |w  | `200`  | Number| First Width |
  |h   | `200`  | Number| First Height |
  |minW   | `200`  | Number| Minimum Width |
  |minH   | `200`  | Number| Minimum Height |
### Todos
  - [ ]  Add Rotation/Rotate Icon
  - [ ]  Add Center-Snap

License
----
This project is licenced under the [MIT License](https://opensource.org/licenses/mit-license.html).

