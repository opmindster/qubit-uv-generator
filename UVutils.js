var UV = {};

UV.utils = (function () {
  
  var field = {};

  var _copyProp = function(From, To) {
    for(var key in From) {
      if(From.hasOwnProperty(key)) {
        To[key] = From[key];
      }
    }
  }

  var _addField = function(uv_path, cb, path) {
    if(!uv_path) {
        return false;
    } else if(uv_path.length === 1) {
        path[uv_path[0]] = cb();
    } else if(uv_path.length > 1) {
        var shifted = uv_path.shift();
        
        if(typeof path[shifted] === "undefined")
          path[shifted] = {};
        _addField(uv_path, cb, path[shifted]);
    }
  }
  
  return {
    addField: function(uv_path, cb) {
      _addField(uv_path, cb, field);
    },
    getField: function() {
      return field;
    },
    publish_UV: function(offset, stop) {
      var time = offset || 50;
      var context = this;
      setTimeout(function() {
        if(time > 20000 && stop)
          return false;
        if(window.universal_variable && window._qtd) {
          _copyProp(field, window.universal_variable);
          window._qtd.push({ resendUniversalVariables: 1 });
          return field;
        }
        context.publish_UV(time + 50);
      }, time)
      
    },
    addEvent: function(css_path, _category, _action) {
      $(css_path).click(function(e) {
        window.universal_variable.events = window.universal_variable.events || [];
        window.universal_variable.events.push({category : _category, action : _action});
      })     
    },
    pushEvent: function(eventobj) {
      window.universal_variable.events = window.universal_variable.events || [];
      window.universal_variable.events.push(eventobj);
    }
  }
})();

UV.utils.addField(['version'], function() {
  return '1.2.1';
});

UV.utils.addField(['user'], function() {
  return {};
});

UV.utils.addField(['basket'], function() {
  return {};
});
