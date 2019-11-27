export const formValidator = function() {

    /**
     * Validate form inputs
     * @param form
     */
    function validateInputs(form){
        let data = parseData(form);
        if(data.query === ""){
            return false;
        }

        return data;
    }

    /**
     * Parse form data
     * @param form
     */
    function parseData(form){
        let formData =  serializeArray(form)[0];
        let data ={};
        data.query = formData.value;

        return data;
    }

    /**
     *
     * @param forms
     * @returns {[]}
     */
    function serializeArray(forms) {
        var objects = [];
        if (typeof forms == 'object' && forms.nodeName.toLowerCase() == "form") {
            var fields = forms.getElementsByTagName("input");
            for(var i=0;i<fields.length;i++){
                objects[objects.length] = { name: fields[i].getAttribute("name"), value: fields[i].value };
            }
        }
        return objects;
    }

    return {validateInputs};
}();