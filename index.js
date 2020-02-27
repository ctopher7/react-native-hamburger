import React,{useEffect} from 'react'
import {Animated,TouchableOpacity,StyleSheet} from 'react-native'

const animationValue = new Animated.Value(0)

const topBarDegree = animationValue.interpolate({
    inputRange:[0,1],
    outputRange:['0deg','-45deg']
})
const topBarTranslateY = animationValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,6.25]
})
const barTranslateX = animationValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,-2]
})
const bottomBarDegree = animationValue.interpolate({
    inputRange:[0,1],
    outputRange:['0deg','45deg']
})
const bottomBarTranslateY = animationValue.interpolate({
    inputRange:[0,1],
    outputRange:[0,-6.25]
})
const middleBarOpacity = animationValue.interpolate({
    inputRange:[0,1],
    outputRange:[1,0]
})


/**
 * @param {{
 *  active: Boolean, 
 *  onPress: Function,
 *  style: Object
 * }} props
 */

export default (props)=>{
    const animate=()=>{
        if(props.active)return Animated.timing(animationValue,{toValue:1,duration:100}).start()
        return Animated.timing(animationValue,{toValue:0,duration:100}).start()
    }

    useEffect(()=>{animate()},[props.active])

    return (
        <TouchableOpacity onPress={()=>{props.onPress()}} style={[{width:20},props.style]} >
            <Animated.View 
            style={[styles.bar,{
                transform:[
                    {rotate:topBarDegree},
                    {translateY:topBarTranslateY},
                    {translateX:barTranslateX}
                ]
            }]}
            />
            <Animated.View style={[styles.bar,{opacity:middleBarOpacity}]}/>
            <Animated.View style={[styles.bar,{
                transform:[
                    {rotate:bottomBarDegree},
                    {translateY:bottomBarTranslateY},
                    {translateX:barTranslateX}
                ]
            }]}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bar:{
        borderRadius:3,
        width:20,
        height:2,
        backgroundColor:'black',
        marginVertical:2
    }
})