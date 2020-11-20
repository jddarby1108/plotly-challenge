//If using python server, visit here to see data: http://localhost:8000/data/data.json
var metaData = [];
var samples = [];
var sampleId = [];
var sampleValues = [];

console.log('test');
d3.json("data/samples.json").then((data) => {
    console.log(data);

    var selector = d3.select('#selDataset')
    var names = data.names;
    names.forEach(sample => {
        selector.append('option')
            .text(sample)
            .property('value', sample)
    })


    samples = data.samples;
    metaData = data.metadata;
    var id = metaData.id;
    console.log(names);
    console.log(metaData);
    console.log(samples);
    console.log(id);
});



function optionChanged(selectedID) {
    console.log(selectedID);
    // Declare MetaData Object variable and filter to matching id array from option
    var metaDataSelector = metaData.filter(oneMeta => oneMeta.id === parseInt(selectedID))[0];
    console.log(metaDataSelector);
    //Declare Sample Object variable and filter to matching id array from option
    var sampleSelector = samples.filter(sample => sample.id === (selectedID))[0];
    console.log(sampleSelector);
    //select html panel element 
    var panel = d3.select("#panel-info")
    // remove any data from the table
    panel.html("");

    // Declare list variable for appending array data to panel element
    var list = panel.append('ul')
    Object.entries(metaDataSelector).forEach(([key, value]) => {
        console.log(key, value);
        list.append('li')
            .text(`${key}: ${value}`);
        console.log(key, value);
    });

    //iterate through sample data to return matching sample id and value data for bar chart

    // Sort the data
    var sortSample = sampleSelector.sample_values.sort((a, b) => b.sample_values - a.sample_values);
    // Slice the first 10 objects for plotting
    sliceSample = sortSample.slice(0, 10);
    // Reverse the array to accommodate Plotly's defaults
    reversedData = sliceSample.reverse();
    console.log(reversedData);
    

    

    // Trace1 for the Greek Data
    var trace1 = {
        x: reversedData.sample_values,
        y: reversedData.otu_labels,
        text: reversedData.otu_labels,
        name: "Sample Data",
        type: "bar",
        orientation: "h"
    };
    // data
    var data = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
        title: "Belly Button Sample Data for Selected ID",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data, layout);
};