import React, {Component} from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Holder,
  } from './Holder';
const WINDOW = Dimensions.get('window');
const LEFT_EDGE = 'LEFT_EDGE';
const RIGHT_EDGE = 'RIGHT_EDGE';
const RIGHT_HOLDER = 'RIGHT_HOLDER';
const LEFT_HOLDER = 'LEFT_HOLDER';
const CENTER = 'CENTER';
const HOLDER_SIZE = 14;
const TOPLEFT_SIZE = 25;
const TEXT ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
const CLOSE_ICON = require('../icons/closed.png');
const COMPASS_ICON = require('../icons/compassed.png');

export default class DragTextEditor extends Component {
  constructor(props) {
    super(props);

    const {
      x,
      y,
      w,
      h,
      minWidth,
      minHeight,
    } = props;
 
    this.state = {
     holders:[
      RIGHT_EDGE,
      RIGHT_HOLDER,
      LEFT_HOLDER,
      LEFT_EDGE,
      CENTER,
    ],
      x:x,
      y:y,
      w: w < minWidth ? minWidth : w,
      h: h < minHeight ? minHeight :h,
      ended:true,
      giveInput:false,
      text: this.props.PlaceHolder==null?TEXT:this.props.PlaceHolder,
      isBorder:false,
    };
    

  this.holderObjMap = {};
  
   this.holderObjMap.LEFT_EDGE = {
      holderLeft: (width) => {
        return 0;
      },
      holderTop: (height) => {
        return 0;
      },
      holderWidth:(wid)=>{ 
        return null; 
      },    
      holderHeight:()=>{
        return null;
      },
      onStart: this.onResizeStart,
      onMove: this.onDrag,
      onEnd: this.onResizeEnd,
      children: this.childTL(),
      size:TOPLEFT_SIZE,
      backColor:"transparent",
    };

    this.holderObjMap.RIGHT_EDGE = {
      holderLeft: (width) => {
        return width - TOPLEFT_SIZE+2;
      },
      holderTop: (height) => {
        return 0;
      },
      holderWidth:(wid)=>{ 
        return null; 
      },   
      holderHeight:()=>{
        return null;
      },
      onStart: this.onResizeStart,
      onMove: this.onDrag,
      onEnd: this.onResizeEnd,
      children: this.childTR(),
      size:TOPLEFT_SIZE,
      backColor:"transparent",
        
    };


    this.holderObjMap.RIGHT_HOLDER = {

      holderLeft: (width) => {
        return width - (TOPLEFT_SIZE/2)-7; 
      },
      holderTop: (height) => {
        return height / 2;
      },
      holderWidth:(wid)=>{ 
        return null; 
      },  
      holderHeight:()=>{
        return null;
      },
      onStart: this.onResizeStart,
      onMove: this.onResizeMR,
      onEnd: this.onResizeEnd,
      children: this.childMR(),
      size:TOPLEFT_SIZE,
      backColor:"transparent",
       
    };

    this.holderObjMap.LEFT_HOLDER = {
      holderLeft: (width) => {
        return -(TOPLEFT_SIZE/2)+7;
      },
      holderTop: (height) => {
        return height / 2 ;
      },
      holderWidth:(wid)=>{ 
        return null; 
      },    
      holderHeight:()=>{
        return null;
      },
      onStart: this.onResizeStart,
      size:TOPLEFT_SIZE,
      onMove: this.onResizeML,
      onEnd: this.onResizeEnd,
      children: this.childML(),
      backColor:"transparent",
    };

    this.holderObjMap.CENTER = {
      holderLeft: (width) => {
        return 20;
      },
      holderTop: (height) => {
        return height / 2 - (this.state.h-HOLDER_SIZE) / 2 + HOLDER_SIZE/2;
      },
      holderWidth:(wid)=>{ 
        return wid-40; 
      },       
      holderHeight:(heig)=>{
        return heig-HOLDER_SIZE;
      },
      onStart: this.onDragStart,
      onMove: this.onDrag,
      onEnd: this.onDragEnd,
      children: this.childC(),
      backColor:"transparent",
      size:null,
    };
   } 

hitCenter=()=>{
  this.setState({giveInput:true})
  }

childC=()=>{ 
 return(
  <TouchableOpacity 
    style={styles.center} 
      onPress={()=>this.hitCenter()}> 
      </TouchableOpacity>
    )
  }
childTL=()=>{
 return(
  <TouchableOpacity onPress={()=>this.props.TopLeftAction==undefined?this.isBorder():this.props.TopLeftAction()} style={styles.Top}>
     {  this.props.TopLeftIcon === null? 
           <Image style={styles.ico} source={COMPASS_ICON}/>
             :this.props.TopLeftIcon
        }
  </TouchableOpacity>
  )
}
childTR=()=>{
 return(
  <TouchableOpacity onPress={()=>this.props.TopRightAction===undefined?null:this.props.TopRightAction()} style={styles.Top}>
     { this.props.TopRightIcon === null? 
        <Image style={styles.ico} source={CLOSE_ICON}/>
          :this.props.TopRightIcon
         } 
  </TouchableOpacity>
  )
}

childML=()=>{ 
  return(
 <View style={styles.holder}/>
  )
}
childMR=()=>{ 
  return(
 <View style={styles.holder}/>
  )
}
 

