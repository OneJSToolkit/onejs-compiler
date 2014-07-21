var XMLDOM = require('xmldom');
var ViewTemplateDefinition = require('./ViewTemplateDefinition');

/// <summary>
/// Represents a compiled view template. Provides a parse method to populate its public
/// properties. The "errors" property will be populated with an array of strings, if any
/// occur during parsing.
/// </summary>
var CompiledViewTemplate = (function () {
    function CompiledViewTemplate(templateContent) {
        this._annotationCount = 0;
        if (templateContent) {
            this.parse(templateContent);
        } else {
            this._reset();
        }
    }
    CompiledViewTemplate.prototype.parse = function (templateContent) {
        this._reset();
        this.documentElement = new XMLDOM.DOMParser().parseFromString(templateContent).documentElement;

        this._parseElement(this.documentElement);
    };

    CompiledViewTemplate.prototype._reset = function () {
        this.name = '';
        this.annotations = {};
        this.childViews = {};
        this.properties = {};
        this.events = [];
        this.errors = [];
        this.documentElement = null;

        this._annotationCount = 0;
    };

    CompiledViewTemplate.prototype._parseElement = function (element) {
        var elementDefinition = this._getDefinition(element);

        // Do baseline validation and any custom validation stage for the specific element type.
        if (this._validateElementIsExpected(element, elementDefinition) && this._validateAttributes(element, elementDefinition) && this._performCustomStage('validate', element, elementDefinition)) {
            // The element is valid, process it.
            this._performCustomStage('process', element, elementDefinition);

            for (var i = 0; i < element.childNodes.length; i++) {
                var childElement = element.childNodes[i];

                switch (childElement.nodeType) {
                    case element.ELEMENT_NODE:
                        this._parseElement(childElement);
                        break;
                    case element.TEXT_NODE:
                        var value = element.textContent.trim();

                        if (!value) {
                            element.removeChild(childElement);
                            i--;
                        }
                        break;
                }
            }
        }
    };

    CompiledViewTemplate.prototype._addError = function (errorMessage, element) {
        var lineNumber = element ? element['lineNumber'] : null;
        var columnNumber = element ? element['columnNumber'] : null;
        var position = (lineNumber !== null && columnNumber !== null) ? ('(line: ' + lineNumber + ', col: ' + columnNumber + ') ') : '';

        this.errors.push(position + errorMessage);
    };

    CompiledViewTemplate.prototype._performCustomStage = function (stageName, element, elementDefinition) {
        var isValid = true;
        var stageEventMethodName = '_' + stageName + this._getHandlerName(elementDefinition.id) + 'Element';

        if (!this[stageEventMethodName] || this[stageEventMethodName].call(this, element, elementDefinition)) {
            for (var attributeName in elementDefinition.attributes) {
                var stageAttributeMethodName = '_' + stageName + this._getHandlerName(attributeName) + 'Attribute';
                var attributeValue = element.getAttribute(attributeName);

                if (this[stageAttributeMethodName] && attributeValue && !this[stageAttributeMethodName].call(this, element, elementDefinition, attributeValue)) {
                    isValid = false;
                    break;
                }
            }
        } else {
            isValid = false;
        }

        return isValid;
    };

    CompiledViewTemplate.prototype._validateElementIsExpected = function (element, elementDefinition) {
        var isValid = true;
        var parentElement = element.parentNode;
        var parentDefinition = this._getDefinition(parentElement);

        if (parentDefinition && parentDefinition.children.indexOf(elementDefinition.id) === -1) {
            this._addError('The element "' + element.tagName + '" is not a valid child for the element "' + parentElement.tagName + '".', element);
            isValid = false;
        }

        return isValid;
    };

    CompiledViewTemplate.prototype._validateAttributes = function (element, elementDefinition) {
        var isValid = true;

        for (var attributeName in elementDefinition.attributes) {
            var attribute = elementDefinition.attributes[attributeName];
            if (attribute.isRequired && !element.getAttribute(attributeName)) {
                isValid = false;
                this._addError('The element "' + element.tagName + '" was missing a required attribute "' + attributeName + '".', element);
            }
        }

        return isValid;
    };

    CompiledViewTemplate.prototype._validateSectionElement = function (element, elementDefinition) {
        var isValid = true;

        if (!element.getAttribute('js-if') && !element.getAttribute('js-repeat')) {
            this._addError('The element "js-section" requires either a "js-if" or "js-repeat" attribute.', element);
            isValid = false;
        }

        return isValid;
    };

    CompiledViewTemplate.prototype._processTemplateElement = function (element) {
        var annotation = this._getAnnotation(element);

        this.name = element.getAttribute('js-name');
        element.removeAttribute('js-name');

        this.viewModelType = element.getAttribute('js-model') || '';
        element.removeAttribute('js-model');

        if (this.name.indexOf('.') > -1) {
            var nameParts = this.name.split('.');
            this.name = nameParts[nameParts.length - 1];
        }

        return true;
    };

    CompiledViewTemplate.prototype._processControlElement = function (element) {
        var parentNode = element.parentNode;
        var name = element.getAttribute('js-name');

        if (this.childViews[name]) {
            this._addError('The is more than 1 control with the name "' + name + '".', element);
        } else {
            this.childViews[name] = {
                name: name,
                type: element.getAttribute('js-type') || '',
                data: element.getAttribute('js-data')
            };
        }

        return true;
    };

    CompiledViewTemplate.prototype._processDefaultElement = function (element) {
        var childId = element.getAttribute('js-id');

        if (childId) {
            var annotation = this._getAnnotation(element);

            annotation.childId = childId;
        }

        return true;
    };

    CompiledViewTemplate.prototype._processBindAttribute = function (element, elementDefinition, attributeValue) {
        var _this = this;
        var annotation = _this._getAnnotation(element);

        // The current compiler allows semicolons or commas.
        attributeValue = attributeValue.replace(/;/g, ',');

        attributeValue.split(',').forEach(function (binding) {
            var bindingDestSource = binding.split(':');
            var dest = bindingDestSource[0].trim();
            var source = bindingDestSource[1].trim();
            var subDest = dest.split('.');

            if (subDest.length > 1) {
                dest = subDest.shift();
                subDest = subDest.join('.');
            } else {
                subDest = dest;
                dest = 'attr';
            }

            var expectedSourceType = 'string';

            switch (dest) {
                case 'attr':
                    if (subDest === 'text') {
                        annotation.text = source;
                    } else if (subDest === 'html') {
                        annotation.html = source;
                    } else {
                        var attributeBindings = annotation['attr'] = annotation['attr'] || {};

                        attributeBindings[subDest] = source;
                    }

                    break;

                case 'className':
                    var classBindings = annotation['className'] = annotation['className'] || {};

                    expectedSourceType = 'boolean';
                    classBindings[subDest] = source;
                    break;

                case 'css':
                    var styleBindings = annotation['css'] = annotation['css'] || {};

                    styleBindings[subDest.toLowerCase()] = source;
                    break;
            }

            if (!_this.properties[source]) {
                _this.properties[source] = {
                    name: source,
                    type: expectedSourceType
                };
            }

            element.removeAttribute('js-bind');
        });

        return true;
    };

    CompiledViewTemplate.prototype._processUserActionAttribute = function (element, elementDefinition, attributeValue) {
        var _this = this;
        var annotation = _this._getAnnotation(element);
        var userActions = annotation.events = annotation.events || {};

        attributeValue.split(',').forEach(function (userAction) {
            userAction = userAction.split(':');

            var eventName = userAction[0].trim();
            var callbackName = userAction[1].trim();

            userActions[eventName] = callbackName;

            if (_this.events.indexOf(callbackName) == -1) {
                _this.events.push(callbackName);
            }
        });

        element.removeAttribute('js-userAction');

        return true;
    };

    CompiledViewTemplate.prototype._getDefinition = function (element) {
        var definition = null;
        var definitionId = ViewTemplateDefinition[element.tagName] ? element.tagName : 'default';

        element = element.nodeType === element.DOCUMENT_NODE ? null : element;

        if (element) {
            definition = ViewTemplateDefinition[definitionId];
            definition.id = definitionId;
        }

        return definition;
    };

    CompiledViewTemplate.prototype._getHandlerName = function (propertyName) {
        if (propertyName.substr(0, 3) === 'js-') {
            propertyName = propertyName.substr(3);
        }

        propertyName = propertyName.substr(0, 1).toUpperCase() + propertyName.substr(1);

        return propertyName;
    };

    CompiledViewTemplate.prototype._getAnnotation = function (element) {
        if (!element['annotation']) {
            var id = String(this._annotationCount++);

            this.annotations[id] = element['annotation'] = {
                id: id
            };
        }

        return element['annotation'];
    };
    return CompiledViewTemplate;
})();

module.exports = CompiledViewTemplate;
