'use strict';

(function () {
  /**
    * Time in ms, that user waits reponse from the server until the error message is shown
  */
  var TIMEOUT = 5000;
  var SERVER_STATUS_OK = 200;

  /**
    * Universal error functions
  */
  var ERRORS = {
    timeoutExceeded: function (timeout) {
      return 'Запрос не успел выполниться за ' + timeout + ' мс';
    },

    generalError: function (error) {
      return 'Произошла ошибка ' + error;
    },

    connectionError: function () {
      return 'Произошла ошибка соединения';
    }
  };


  var createXhr = function (responseType, timeout) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    xhr.timeout = timeout;

    return xhr;
  };

  /**
   * Processes the received response from the server
   * @param {Function} onSuccess - on success transfers received data to the callback function
   * @param {Function} onError - on error utilizes the error constants and transfers them to callback function
   * @return {XMLHttpRequest}
   */
  var processXhr = function (onSuccess, onError) {
    var xhr = createXhr('json', TIMEOUT);

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError(ERRORS.generalError(xhr.status));
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERRORS.connectionError());
    });

    xhr.addEventListener('timeout', function () {
      onError(ERRORS.timeoutExceeded(xhr.timeout));
    });

    return xhr;
  };


  /**
   * Process GET-request
   * @param {string} url
   * @param {Function} onSuccess
   * @param {Function} onError
   */
  var get = function (url, onSuccess, onError) {
    var response = processXhr(onSuccess, onError);

    response.open('GET', url);
    response.send();
  };

  /**
   * Process POST-request
   * @param {string} url
   * @param {FormData} data - sent data
   * @param {Function} onSuccess
   * @param {Function} onError
   */
  var post = function (url, data, onSuccess, onError) {
    var response = processXhr(onSuccess, onError);

    response.open('POST', url);
    response.send(data);
  };

  // exports
  window.backend = {
    get: get,
    post: post
  };
})();
