import React from 'react';
import { PixelRatio, StyleSheet, Text, View, PanResponder, Animated, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Images, Metrics } from './../Themes'

const REACTIONS = [
//  { label: "Worried", src: Images.worried, bigSrc: Images.worriedBig },
  { label: "Détail", src: Images.smile, bigSrc: Images.smileBig},
  //{ label: "Strong", src: Images.ambitious, bigSrc: Images.ambitiousBig },
  { label: "Utile", src: Images.ambitious, bigSrc: Images.ambitiousBig },
  { label: "Important", src: Images.surprised, bigSrc: Images.surprisedBig}
];

const size = Metrics.emojiSize;
const marginSize = 20;
const WIDTH = Metrics.emojiRatingWitdh;
const DISTANCE =  WIDTH / REACTIONS.length;
const END = WIDTH - (DISTANCE);

export default class EmojiRating extends React.Component {
  constructor(props) {
    super(props);

    var initialValue = DISTANCE * this.props.value

    this._pan = new Animated.Value(initialValue);

  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._pan.setOffset(this._pan._value);
        this._pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, {dx: this._pan}]),
      onPanResponderRelease: () => {
        this._pan.flattenOffset();

        let offset = Math.max(0, this._pan._value + 0);
        if (offset < 0) return this._pan.setValue(0);
        if (offset > END) return this._pan.setValue(END);

        const modulo = offset % DISTANCE;
        offset = (modulo >= DISTANCE/2) ? (offset+(DISTANCE-modulo)) : (offset-modulo);

        this.updatePan(offset);
      }
    });
  }

  updatePan(toValue) {
    Animated.spring(this._pan, { toValue, friction: 7 }).start();

    if (DISTANCE == toValue )
      this.props.onChange(1)

    if (DISTANCE > toValue)
      this.props.onChange(0)

    if (DISTANCE < toValue)
      this.props.onChange(2)
  }

  renderSubText(inputRange,topOutputRange,colorOutputRange,reaction){
    if (this.props.hasText){
      return (
        <Animated.Text style={[styles.reactionText, {
          top: this._pan.interpolate({
            inputRange,
            outputRange: topOutputRange,
            extrapolate: 'clamp',
          }),
          color: this._pan.interpolate({
            inputRange,
            outputRange: colorOutputRange,
            extrapolate: 'clamp',
          })
        }]}>
          {reaction.label}
        </Animated.Text>)
      }
      else {
        return;
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <View style={styles.line} />
          <View style={styles.reactions}>
            {REACTIONS.map((reaction, idx) => {
              const u = idx * DISTANCE;
              let inputRange = [u-marginSize, u, u+marginSize];
              let scaleOutputRange = [1, 0.25, 1];
              let topOutputRange = [0, 10, 0];
              let colorOutputRange = ['#999', '#222', '#999'];




              if (u-marginSize < 0) {
                inputRange = [u, u+marginSize];
                scaleOutputRange = [0.25, 1];
                topOutputRange = [10, 0];
                colorOutputRange = ['#222', '#999'];
              }

              if (u+marginSize > END) {

                inputRange = [u-marginSize, u];
                scaleOutputRange = [1, 0.25];
                topOutputRange = [0, 10];
                colorOutputRange = ['#999', '#222'];
              }
              return (
                <TouchableOpacity onPress={() => {
                    this.updatePan(u)
                  }}
                    activeOpacity={0.9} key={idx}
                  >
                  <View style={styles.smileyWrap}>
                    <Animated.Image
                      source={reaction.src}
                      style={[styles.smiley, {
                        transform: [{
                          scale: this._pan.interpolate({
                            inputRange,
                            outputRange: scaleOutputRange,
                            extrapolate: 'clamp',
                          })
                        }]
                      }]}
                    />
                  </View>
                  { this.renderSubText(inputRange,topOutputRange,colorOutputRange, reaction)}
                </TouchableOpacity>
              );
            })}
            <Animated.View {...this._panResponder.panHandlers} style={[styles.bigSmiley, {
              transform: [{
                translateX: this._pan.interpolate({
                  inputRange: [0, END],
                  outputRange: [0, END],
                  extrapolate: 'clamp',
                })
              }]
            }]}>
              {REACTIONS.map((reaction, idx) => {
                let inputRange = [(idx-1)*DISTANCE, idx*DISTANCE, (idx+1)*DISTANCE];
                let outputRange = [0, 1, 0];

                if (idx == 0) {
                  inputRange = [idx*DISTANCE, (idx+1)*DISTANCE];
                  outputRange = [1, 0];
                }

                if (idx == REACTIONS.length - 1) {
                  inputRange = [(idx-1)*DISTANCE, idx*DISTANCE];
                  outputRange = [0, 1];
                }

                return (
                  <Animated.Image
                    key={idx}
                    source={reaction.bigSrc}
                    style={[styles.bigSmileyImage, {
                      opacity: this._pan.interpolate({
                        inputRange,
                        outputRange,
                        extrapolate: 'clamp',
                      })
                    }]}
                  />
                );
              })}
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wrap: {
    width: WIDTH,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  smileyWrap: {
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
    borderRadius: size/2,
    backgroundColor: '#c7ced3',
  },
  bigSmiley: {
    width: DISTANCE,
    height: DISTANCE,
    borderRadius: DISTANCE/2,
    backgroundColor: '#ffb18d',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bigSmileyImage: {
    width: DISTANCE,
    height: DISTANCE,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reactionText: {
    fontSize: Fonts.size.small,
    textAlign: 'center',
    color: Colors.darkprimary,
    fontFamily: 'Rubik-Regular',
  },
  line: {
    height: 4 / PixelRatio.get(),
    backgroundColor: Colors.accent,
    width: WIDTH - (DISTANCE-size),
    left: (DISTANCE-size) / 2,
    top: DISTANCE/2 + (2 / PixelRatio.get()),
  }
});
