
Radar Chart for React.js

By Jason Dunn (https://www.github.com/jgddesigns)


Full Example:

    <RadarChart Data={"house": .75, "car": .1, "plane": .3} Title="Radar Chart" Size="3" Color="green"/>


Props Detailed:


    Data (required)

        A json object that specifies a type of data and its percentage value. Can be an already calculated percentage, a tuple containing values needed to calculate a perentage, or a mixture of both. The key value is used as a title for that portion of data on the chart. The length of this object will set the number of points in the chart (3-8 points).

        Examples:

            Data={"house": .75, "car": .1, "plane": .3}

            Data={"house": [3, 4], "car": [1, 10], "plane": [30, 100]}

            Data={"house": .75, "car": [1, 10], "plane": [30, 100]}


    Title (optional)

        A string holding the title of the chart

        Defaults to "Radar Chart"

        Examples:

            Title="Radar Chart"


    Color (optional)

        Hex Value: '#000fff'
            or
        CSS Color: 'green'

        Defaults to gray (#c2c2c2) if no value is passed

        Examples:
            Color="#000fff"

            Color="#a2d4cb"

            Color="green"

            Color="aqua"


    Size (optional)

        Ranges from small to extra large using number values 1-4

        Defaults to 3 (large), 150px X 150px

        Examples:

            Size="1"
                sets chart graphic size to 100px X 100px

            Size="2"
                sets chart graphic size to 200px X 200px

            Size="3"
                sets chart graphic size to 300px X 300px

            Size="4"
                sets chart graphic size to 500px X 500px





