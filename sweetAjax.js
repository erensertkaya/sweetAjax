$.widget( "sa.sweetAjax", {

    // Default options.
    options: {
        autoAlert:false,
        sweetAlert:false,
        sweetAlertOptions:{},
        redirect:false,
        redirectURL: "",
        notShow:{
            error:true,
            success:true,
            parserror:true,
        },
        defaultErrorFields:{
            heading: "heading",
            message: "message",
            type: "type",
        },
        serverError:{
            heading: "Internal Server Error",
            message: "Try again, if it  continues contact with IT team.",
            type: "error",
        }
    },

    _create: function() {
        let data = {
            title:this.options.data.heading,
            text:this.options.data.message,
            icon: this.options.data.type,
        }

        let ajaxOptions = {
            ...data,
            ...this.options,
        }

        // add complete handler if none of the ajax handlers not sent
        if (!Object.keys(ajaxOptions).includes("complete") && !Object.keys(ajaxOptions).includes("success") && !Object.keys(ajaxOptions).includes("error")){
            ajaxOptions.complete = function (){}
        }

        // add additional functionality to ajax handlers with proxy pattern
        if (this.options.autoAlert === true){
            for (option in ajaxOptions){
                if (option === "complete"){
                    let proxiedComplete = ajaxOptions[option]; // Preserving original function
                    ajaxOptions[option] = (jqXHR, textStatus) => {
                        if (this.options.notShow[textStatus] === true){
                            if (jqXHR.responseJSON){
                                this._alert({
                                    title: jqXHR.responseJSON[this.options.defaultErrorFields.heading],
                                    text: jqXHR.responseJSON[this.options.defaultErrorFields.message],
                                    icon: jqXHR.responseJSON[this.options.defaultErrorFields.type],
                                },jqXHR.status);
                            }
                            else{
                                this._alert({
                                    title: this.options.serverError[this.options.defaultErrorFields.heading],
                                    text: this.options.serverError[this.options.defaultErrorFields.message],
                                    icon: this.options.serverError[this.options.defaultErrorFields.type],
                                },jqXHR.status);
                            }
                        }
                        return proxiedComplete.apply(this, arguments);
                    }

                }
                if (option === "success"){
                    let proxiedSuccess = ajaxOptions[option]; // Preserving original function
                    ajaxOptions[option] = (data,textStatus,jqXHR) => {
                            this._alert({
                                title: jqXHR.responseJSON[this.options.defaultErrorFields.heading],
                                text: jqXHR.responseJSON[this.options.defaultErrorFields.message],
                                icon: jqXHR.responseJSON[this.options.defaultErrorFields.type],
                            },jqXHR.status);
                        return proxiedSuccess.apply(this, arguments);
                    }

                }
                if (option === "error"){
                    let proxiedError = ajaxOptions[option]; // Preserving original function
                    ajaxOptions[option] = (jqXHR,textStatus,errorThrown ) => {
                            this._alert({
                                title: this.options.serverError[this.options.defaultErrorFields.heading],
                                text: this.options.serverError[this.options.defaultErrorFields.message],
                                icon: this.options.serverError[this.options.defaultErrorFields.type],
                            },jqXHR.status);
                        return proxiedError.apply(this, arguments);
                    }

                }
            }
        }
        this._ajax(ajaxOptions);
    },

    _ajax: function (ajaxOptions){
        let ajax = $.ajax({
            ...ajaxOptions
            }
        )

        //merge ajax prototype with plugin's prototype without cloning, for accessing ajax chain methods from plugin when it's initialized
        this.__proto__ = this._inPlaceMerge(this.__proto__,ajax);
    },

    _alert: function (data, statusCode){
        if (this.options.sweetAlert === true){
            Swal.fire({
                ...data,
                ...this.options.sweetAlertOptions
            }).then((result) => {
                this._trigger("afterSweetAlert",null,result);
                    this._redirect(statusCode);
            })
        }
        if (this.options.sweetAlert === false ){
            alert(`${this._capitalizeFirstLetter(data.icon)}: \n ${data.title} \n ${data.text}`);
            this._redirect(statusCode);
        }
    },

    _redirect: function (statusCode){
        if (statusCode === 401 && this.options.redirect === true){
            window.location.href  = window.location.origin + this.options.redirectURL
        }
    },

    _inPlaceMerge: function(tar, src) {
        let res = tar;
        if (typeof src === "object"  && typeof tar === "object") {
            for (key in src){
                res[key] = this._inPlaceMerge(tar[key], src[key]);
            }
        } else if (src !== undefined) {
            res = src;
        }
        return res;
    },

    _capitalizeFirstLetter: function(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

});