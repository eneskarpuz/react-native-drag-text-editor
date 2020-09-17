import React, {Component} from 'react';
import {PanResponder,View,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export class Holder extends Component {
 
 constructor(props) {
    super(props);

    this.position = {
      x: 0,
      y: 0,
    };

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {return( gestureState.dx != 0 && gestureState.dy != 0)},
      onMoveShouldSetPanResponderCapture: (event, gestureState) => { return (gestureState.dx != 0 && gestureState.dy != 0)},
      onPanResponderGrant: (event, gestureState) => {
      const {
        onStart
        }=this.props;
         
         this.position = {
          x: 0,
          y: 0,
        };
     onStart([
          0,
          0,
        ]);
      },
      onPanResponderMove: (event, gestureState) => {
      const {
        onMove
        }=this.props;
      
       onMove( 
         [
          gestureState.dx - this.position.x,
          gestureState.dy - this.position.y,
        ]);

        this.position = {
          x: gestureState.dx,
          y: gestureState.dy,
        };
      },
      onPanResponderTerminationRequest: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
      const {
        onEnd
        }=this.props;
      
        onEnd([
          gestureState.moveX,
          gestureState.moveY,
        ]);
      },
      });
  }

  render() {
    const {
      x,
      y,
      size,
      holderWidth,
      holderHeight,
      children,
      backColor,
    } = this.props;

    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width:holderWidth!=null?holderWidth: size,
          height:holderHeight!=null?holderHeight: size,
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:backColor!=null?backColor : 'white'
        }}
        {...this._panResponder.panHandlers}
      >   
      {children} 
        </View>
    );
  }
}

Holder.propTypes = {
  children: PropTypes.element,
  backColor : PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  holderWidth: PropTypes.number,
  holderHeight: PropTypes.number,
  onStart: PropTypes.func.isRequired,
  onMove: PropTypes.func,
  onEnd: PropTypes.func.isRequired,
};
