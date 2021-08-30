# Plotly-Challenge
This is the 12th homework from the coding boot camp course.
This time I will build an interactive-dashboards about belly button biodiversity on numbers of test samples. This invovles: 
1. using D3 lib to read json file
2. using provided index.html file to set up dropdown menu options
3. updated bar plots, demographic information, bubble charts and gauge chart using Plotly with selected sample id

The published github page is here: https://thgiliwt.github.io/Plotly-Challenge/

## Key Reflects

### New Findings
Designing a webpage or a html file is getting more and more less-hard-coded. It was a big step forward when it is campared to previous Web lessons. I firstly started to set up only one data sample to under the layout of what I should do and then alter my codes to make it link to selected data samples.
As stated above, there are 3 major areas invovles within this task.
1. using D3 lib to read data
   Data files are complicated as it has a combination of arrays and json objects. It is very important to know what the data is like and for instance, how to targeting to required information. One of the error I have encountered during trails is that for the initial function, I selected '940' as the id number so I have got an array with one json-object. When referencing to any key name of this single array, I needed to add '[0]' at the end of the array name as there is only 1 item in this array. Without it will returing an error message.
   It is also suggested to use 'https://codebeautify.org/jsonviewer' to get a better view of the data, and on top of that, I also hand-written a basic layout of what was stored within each layer within this data.

2. setting up dropdown menu options
   This is a simple application of d3, to append new items under the selected tag. Similar to what we added as <table> attributes of last homework (10th).

3. plottings
  3.1 bar plot
      I was a bit lost when sorting the data based on the sample_values. The variables of 'a' and 'b' which I used to reference were linked to the sample_values itself, so when I need to reference to the corresponded otu_id, otu_labels, it was not working (providing irresponded information based on selected sample_values). When sorting the values, it should have sorted any other corresponded information (keys within the same json-object). In order to do this, I should have apply the sort to the upper level, where use 'a.<key>' and 'b.<key>' to set the sorting method.
  3.2 demographic info
      This is same as 1, where used Object.entries to split the original data into each key and value pairs as [[key1,value1],[key2,value2],...].
  3.3 bubble plot
      The sample id of 943 is tricky where the sample_value is 2. It is too small to be displayed on the plot so, from the Plotly website, I applied the auto-adjusted size of marker of one of the attributes within 'marker' as 'sizeref'. The formula is 'sizeref: 2.0 * Math.max(...size) / (<desired_maximum_marker_size>**2)' where I need to specify the variable of <desired_maximum_marker_size> to an integer. Originally, if the value of sizeref is greater than 1, then the more the value, the less the marker size, if the value is less than one then, the less the value, the more the marker size.
  3.4 gauge plot
      Again, this is basically a straight application of the codes from Plotly where I need to change the 'range' values, 'nticks' value and value( to link to my dataset). 

### Uncertainties
1. Plotly.restyle()
  I was intended to use the onchange function to update plots' data using Plotly.restyle() but it didn't work
2. Structure of codes
  As the above is failed so I bascially copy and paste the init() with the updates of pre-selected sample id. Somehow I felt like I was repeating the work.
3. Further more
  As the above two were not accomplished, I used Plotly.newPlot() within the onchange function for each plots and it worked. During the class our instructor has showed us what would happen if not using .restyle() but using .newPlot(). 
