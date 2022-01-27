# sweetAjax
A jQuery plugin for make your ajax request's error and success messages auto handled.

# Installation
sweetAjax plugin has built on jQuery-ui widget factory so after adding jQuery to your html
file you also need to add library called jQuery-ui. sweetAjax uses sweetAlert2 for handling
error and success messages so also you need to add sweetAlert2 too.

# Dependencies
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js" integrity="sha512-AA1Bzp5Q0K1KanKKmvN/4d3IRKVlv9PYgwFPvm32nPO6QS8yH1HO7LbgB1pgiOxPtfeg5zEn2ba64MUcqJx6CA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

# Simple Usage

```javascript
 $.sa.sweetAjax({
    url: "/order/count/deneme",
    type: "POST",
    dataType: "json",
    data: {deneme:"deneme"},
    autoAlert:true,
    redirect: true,
    redirectURL:"/login"
});
```
---

sweetAjax can get every option $.ajax can it's actually work as wrapper built on 
$.ajax, also you can use chainable methods like done, error which comes from $.ajax
prototype. Top on that sweetAlert comes with 3 additional options;

> * autoAlert: If this option set as true it means that all types of messages
    (success,error,parserror) will show as native browser alert on page which ajax invoked.

> * redirect: If this option set as true it means that if your response has status code of 401
it's gonna redirect to login page you determined in **redirectUrl** paramater.

> * redirectURL: Set your login page url if you were set redirect option as true. (You don't need to add
     your full url plugin itself will add your domain.)

# Other Options

> * sweetAlert: If it's not set or set as false, plugin will show messages on native alert which browser's 
    api provided.

> * sweetAlertOptions: It can get what sweetAlert2 plugin can get as an object.

> * notShow: If you want to prevent one of them (success,error,parserror) you can set as key in an object
and set as false.
```javascript
notShow:{
    success:false,
}
```

> * defaultErrorFields: sweetAjax accepts 3 default parameter from your json responses, you can override their
keys with this option if you want to sent messages with different keys.
```javascript
defaultErrorFields:{
    heading: "heading",
    message: "message",
    type: "type",
}
```

> * serverError: sweetAjax has default error messages for problems caused by server, you can override that
with this option. (That default messages doesn't valid for every 500 status code error, sweetAjax
    accepts parserrors as serverError for instance it can caused by syntax error from your backend code.)
```javascript
serverError:{
    heading: "Internal Server Error",
    message: "Try again, if it  continues contact with IT team.",
    type: "error",
}
```

# Callbacks
> * afterSweetAlert: As name tells itself, it's triggered after sweetAlert invoked. It's exactly same
with ``` Swal.fire().then(() => {}) ```



    