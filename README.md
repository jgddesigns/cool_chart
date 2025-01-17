EZ Radar Chart for React.js

By Jason Dunn (https://www.github.com/jgddesigns)

A simple Radar Chart component for use with React.js and Next.js. Customize size, color and points of data. Works for 3 to 8 attributes.


![003](https://github.com/user-attachments/assets/173665d3-1689-436b-913f-1abc3f4e50af)
![002](https://github.com/user-attachments/assets/875aa8db-692d-4aff-9ba9-f6cc190c7a2d)
![001](https://github.com/user-attachments/assets/48875049-cedd-4e42-9be0-f66333a5690e)



Getting Started:

    From Terminal 
        npm install ez-radar-chart

    Import Line
        import RadarChart from 'ez-radar-chart'



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





MIT License

Copyright (c) 2025 Jason Dunn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