  onResizeStart = (location) => {
    const {
      onResizeStart,
    } = this.props;

    if (onResizeStart !== null) {
      onResizeStart([
        this.state.x,
        this.state.y,
      ]);
    }
  }

  onResizeMR = (location) => {
    const {
      isResizable,
      windowBorder,
      onResize,
    } = this.props;

    if (!isResizable) {
      return;
    }

    this.setState(() => {
      const calcWidth = this.state.w + location[0];

      if (calcWidth >= this.props.minWidth) {
        if (windowBorder.w >= this.state.x + calcWidth) {
          this.state.w = calcWidth;
        }
      }  
      if(calcWidth<=150){
        this.state.w = 150;
      }
      if (onResize !== null) {
        onResize([
          this.state.x,
          this.state.y,
        ]);
      }

      return this.state;
    });
  }

  onResizeML = (location) => {
    const {
      minWidth,
      isResizable,
      windowBorder,
      onResize,
    } = this.props;

    if (!isResizable) {
      return;
    }

    this.setState(() => {
      const newX = this.state.x + location[0];
      const calcWidth = this.state.x + this.state.w - newX;

      if (calcWidth >= minWidth) {
        if (windowBorder.x <= newX) {
          this.state.w = calcWidth;
          this.state.x = newX;
        }
      }

      if (onResize !== null) {
        onResize([
          this.state.x,
          this.state.y,
        ]);
      }

      return this.state;
    });
  }

   onResizeEnd = (location) => {
    const {
      onResizeEnd,
    } = this.props;

   
    if (onResizeEnd !== null) {
      onResizeEnd([
        this.state.x,
        this.state.y,
      ]);
    }
  }

   onDragStart = (location) => {
    const {
      onDragStart,
    } = this.props;

    if (onDragStart !== null) {
      onDragStart([
        this.state.x,
        this.state.y,
      //  false,
      ]);
    }
  }
  onDrag = (location) => {
    const {
      isDraggable,
      windowBorder,
      onDrag,
    } = this.props;

    if (!isDraggable) {
      return;
    }

    this.setState(() => {
      const newX = this.state.x + location[0];
      const newY = this.state.y + location[1];

        if (windowBorder.x <= newX && windowBorder.w >= newX + this.state.w) {
          this.state.x = newX;
        }

        if (windowBorder.y <= newY && windowBorder.h >= newY + this.state.h) {
          this.state.y = newY;
        }

      if (onDrag !== null) {
        onDrag([
          this.state.x,
          this.state.y,
        ]);
      }
    return this.state;
    });
  }

  onDragEnd = (location) => {
    const {
      onDragEnd,
    } = this.props;
   
    this.isBorder();
   
    if (onDragEnd !== null) {
      onDragEnd([
        this.state.x,
        this.state.y,
      ]);
    }
  }

