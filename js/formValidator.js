import {dataGetter} from './dataGetter.js';


export const formValidator = function() {
    let data = {};

    function validateInputs(){
        console.log("Validate");
        parseData();
        //Todo: postupnost nie jedobra na zaciatok to staci
        dataGetter.getData(data);
    }

    //Todo: prepisat lepsie to form[0]
    function parseData(){
        let formData =  serializeArray(document.getElementsByTagName('form')[0]);
        data.query = formData[0].value;
    }

    function serializeArray(form) {
        var objects = [];
        if (typeof form == 'object' && form.nodeName.toLowerCase() == "form") {
            var fields = form.getElementsByTagName("input");
            for(var i=0;i<fields.length;i++){
                objects[objects.length] = { name: fields[i].getAttribute("name"), value: fields[i].value };
            }
        }
        return objects;
    }

    return {validateInputs,data};
}();