(function () {
    'use strict';

    angular
        .module('authenticatejs')
        .factory('authenticateSrvc', authenticateSrvc);

        authenticateSrvc.$inject = [
            'credentialsSrvc'
        ];

    function authenticateSrvc(

        credentialsSrvc
    ) {

        var service = {
            
        };


        var GRACE_MS = 100000; // milliseconds to get stuff done before access token expires. 



        function doGetPrimaryToken(fnSuccess, fnFail){

            var url =         
            credentialsSrvc.authServiceUri +
            "?client_id=" + credentialsSrvc.clientId +
            "&scope=" + encodeURIComponent(credentialsSrvc.scopes) +
            "&response_type=code" +
            "&redirect_uri=" + encodeURIComponent(credentialsSrvc.redirectUri);

            // Extracts the auth token from URL:
            // format: "http://localhost/callback.html#access_token=eyJ0eXAiOiJKV1QiLCJub25jZSI6Ik4tLVc4dkhrXzRVb0licWJQMkdVVnhCNzNXd09yS1VYekNrNUhfTWxRU1kiLCJhbGciOiJSUzI1NiIsIng1dCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyIsImtpZCI6ImFQY3R3X29kdlJPb0VOZzNWb09sSWgydGlFcyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yODNmZmI1MC1hMzBiLTQ4OGMtOTBmNC1jZGFlNGY3YWU2ZDEvIiwiaWF0IjoxNTcyOTc1MTU5LCJuYmYiOjE1NzI5NzUxNTksImV4cCI6MTU3Mjk3OTA1OSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhOQUFBQU12L0RnLzRXWkdmK2tlRzFIbXFhaVp1ekxHQ0krNmZFekkzQm5wK0tKRWM9IiwiYW1yIjpbInB3ZCJdLCJhcHBfZGlzcGxheW5hbWUiOiJUaW1lU2VyaWVzRGF0YUNhcHR1cmVfRGV2IiwiYXBwaWQiOiJkYWJjMDY0MS0xNGI5LTRjNWYtODk1Ni03MzY5M2JiYzM4MjEiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IkNvb3BlciIsImdpdmVuX25hbWUiOiJMYXVyaWUiLCJpcGFkZHIiOiI4Ni4xODcuMTY0LjY2IiwibmFtZSI6IkxhdXJpZSBDb29wZXIiLCJvaWQiOiIyYjM3OGY3Ny01ZTQ3LTRlZTgtYWZjYi1iNWY4YWE2MDBiYzQiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzc1MjIzMTU0NC0xODA1NjM2MzUxLTQyNjIyMTYwMzgtMjkzOTYxIiwicGxhdGYiOiIxIiwicHVpZCI6IjEwMDM3RkZFOTBBODc1RjciLCJzY3AiOiJTaXRlcy5SZWFkLkFsbCBwcm9maWxlIG9wZW5pZCBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6ImdITWtJVUVVLXMtOTFXWHg5aFgyQjZyeDZ5NnBPM0RDRnJpR3ZLQVUxNkkiLCJ0aWQiOiIyODNmZmI1MC1hMzBiLTQ4OGMtOTBmNC1jZGFlNGY3YWU2ZDEiLCJ1bmlxdWVfbmFtZSI6IjU1MTE4ODM2QGFkLm1tdS5hYy51ayIsInVwbiI6IjU1MTE4ODM2QGFkLm1tdS5hYy51ayIsInV0aSI6Ik1IUll1NWk5WGtTRGd6Sl9NUTV1QUEiLCJ2ZXIiOiIxLjAiLCJ4bXNfc3QiOnsic3ViIjoiU01na05VYk5SNlgza2hEVEQ3aDFER1d6MzVuR0pRWGVmam4wek95cllXWSJ9LCJ4bXNfdGNkdCI6MTM2MTM5ODM0OX0.HyPofut3AR1TnV73o7meQ0yRjTVlfVxII3QRm9EBxGei6qmEHwBUZELbMqdhpcxo4V4ra8VqZ_eV-372U1MC7sBuzw-BFvhbLO-Jy1I-hTXD6Ja8bwPx7w2yjeLzpo0o4jx_X4biBSKrP9RD6ZawtyOcGu3GoS0zTlL7bxMli_VWMJ_38mu6XBzuGem8r0zoQi5eLEiwe0TM7pq09Jj0xf6TYZXWUd5t9CH1jtELlDaFOPYSr1PbgfK8eW8mh7Zh-Hg-B6waqHbjRcyFn-uTUEVRKkRDT7uba4OPTwAPCnkXoKn7ALPbacbh9eUhK294ojmcXWMsn8NtG5VraXtn8g&token_type=Bearer&expires_in=3599&scope=Sites.Read.All+profile+openid+email&session_state=4d30866d-665e-43aa-ac7b-707e23be3110"
            function getAuthInfoFromUrl(url) {
                var authResponse = url.split("?")[1];
                var toJson = '{"' + authResponse.replace(/&/g, '","').replace(/=/g, '":"') + '"}';
                var authInfo = JSON.parse(
                    toJson,
                    function (key, value) { return key === "" ? value : decodeURIComponent(value); });
            
                return authInfo;
            }

            
            function popup(url) {
                var width = 525,
                    height = 525,
                    screenX = window.screenX,
                    screenY = window.screenY,
                    outerWidth = window.outerWidth,
                    outerHeight = window.outerHeight;
        
                var left = screenX + Math.max(outerWidth - width, 0) / 2;
                var top = screenY + Math.max(outerHeight - height, 0) / 2;
        
                var features = [
                    "width=" + width,
                    "height=" + height,
                    "top=" + top,
                    "left=" + left,
                    "status=no",
                    "resizable=yes",
                    "toolbar=no",
                    "menubar=no",
                    "clearcache=yes",
                    "clearsessioncache=yes",
                    "cleardata=yes",
                    "scrollbars=yes"];

                var ref = window.open(url, "_blank", features.join(","));
                ref.addEventListener('loadstart', 
                    function(event) {
                        if((event.url).startsWith(credentialsSrvc.redirectShort)) {
                            var authInfo = getAuthInfoFromUrl(event.url); 
                            var result = authInfo.code;                           
                            ref.close();
                            fnSuccess(result);
                        }
                    }
                );
            }
            popup(url);

        }


        function getPrimaryToken(){
            return new Promise(
                function(resolve, reject){
                    doGetPrimaryToken(
                        resolve,
                        reject
                    )
                }
            );
        
        }

        function getAccessToken(primaryToken) {
            return new Promise(function (resolve, reject) {
                
                var uri = credentialsSrvc.exchangeServiceUri;
                var metaData_request = new XMLHttpRequest();

                metaData_request.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            resolve([this.status, metaData_request.responseText]);
                        } else {
                            reject([this.status, metaData_request.responseText]);
                        }
                    }
                };

                
                metaData_request.open("POST", uri, true);
                metaData_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                metaData_request.send('code=' + primaryToken);
            });

        }
        


        function storeAuthInfo(authInfo){

            if(!(authInfo == null)){
                var currentTime_ms = new Date().getTime();
                var expiresAt_ms = currentTime_ms + (authInfo.expires_in * 1000);
                authInfo.expires_at_ms = expiresAt_ms;
                localStorage.setItem("authInfo", JSON.stringify(authInfo));
            }else{
                localStorage.removeItem("authInfo");
            }
        }

        function getAuthInfo(){

            var result = null;

            try{
                result = JSON.parse(localStorage.getItem("authInfo"));
            }catch(e){
                // ignore - will simply return null;
            }

            return result;
        }

        function isAuthenticated(){
            var result = false;
            try{
                var authInfo = getAuthInfo();
                if(!(authInfo==null)){
                    var currentTime_ms = new Date().getTime();
                    if (currentTime_ms + GRACE_MS < authInfo.expires_at_ms){
                        result = true;
                    }
                }
            }catch(e){}

            return result;
        }

        function clear(){
            storeAuthInfo(null);
        }


        function onError(error){
            item = null;
            itemTerm = "";
        }

        function authenticate(){

            
            storeAuthInfo(null);

            return new Promise(
                function(resolve, reject){
                    getPrimaryToken()
                    .then(function(primaryToken){
                        getAccessToken(primaryToken)
                        .then(
                            function(result){
                                var authInfo = JSON.parse(result[1]);
                                storeAuthInfo(authInfo);
                                resolve(authInfo);
                            }
                        )
                        .catch(
                            function (error){
                                onError(error);
                                reject(error);
                        });
                    })
                    .catch(function(error){
                        onError(error);
                        reject(error);
                    });
                }
            );


        }

        service.clear = clear;
        service.getAuthInfo = getAuthInfo;
        service.isAuthenticated = isAuthenticated;
        service.authenticate = authenticate;


        return service;

    }

    
})();