   renderholders = () => {
    const {
      w,
      h,
    } = this.state;

   return this.state.holders.map((holderType) => {
      return (
        <Holder
          key={holderType}
          type={holderType}
          size={this.holderObjMap[holderType].size}
          holderHeight={this.holderObjMap[holderType].holderHeight(h)}    
          holderWidth={this.holderObjMap[holderType].holderWidth(w)}    
          backColor={this.holderObjMap[holderType].backColor}
          x={this.holderObjMap[holderType].holderLeft(w)}
          y={this.holderObjMap[holderType].holderTop(h)}
          onStart={this.holderObjMap[holderType].onStart}
          onMove={this.holderObjMap[holderType].onMove}
          onEnd={this.holderObjMap[holderType].onEnd}
        > 
           {this.holderObjMap[holderType].children}
        </Holder>
      );
    });
  }
  calcLayout = (event) => {
    this.setState({h: event.nativeEvent.layout.height});
  };
  isBorder = () => {
    this.setState({isBorder: true,giveInput:false});
  };
  isOtherBorder = () => {
    this.setState({isBorder: false});
  };
  onText = (text) => {
    const {
   onTextChanged
  } = this.props;
    this.setState({ text }, () => {
      if (onTextChanged) {
        onTextChanged(text);
      }
    });
  };
  validPress=()=>{
    this.isOtherBorder(); 
      if(this.props.centerPress!=undefined){
        this.props.centerPress();
      } 
        else null;
  }
  render() {
    const {
      x,
      y,
      w,
      isBorder,
    } = this.state;

    return (
      <View
       style={{
        position: 'absolute',
         left: x,
          top: y,
           width:w,
            padding: HOLDER_SIZE / 2,
           }}>

         <TouchableOpacity 
        onPress={()=>this.validPress()}
          style={{
            borderColor:"black",
             borderWidth:1, 
              width:"100%",
               height:"100%",
                borderColor:isBorder?"transparent":"black"
         }}>
         
        
   <View style={{borderColor:isBorder?"transparent":"white",borderWidth:1}} onLayout={this.calcLayout}>
         {this.state.giveInput?
          <TextInput
            style={{
              zIndex:10000,
              elevation:0.01,
              fontFamily: this.props.FontFamily,
              fontVariant: this.props.FontVariant,
              color:this.props.FontColor,
              fontSize: this.props.FontSize,
              letterSpacing: this.props.LetterSpacing,
              textAlignVertical: 'center',
              backgroundColor:this.props.BackgroundColor,
              textAlign: this.props.TextAlign,//'right',
              lineHeight: this.props.LineHeight,
              fontWeight: 'normal',
              overflow: 'hidden',
              margin: 10,
              padding:5,
              textDecorationLine: this.props.TextDecorationLine,
              transform: [{ rotate: this.props.Rotation + 'deg'}]
            }}
          selectTextOnFocus={true}
          multiline={true}
          autoFocus={true}
          onChangeText={(text) => this.onText(text)}
          value={this.state.text}
          />
          : 
           <Text
            style={{
              fontFamily: this.props.FontFamily,
              color: this.props.FontColor,
              fontSize: this.props.FontSize,
              letterSpacing: this.props.LetterSpacing,
              textAlignVertical: 'center',
              backgroundColor:this.props.BackgroundColor,
              textAlign: this.props.TextAlign,//'right',
              lineHeight: this.props.LineHeight,
              fontWeight: 'normal',
              fontVariant: this.props.FontVariant,
              overflow: 'hidden',
              display: 'flex',
              margin: 10,
              padding:5,
              textDecorationLine: this.props.TextDecorationLine,
              transform: [{ rotate: this.props.Rotation + 'deg'}]
            }}
            > 
              {this.state.text}
            </Text>
        }
        </View>


        </TouchableOpacity> 
        {isBorder ? null : this.renderholders()}
      </View>
    );
  }
} 
const styles = StyleSheet.create({
holder:{
  width:18,
   height:18,
    backgroundColor:"#fff",
     borderRadius:9,
      borderWidth:1,
       justifyContent: "center",
        alignItems: "center" 
},
Top:{
 width: 30, 
  height:30,
   borderWidth: 1,
    borderColor: 'white',
     justifyContent: "center",
      alignSelf: "center",
       alignItems: "center",
        borderRadius: 15,
         backgroundColor: 'transparent' 
},
ico:{
  width:30,
   height:30,
    borderRadius:15,
     borderWidth:1,
      backgroundColor:"white",
       borderColor:"white",
},
center:{
  width:'100%',
    height:'100%',
}

})

DragTextEditor.defaultProps = {
  x: 0,
  y: 0,
  w: 200,
  h: 200,
  minWidth: 200,
  minHeight: 200,
  windowBorder: {
    x: 0,
    y: 0,
    w: Dimensions.get('window').width,
    h: Dimensions.get('window').height,
  },
centerPress:null,
TopLeftAction:null,
TopRightAction:null,
  TopLeftIcon:null,
  TopRightIcon:null,
  FontFamily:null,
  LetterSpacing:0,
  FontColor:"black",
  FontSize:15,
  BackgroundColor:"transparent",
  TextAlign:"center",
  LineHeight:18,
  isDraggable: true,
  isResizable: true,
  onDragStart: null,
  onDrag: null,
  onDragEnd: null,
  onResizeStart: null,
  onResize: null,
  onResizeEnd: null,
  FontVariant: [],
  TextDecorationLine: 'none',
  Rotation: 0
};

DragTextEditor.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  w: PropTypes.any,
  h: PropTypes.any,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  windowBorder: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,
  }),
centerPress:PropTypes.func,
TopLeftAction:PropTypes.func,
TopRightAction:PropTypes.func,
  TopLeftIcon:PropTypes.func,
  TopRightIcon:PropTypes.func,
  FontFamily:PropTypes.string,
  FontVariant: PropTypes.array,
  LetterSpacing:PropTypes.number,
  FontColor:PropTypes.string,
  FontSize:PropTypes.number,
  BackgroundColor:PropTypes.string,
  TextAlign:PropTypes.string,
  LineHeight:PropTypes.number,
  isDraggable: PropTypes.bool,
  isResizable: PropTypes.bool,
  holders: PropTypes.array,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onResizeStart: PropTypes.func,
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func,
  TextDecorationLine: PropTypes.string,
  Rotation: PropTypes.number
};
