'use client'
import React, {useEffect} from 'react';
import {css_colors} from './etc/colors'
import styles from './RadarChart.module.css'

export default function RadarChart (props: any ) {
    const [PointsOriginal, setPointsOriginal] = React.useState<any>(null)
    const [PointsAdjusted, setPointsAdjusted] = React.useState<any>(null)
    const [DisplayedRadar, setDisplayedRadar] = React.useState<any>({})
    const [DisplayedStyle, setDisplayedStyle] = React.useState<any>("")
    const [TextValues, setTextValues] = React.useState<any>(["", "", "", "", "", "", "", ""])
    const [PercentValues, setPercentValues] = React.useState<any>(["", "", "", "", "", "", "", ""])
    const [PointValue, setPointValue] = React.useState<any>(null)
    const [BackgroundColor, setBackgroundColor] = React.useState<any>("")



    const sizes = ["100px", "200px", "300px", "500px"]

    const ending_points = [
        [0, 0],  
        [25, 0], 
        [50, 0],  
        [75, 0], 
        [100, 0], 
        [87.5, 12.5], 
        [100, 25], 
        [100, 50], 
        [100, 62.5], 
        [100, 75], 
        [100, 100], 
        [75, 100], 
        [50, 100], 
        [25, 100], 
        [0, 62.5], 
        [0, 100], 
        [0, 75], 
        [0, 50], 
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
                    if(props.Color[i] > 9){
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

        for(let i=0; i<values.length; i++){
            temp_arr.push(ending_points[values[i]])
        }

        setPointsOriginal(temp_arr)
        return temp_arr
    }


    function build_display(){
        let temp_arr = PointsAdjusted
        let temp_display: any = start_value

        for(let i=0; i<temp_arr.length; i++){
            i != temp_arr.length - 1 ? temp_display = temp_display + temp_arr[i][0].toString() + "% " + temp_arr[i][1].toString() + "%, " : temp_display = temp_display + temp_arr[i][0].toString() + "% " + temp_arr[i][1].toString() + "%" 
        }

        temp_display = temp_display + end_value 

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


    function get_text(place: any){
        return Object.keys(props.Data)[place-1]
    }


    function get_value(place: any){
        let value = Math.round(get_percent(props.Data[Object.keys(props.Data)[place-1]]) * 100) + "%"
        console.log(value)

        return value
    }


    function set_text(){
        switch (PointValue){
            case 3:
                setTextValues(["", get_text(1), "", "", "", "", get_text(2), "", get_text(3), "", "", ""])
                setPercentValues(["", get_value(1), "", "", "", "", get_value(2), "", get_value(3), "", "", ""])
                break
            case 4:
                setTextValues([get_text(1), "", get_text(2), "", "", "", get_text(3), "", get_text(4), "", "", ""])
                setPercentValues([get_value(1), "", get_value(2), "", "", "", get_value(3), "", get_value(4), "", "", ""])
                break
            case 5:
                setTextValues(["", get_text(1), "", "", get_text(2), "", get_text(3), "", get_text(4), "", get_text(5), ""])
                setPercentValues(["", get_value(1), "", "", get_value(2), "", get_value(3), "", get_value(4), "", get_value(5), ""])
                break
            case 6:
                setTextValues([get_text(1), "", get_text(2), "", get_text(3), "", get_text(4), "", get_text(5), "", get_text(6), ""])
                setPercentValues([get_value(1), "", get_value(2), "", get_value(3), "", get_value(4), "", get_value(5), "", get_value(6), ""])
                break
            case 7:
                setTextValues([get_text(1), get_text(2), get_text(3), "", get_text(4), "",  get_text(5), "", get_text(6), "", get_text(7 ), ""])
                setPercentValues([get_value(1), get_value(2), get_value(3), "", get_value(4), "",  get_value(5), "", get_value(6), "", get_value(7 ), ""])
                break
            case 8:
                setTextValues([get_text(1), "", get_text(2), get_text(3), "", get_text(4), get_text(5), "", get_text(6), get_text(7), "", get_text(8)])
                setPercentValues([get_value(1), "", get_value(2), get_value(3), "", get_value(4), get_value(5), "", get_value(6), get_value(7), "", get_value(8)])
                break
        }
    }


    function adjust_points(values: any){
        let temp_arr: any = PointsOriginal
        console.log(temp_arr)
        for(let i = 0; i < temp_arr.length; i++){
            temp_arr[i][0] > 1 && temp_arr[i][0] < 50 ? temp_arr[i][0] = temp_arr[i][0] * Math.abs(1+(1-get_percent(values[Object.keys(values)[i]]))) : null

            temp_arr[i][0] > 50 && temp_arr[i][0] < 100 ? temp_arr[i][0] = 50 + (Math.abs(temp_arr[i][0] - 50) * get_percent(values[Object.keys(values)[i]])) : null

            temp_arr[i][0] == 100 ? temp_arr[i][0] = 50 + 50 * get_percent(values[Object.keys(values)[i]]) : null

            temp_arr[i][0] == 0 ? temp_arr[i][0] = 0 + 50 * (1-get_percent(values[Object.keys(values)[i]])) : null


            temp_arr[i][1] > 1 && temp_arr[i][1] < 50 ? temp_arr[i][1] = temp_arr[i][1] * Math.abs(1+(1-get_percent(values[Object.keys(values)[i]]))) : null
            
            temp_arr[i][1] == 100 ? temp_arr[i][1] = 50 + 50 * get_percent(values[Object.keys(values)[i]]) : null

            temp_arr[i][1] == 0 ? temp_arr[i][1] = 50 - (50 * get_percent(values[Object.keys(values)[i]])) : null
        }

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
            <div className={styles.container}>
                <div className={styles.header}>
                  <div className={styles.title}>
                      {props.Title ? props.Title : "Radar Chart"}
                  </div>
                  {!props.Data ?
                    <div className={styles.subtitle} style={{ whiteSpace: "pre-line" }}>
                        "No Data Initialized. \n\nEnsure that a prop called 'Data' is passed and it contains a json object." 
                    </div>
                  : null} 
                </div>
                <div className={styles.row_container}>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[0]}                     
                        </span>
                        <span>
                            {PercentValues[0]}
                        </span>
                    </div>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[1]}                     
                        </span>
                        <span>
                            {PercentValues[1]}
                        </span>
                    </div>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[2]}                     
                        </span>
                        <span>
                            {PercentValues[2]}
                        </span>
                    </div>       
                </div>
                <div className={styles.secondary_row}>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[11]}                     
                        </span>
                        <span>
                            {PercentValues[11]}
                        </span>
                    </div>
                    <div className={styles.filler_row}>
                        
                    </div>              
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[3]}                     
                        </span>
                        <span>
                            {PercentValues[3]}
                        </span>
                    </div>
                </div>
                <div className={styles.main_row}>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[10]}                     
                        </span>
                        <span>
                            {PercentValues[10]}
                        </span>
                    </div>
                    {DisplayedStyle ? 
                        <div style={{clipPath: DisplayedRadar, backgroundColor: BackgroundColor, width: get_dimensions(), height: get_dimensions()}}/> 
                    : null}
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[4]}                     
                        </span>
                        <span>
                            {PercentValues[4]}
                        </span>
                    </div>
                </div>
                <div className={styles.secondary_row}>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[9]}                     
                        </span>
                        <span>
                            {PercentValues[9]}
                        </span>
                    </div>
                    <div className={styles.filler_row}>
                        
                    </div>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[5]}                     
                        </span>
                        <span>
                            {PercentValues[5]}
                        </span>
                    </div>
                </div>
                <div className={styles.row_container}>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[8]}                     
                        </span>
                        <span>
                            {PercentValues[8]}
                        </span>
                    </div>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[7]}                     
                        </span>
                        <span>
                            {PercentValues[7]}
                        </span>
                    </div>
                    <div className={styles.column_container}>
                        <span className={styles.attribute_text}>
                            {TextValues[6]}                     
                        </span>
                        <span>
                            {PercentValues[6]}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


