'use client'
import { Button, Checkbox, Radio } from '@nextui-org/react';
import React, {useEffect} from 'react';
import { start } from 'repl';
import {css_colors} from '../etc/colors'


export default function RadarChart (props: any) {
    const [PointsOriginal, setPointsOriginal] = React.useState<any>(null)
    const [PointsAdjusted, setPointsAdjusted] = React.useState<any>(null)
    const [DisplayedRadar, setDisplayedRadar] = React.useState<any>({})
    const [DisplayedStyle, setDisplayedStyle] = React.useState<any>("")
    const [TextValues, setTextValues] = React.useState<any>(["", "", "", "", "", "", "", ""])
    const [PointValue, setPointValue] = React.useState<any>(null)
    const [BackgroundColor, setBackgroundColor] = React.useState<any>("")

    const sizes = ["100px", "200px", "300px", "500px"]

      
    const ending_points = [
        [0, 0],  
        [25, 0], 
        [50, 0],  //
        [75, 0], 
        [100, 0], 
        [87.5, 12.5], 
        [100, 25], 
        [100, 50], //
        [100, 62.5], 
        [100, 75], 
        [100, 100], 
        [75, 100], 
        [50, 100], //
        [25, 100], 
        [0, 62.5], 
        [0, 100], 
        [0, 75], 
        [0, 50], //
        [0, 25], 
        [12.5, 12.5]
    ]


    const points_array: any = {
        "3": [2, 10, 15],
        "4": [0, 4, 10, 15],
        "5": [2, 7, 11, 13, 17],
        "6": [1, 3, 7, 11, 13, 17],
        "7": [2, 5, 8, 11, 13, 14, 19],
        "8": [1, 3, 6, 9, 11, 13, 16, 18]
    }

    const hex_letters = ["a", "b", "c", "d", "e", "f"]

    const start_value = "polygon("

    const end_value = ")"
    

    useEffect(() => {
        is_color() ? setBackgroundColor(props.Color) : setBackgroundColor("#c2c2c2")
        props.Data ? setPointValue(Object.keys(props.Data).length) : null
    }, [])


    useEffect(() => {
        PointValue ? calculate_points(PointValue) : null
    }, [PointValue])


    useEffect(() => {
        PointsOriginal ? adjust_points(props.Data) : null
    }, [PointsOriginal])


    useEffect(() => {
        PointsAdjusted ? build_display() : null
    }, [PointsAdjusted])



    function is_color(){
        if(css_colors.includes(props.Color)){
            console.log("color check confirmed (base color)")
            return true
        }
        if(props.Color && props.Color[0] === "#" && (props.Color.length > 3 && props.Color.length < 8)){
            for(let i=1; i<props.Color.length; i++){
                console.log(i)
                console.log(props.Color[i])
                if(isNaN(props.Color[i])){
                    if(!hex_letters.includes(props.Color[i].toLowerCase())){
                        console.log("letter " + props.Color[i] + " return false")
                        console.log("set to default gray")
                        return false
                    }
                }
                else{
                    if(props.Color[i] > 6){
                        console.log("number " + props.Color[i] + " return false")
                        console.log("set to default gray")
                        return false
                    }
                }
            }
            console.log("color check confirmed (hex color)")
            return true
        }
        console.log("no valid color, defaulting to gray")
        return false
    }


    function build_values(values: any){
        let temp_arr: any = []
        // temp_arr.push([50, 50])
        for(let i=0; i<values.length; i++){
            temp_arr.push(ending_points[values[i]])
        }
        console.log("temp arr")
        console.log(temp_arr)
        setPointsOriginal(temp_arr)
        return temp_arr
    }


    function build_display(){
        let temp_arr = PointsAdjusted
        let temp_display: any = start_value
        let temp_style = ""

        for(let i=0; i<temp_arr.length; i++){
            i != temp_arr.length - 1 ? temp_display = temp_display + temp_arr[i][0].toString() + "% " + temp_arr[i][1].toString() + "%, " : temp_display = temp_display + temp_arr[i][0].toString() + "% " + temp_arr[i][1].toString() + "%" 
        }

        temp_display = temp_display + end_value 

        console.log("temp display")
        console.log(temp_display)

        setDisplayedRadar(temp_display)
        setDisplayedStyle(get_dimensions())
    }


    function get_dimensions(){
        if(!isNaN(props.Size) && props.Size < 5){
            return sizes[props.Size - 1]
        }
        console.log("no valid size, defaulting to 200px X 200px")
        return sizes[2]
    }


    function calculate_points(points: any){
        build_values(points_array[points])
        set_text()
    }


    function get_text(){
        return ["Text 1", "Text 2", "Text 3", "Text 8", "Text", "Text 7", "Text", "Text 4", "Text 3", "Text 5", "Text 6", "Text"]
    }


    function set_text(){
        switch (PointValue){
            case 3:
                setTextValues(["", get_text()[1], "", "", "", get_text()[5], "", get_text()[7], "", "", "", ""])
                break
            case 4:
                setTextValues([get_text()[0], "", get_text()[2], "", "", get_text()[5], "", get_text()[7], "", "", "", ""])
                break
            case 5:
                setTextValues(["", get_text()[1], "", get_text()[3], get_text()[4], get_text()[5],  "", get_text()[7], "", "", "", ""])
                break
            case 6:
                setTextValues([get_text()[0], "", get_text()[2], get_text()[3], get_text()[4], get_text()[5], "", get_text()[7], "", "", "", ""])
                break
            case 7:
                setTextValues([get_text()[0], get_text()[1], get_text()[2], get_text()[3], get_text()[4], get_text()[5],  "", get_text()[7], "", "", "", ""])
                break
            case 8:
                setTextValues([get_text()[0], "", get_text()[2], "", "", get_text()[5], "", get_text()[7], get_text()[8], get_text()[9], get_text()[10], get_text()[11]])
                break
        }
    }


    function adjust_points(values: any){
        let temp_arr: any = PointsOriginal
        console.log(temp_arr)
        for(let i = 0; i < temp_arr.length; i++){
            console.log(temp_arr[i])
            // if(!temp_arr[i].includes(50)){
                temp_arr[i][0] > 1 && temp_arr[i][0] < 50 ? temp_arr[i][0] = temp_arr[i][0] * Math.abs(1+(1-get_percent(values[Object.keys(values)[i]]))) : null

                temp_arr[i][0] > 50 && temp_arr[i][0] < 100 ? temp_arr[i][0] = 50 + (Math.abs(temp_arr[i][0] - 50) * get_percent(values[Object.keys(values)[i]])) : null

                temp_arr[i][0] == 100 ? temp_arr[i][0] = 50 + 50 * get_percent(values[Object.keys(values)[i]]) : null

                temp_arr[i][0] == 0 ? temp_arr[i][0] = 0 + 50 * (1-get_percent(values[Object.keys(values)[i]])) : null


                temp_arr[i][1] > 1 && temp_arr[i][1] < 50 ? temp_arr[i][1] = temp_arr[i][1] * Math.abs(1+(1-get_percent(values[Object.keys(values)[i]]))) : null
                
                temp_arr[i][1] == 100 ? temp_arr[i][1] = 50 + 50 * get_percent(values[Object.keys(values)[i]]) : null

                temp_arr[i][1] == 0 ? console.log(temp_arr[i]) : null

                console.log(ending_points[points_array[PointValue][i]])

                temp_arr[i][1] == 0 ? temp_arr[i][1] = 50 - (50 * get_percent(values[Object.keys(values)[i]])) : null

                
                console.log(temp_arr[i])
            //}
            // else{
            //     if(temp_arr[i][0] == 50){
            //         temp_arr[i][1] == 0 ? temp_arr[i][1]  = temp_arr[i][1] + (100 *(1-get_percent(values[Object.keys(values)[i]]))) : temp_arr[i][1] = temp_arr[i][1] * get_percent(values[Object.keys(values)[i]]) 
            //     }else{
            //         temp_arr[i][0] == 0 ? temp_arr[i][0] = temp_arr[i][0] + (100 *(1-get_percent(values[Object.keys(values)[i]]))) : temp_arr[i][0] = temp_arr[i][0] * get_percent(values[Object.keys(values)[i]]) 
            //     }
            // }


            // temp_arr[i][1] = temp_arr[i][1] + (100 *(1-get_percent(values[Object.keys(values)[i]]))) 
        }
        // temp_arr.unshift([50,50])
        // temp_arr = [[50, 40], [60,60], [15,70]]
        console.log(temp_arr)

        setPointsAdjusted(temp_arr)
    }


    function get_percent(values: any){
        console.log("values")
        console.log(values)
        if(!isNaN(values[0])){
            console.log("getting value percentage")
            console.log(values[0]/values[1])
            return values[0]/values[1]
        }
        console.log("value percentage already calculated")
        console.log(values)
        return values
    }


    return(
        <div>

            <div className="w-full h-full grid grid-auto-rows grid-auto-cols place-items-center">
                <div className="mb-12 text-3xl">
                    {props.Title}
                </div>
                <div className="mb-48 text-2xl italic">
                    {Object.keys(props.Data).length} Points of Data
                </div>
                <div className="grid grid-flow-col gap-48">
                    <span>
                        {TextValues[0]}                     
                    </span>
                    <span>
                        {TextValues[1]} 
                    </span>
                    <span>
                        {TextValues[2]} 
                    </span>
                </div>
                <div className="grid grid-flow-col place-items-center gap-96">
                    <span>
                        {TextValues[8]}                     
                    </span>
                    <div className="w-48">
                        
                    </div>              
                    <span>
                        {TextValues[9]} 
                    </span>
                </div>
                <div className="grid grid-flow-col place-items-center gap-96">
                    <div>
                        {TextValues[3]} 
                    </div>
                    {DisplayedStyle ? 
                        <div style={{clipPath: DisplayedRadar, backgroundColor: BackgroundColor, width: get_dimensions(), height: get_dimensions()}}/> 
                    : null}
                    <div>
                        {TextValues[4]} 
                    </div>
                </div>
                <div className="grid grid-flow-col place-items-center gap-96">
                    <span>
                        {TextValues[10]}                     
                    </span>
                    <div className="w-48">
                        
                    </div>
                    <span>
                        {TextValues[11]} 
                    </span>
                </div>
                <div className="grid grid-flow-col gap-48">
                    <span>
                        {TextValues[5]} 
                    </span>
                    <span>
                        {TextValues[6]} 
                    </span>
                    <span>
                        {TextValues[7]} 
                    </span>
                </div>
            </div>
        </div>
    )
}


