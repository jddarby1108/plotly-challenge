//If using python server, visit here to see data: http://localhost:8000/data/data.json
var metaData = [];
var samples = [];
var sampleId = [];
var sampleValues = [];

// console.log('test');
d3.json("data/samples.json").then((data) => {
    // console.log(data);

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
    // console.log(names);
    // console.log(metaData);
    // console.log(samples);
});



function optionChanged(selectedID) {
    // console.log(selectedID);
    // Declare MetaData Object variable and filter to matching id array from option
    var metaDataSelector = metaData.filter(oneMeta => oneMeta.id === parseInt(selectedID))[0];
    // console.log(metaDataSelector);
    //Declare Sample Object variable and filter to matching id array from option
    var sampleSelector = samples.filter(sample => sample.id === (selectedID));
    // console.log(sampleSelector);


    //select html panel element 
    var panel = d3.select("#panel-info")
    // remove any data from the table
    panel.html("");

    // Declare list variable for appending array data to panel element
    var list = panel.append('ul').attr('class', 'list-group list-group-flush')
    Object.entries(metaDataSelector).forEach(([key, value]) => {
        list.append('li').attr('class', 'list-group-item')
            .html(`<strong>${key}</strong>: ${value}`);
        // console.log(key, value);
    });

    //iterate through sample data to return matching sample id and value data for bar chart

    // Sort the data
    var sortSample = sampleSelector.sort((a, b) => b.sample_values - a.sample_values);
    // console.log(sortSample);
    // Slice the first 10 objects for plotting
    SampleValues = sortSample[0].sample_values;
    SampleIds = sortSample[0].otu_ids;
    SampleLabels = sortSample[0].otu_labels;
    console.log(sortSample);

    sliceValues = SampleValues.slice(0, 10).reverse();
    sliceIds = SampleIds.slice(0, 10).reverse();
    sliceLabels = SampleLabels.slice(0, 10).reverse();
    console.log(sliceSampleValues);


    // Trace1 for the Belly Button Data
    var trace1 = {
        x: sliceValues,
        y: sliceIds.map(d => `OTU Id: ${d}`),
        text: sliceLabels,
        name: "Belly Button Data",
        type: "bar",
        orientation: "h"
    };
    // data
    var sliceSampleValues = [trace1];

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
// Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bar", sliceSampleValues, layout);

    var trace1 = {
        x: SampleValues,
        y: SampleIds,
        mode: 'markers',
        marker: {
            size: SampleValues
        }
    };

    var SampleValues = [trace1];

    var layout = {
        title: 'Marker Size',
        showlegend: true,
        height: 600,
        width: 600
    };

    // Render the plot to the div tag with id "bubble"
     Plotly.newPlot('bubble', SampleValues, layout);
};