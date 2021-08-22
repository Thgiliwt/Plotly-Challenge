//adding option tags within dropdown lists
d3.json("data/samples.json").then(function(biodata){
    
    console.log(biodata)

    for (var i=0;i<biodata.names.length;i++){
        var options = d3.select("#selDataset").append("option")
        var option_value = options.property("value",biodata.names[i])
        options.text(biodata.names[i])
    }
})

function init(){
    d3.json("data/samples.json").then(function(biodata){
        //1.bar chart
        //set bar variables
        var init_dataset = biodata.samples.filter(row=>row.id == "940").sort((a,b)=>b.sample_values-a.sample_values)
        console.log(init_dataset)
        //bar plot
        var trace_bar = {
            x: init_dataset[0].sample_values.slice(0,10).reverse(),
            y: init_dataset[0].otu_ids.map(id=>`Otu${id}`).slice(0,10).reverse(),
            text: init_dataset[0].otu_labels.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
        }
        var data_bar = [trace_bar]
        var layout_bar = {
            title: "Top 10 Bacteria Cultures Found"
        }
        Plotly.newPlot('bar',data_bar,layout_bar)

        //2.demographic info
        //set demographic variables
        var init_info = biodata.metadata.filter(row=>row.id == "940")
        console.log(init_info)
    
        var init_info_area = d3.select("#sample-metadata")

        init_info.forEach(info=>{
            Object.entries(info).forEach(([key,value])=>{
                init_info_area.append("p").text(`${key}:${value}`)
            })
        })
        
        //3.bubble chart
        //set bubble variables
        var init_dataset2 = biodata.samples.filter(row=>row.id == "940")
        var size = init_dataset2[0].sample_values
        var desired_maximum_marker_size = 75
        //bubble plot
        var trace_bubble = {
            x: init_dataset2[0].otu_ids,
            y: init_dataset2[0].sample_values,
            text: init_dataset2[0].otu_labels,
            mode:"markers",
            marker:{
                color: init_dataset2[0].otu_ids,
                size: size,
                sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),
                sizemode: 'area'
            }
        }
        var data_bubble = [trace_bubble]
        var layout_bubble = {
            title: "Bubble Chart of Selected Test Subject ID No.",
            xaxis:{
                title:"OTU ID"
            },
            yaxis:{
                title:"Sample Values"
            }
        }
        Plotly.newPlot('bubble',data_bubble,layout_bubble)

        //4.gauge chart
        //set gauge variables
        //(same as demographic info, i.e. init_info)
        //gauge plot
        
        var data_gauge = [
            {
              type: "indicator",
              mode: "gauge+number",
              value: init_info[0].wfreq,
              title: { text: "Scrubs Per Week", font: { size: 24, color: "#999999" } },
              
              gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "#000000", nticks:10 },
                bar: { color: "#ff0000" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 1], color: "#ffffff" },
                  { range: [1, 2], color: "#ccfff2" },
                  { range: [2, 3], color: "#99ffe6" },
                  { range: [3, 4], color: "#66ffd9" },
                  { range: [4, 5], color: "#33ffcc" },
                  { range: [5, 6], color: "#00e6ac" },
                  { range: [6, 7], color: "#00cc99" },
                  { range: [7, 8], color: "#009973" },
                  { range: [8, 9], color: "#00664d" },
                ],
                threshold: {
                  line: { color: "#660066", width: 10 },
                  thickness: 5,
                  value: init_info[0].wfreq
                }
              }
            }
        ];
        var layout_gauge = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "white",
            font: { color: "darkblue", family: "Arial" }
        };          
        Plotly.newPlot('gauge', data_gauge,layout_gauge);
    })    
}

init()

d3.selectAll("#selDataset").on("change",optionChanged)

function optionChanged(){
    //define var of selected
    var dropdownMenu = d3.select("#selDataset")
    var dataset = dropdownMenu.property("value")

    d3.json("data/samples.json").then(function(biodata){
        //1.bar chart
        //set bar variables
        var option_dataset = biodata.samples.filter(row=>row.id == dataset).sort((a,b)=>b.sample_values-a.sample_values)
        
        //bar plot
        var trace_bar = {
            x: option_dataset[0].sample_values.slice(0,10).reverse(),
            y: option_dataset[0].otu_ids.map(id=>`Otu${id}`).slice(0,10).reverse(),
            text: option_dataset[0].otu_labels.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
        }
        var data_bar = [trace_bar]
        var layout_bar = {
            title: "Top 10 Bacteria Cultures Found"
        }
        Plotly.newPlot('bar',data_bar,layout_bar)

        //2.demographic info
        //set demographic variables
        var option_info = biodata.metadata.filter(row=>row.id == dataset)
    
        var option_info_area = d3.select("#sample-metadata")
        option_info_area.html("") //clear any exsiting output
        option_info.forEach(info=>{
            Object.entries(info).forEach(([key,value])=>{
                option_info_area.append("p").text(`${key}:${value}`)
            })
        })
        
        //3.bubble chart
        //set bubble variables
        var option_dataset2 = biodata.samples.filter(row=>row.id == dataset)
        var size = option_dataset2[0].sample_values
        var desired_maximum_marker_size = 75
        //bubble plot
        var trace_bubble = {
            x: option_dataset2[0].otu_ids,
            y: option_dataset2[0].sample_values,
            text: option_dataset2[0].otu_labels,
            mode:"markers",
            marker:{
                color: option_dataset2[0].otu_ids,
                size: size,
                sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),
                sizemode: 'area'
            }
        }
        var data_bubble = [trace_bubble]
        var layout_bubble = {
            title: "Bubble Chart of Selected Test Subject ID No.",
            xaxis:{
                title:"OTU ID"
            },
            yaxis:{
                title:"Sample Values"
            }
        }
        Plotly.newPlot('bubble',data_bubble,layout_bubble)
        //4.gauge chart
        //set gauge variables
        //(same as demographic info, i.e. init_info)
        //gauge plot
        
        var data_gauge = [
            {
              type: "indicator",
              mode: "gauge+number",
              value: option_info[0].wfreq,
              title: { text: "Scrubs Per Week", font: { size: 24, color: "#999999" } },
              
              gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "#000000", nticks:10 },
                bar: { color: "#ff0000" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 1], color: "#ffffff" },
                  { range: [1, 2], color: "#ccfff2" },
                  { range: [2, 3], color: "#99ffe6" },
                  { range: [3, 4], color: "#66ffd9" },
                  { range: [4, 5], color: "#33ffcc" },
                  { range: [5, 6], color: "#00e6ac" },
                  { range: [6, 7], color: "#00cc99" },
                  { range: [7, 8], color: "#009973" },
                  { range: [8, 9], color: "#00664d" },
                ],
                threshold: {
                  line: { color: "#660066", width: 10 },
                  thickness: 5,
                  value: option_info[0].wfreq
                }
              }
            }
        ];
        var layout_gauge = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "white",
            font: { color: "darkblue", family: "Arial" }
        };          
        Plotly.newPlot('gauge', data_gauge,layout_gauge)
    })    
}


    
    