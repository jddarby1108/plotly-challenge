// If using python server, visit here to see data: http://localhost:8000/data/data.json
var metaData = [];

console.log('test');
d3.json("data/samples.json").then((data) => {
    console.log(data);

    var selector = d3.select('#selDataset')
    var names = data.names;
    /*     for (var i =0; i<names.length; i++){
            selector.append('option').text(names[i])
        }; */
    names.forEach(sample => {
        selector.append('option')
            .text(sample)
            .property('value', sample)
    })


    var samples = data.samples;
    metaData = data.metadata;
    var id = metaData.id;
    console.log(names);
    console.log(metaData);
    console.log(samples);
});

function optionChanged(selectedID) {
    console.log(selectedID);
    var metaDataSelector = metaData.filter(oneMeta => oneMeta.id === parseInt(selectedID))[0];
    console.log(metaDataSelector);
    Object.entries(metaDataSelector).forEach(([key, value]) => {
        console.log(key, value);
        var panel = d3.select("#panel-info");
        panel.append('tr')
            .text(`${key}: ${value}`);
    });
};

/* function callbackFun(){

}

metaData.map(oneEle=>{
    //instructions
    return oneEle.otuid
})

metaData.map(oneEle=>callbackFunc(oneElem))
metaData.map(callbackFunc) */
// [{id: '940', otuid: '123'}, {id: '941', otuid: '123'}]