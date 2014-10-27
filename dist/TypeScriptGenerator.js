var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseGenerator = require('./BaseGenerator');

;

var BlockType;
(function (BlockType) {
    BlockType[BlockType["Element"] = 0] = "Element";
    BlockType[BlockType["Text"] = 1] = "Text";
    BlockType[BlockType["Comment"] = 2] = "Comment";
    BlockType[BlockType["Block"] = 3] = "Block";
    BlockType[BlockType["IfBlock"] = 4] = "IfBlock";
    BlockType[BlockType["RepeaterBlock"] = 5] = "RepeaterBlock";
    BlockType[BlockType["View"] = 6] = "View";
})(BlockType || (BlockType = {}));

/// <summary>
/// Generates a TypeScript view class from a OneJS template.
/// </summary>
var TypeScriptGenerator = (function (_super) {
    __extends(TypeScriptGenerator, _super);
    function TypeScriptGenerator() {
        _super.apply(this, arguments);
    }
    TypeScriptGenerator.prototype.generate = function (templateContent) {
        var _this = this;
        var template = this.template = _this._getTemplate(templateContent);
        var interfaceName = 'I' + template.name + 'Model';

        if (template.viewModelType) {
            _this._addLine('import ' + template.viewModelType + ' = require(\'./' + template.viewModelType + '\');');
        }

        _this._addImports(template);

        if (template.cssInclude) {
            var safeName = template.cssInclude.replace('.', '');

            _this._addLine('import ' + safeName + ' = require(\'./' + template.cssInclude + '\');');

            _this._addLine();
            _this._addLine('DomUtils.loadStyles(' + safeName + '.styles);');
        }

        _this._addClass(template);

        _this._addLine();
        _this._addLine('export = ' + template.name + ';');

        return _this.output;
    };

    TypeScriptGenerator.prototype._addClass = function (template) {
        this._addLine();
        this._addLine('class ' + template.name + ' extends ' + template.baseViewType + ' {');
        this._addProperties(template);
        this._addOnInitialize(template);
        this._addOnViewModelChanged(template);
        this._addSpec(template);
        this._addLine('}');

        for (var i = 0; i < template.subTemplates.length; i++) {
            this._addClass(template.subTemplates[i]);
        }
    };

    TypeScriptGenerator.prototype._addImports = function (template) {
        var _this = this;
        var uniqueControlTypes = {};

        uniqueControlTypes['View'] = {
            path: '../onejs/View'
        };

        uniqueControlTypes['DomUtils'] = {
            path: '../onejs/DomUtils'
        };

        uniqueControlTypes[template.baseViewType] = {
            path: template.baseViewFullType
        };

        function findImports(currentTemplate) {
            var i;

            for (var memberName in currentTemplate.childViews) {
                var childViewDefinition = currentTemplate.childViews[memberName];

                if (childViewDefinition.shouldImport) {
                    uniqueControlTypes[childViewDefinition.type] = {
                        path: childViewDefinition.fullType
                    };
                }

                uniqueControlTypes[childViewDefinition.baseType] = {
                    // TODO: calculate correct base path
                    path: childViewDefinition.fullBaseType
                };
            }
            for (i = 0; i < currentTemplate.subTemplates.length; i++) {
                findImports(currentTemplate.subTemplates[i]);
            }

            for (i = 0; i < currentTemplate.requireList.length; i++) {
                uniqueControlTypes[currentTemplate.requireList[i]] = {
                    // TODO: calculate correct base path
                    path: currentTemplate.requireList[i],
                    forceReference: true
                };
            }
        }

        findImports(template);

        Object.keys(uniqueControlTypes).forEach(function (typeName) {
            var controlType = uniqueControlTypes[typeName];

            var relativePath = controlType.path[0] === '.' ? controlType.path : './' + controlType.path;

            _this._addLine('import ' + typeName + ' = require(\'' + relativePath + '\');');

            // For imports that have no references, we need to add a var reference to trick TypeScript into including it.
            if (controlType.forceReference) {
                _this._addLine(typeName + ';');
            }
        });
    };

    TypeScriptGenerator.prototype._addOnInitialize = function (template) {
        var hasInitialization = false;
        var childView;
        var memberName;

        for (memberName in template.childViews) {
            childView = template.childViews[memberName];
            if (childView.template.isPassThrough || childView.init) {
                hasInitialization = true;
                break;
            }
        }

        if (hasInitialization) {
            this._addLine();
            this._addLine('onInitialize() {', 1);

            this._addLine('super.onInitialize();', 2);

            for (memberName in template.childViews) {
                childView = template.childViews[memberName];

                if (childView.template.isPassThrough) {
                    this._addLine('this.' + memberName + '.owner = ' + (template.parentTemplate ? 'this.owner' : 'this') + ';', 2);
                }
                if (childView.init) {
                    this._addSetData(memberName, childView.init);
                }
            }

            this._addLine('}', 1);
        }
    };

    /*
    private _addOnActivate(template) {
    var childViewsWithEvents = [];
    
    for (memberName in template.childViews) {
    var childView = template.childViews[memberName];
    
    if (childView.events) {
    childViewsWithEvents.push(childView);
    }
    }
    
    if (childViewsWithEvents.length) {
    this._addLine();
    this._addLine('onActivate() {', 1);
    
    for (var i = 0; i < childViewsWithEvents.length; i++) {
    
    }
    
    thils._addLine('}', 1);
    }
    }
    */
    TypeScriptGenerator.prototype._addOnViewModelChanged = function (template) {
        var _this = this;
        var hasChildViewBindings = false;
        var memberName;

        for (memberName in template.childViews) {
            if (template.childViews[memberName].data) {
                hasChildViewBindings = true;
                break;
            }
        }

        if (hasChildViewBindings) {
            _this._addLine();
            _this._addLine('onViewModelChanged(viewModel, args?: any) {', 1);

            this._addLine('super.onViewModelChanged(viewModel, args);', 2);

            for (var memberName in template.childViews) {
                var childViewDefinition = template.childViews[memberName];

                if (childViewDefinition.data) {
                    this._addSetData(memberName, childViewDefinition.data);
                }
            }

            _this._addLine('}', 1);
        }
    };

    TypeScriptGenerator.prototype._addSetData = function (memberName, data) {
        if (data.indexOf('{') == 0) {
            data = data.substr(1, data.length - 2);
            var dataList = data.split(',');
            var isFirst = true;

            data = '{';
            for (var listIndex = 0; listIndex < dataList.length; listIndex++) {
                // TODO: replace this with a proper lexer for strings that can support colons inside of strings
                var parts = dataList[listIndex].trim().split(/[:]+/);

                data += (isFirst ? '' : ',') + ' ' + parts[0].trim() + ': ';

                if (this._isLiteral(parts[1])) {
                    data += parts[1].trim();
                } else {
                    data += 'this.getValue(\'' + parts[1].trim() + '\')';
                }

                isFirst = false;
            }
            data += ' }';
        } else {
            data = 'this.getValue(\'' + data + '\')';
        }

        this._addLine('this.' + memberName + '.setData(' + data + ');', 2);
    };

    TypeScriptGenerator.prototype._isLiteral = function (str) {
        str = str.trim();

        var isLiteral = false;

        if (str[0] === "'") {
            isLiteral = true;
        } else if (str === 'true') {
            isLiteral = true;
        } else if (str === 'false') {
            isLiteral = true;
        } else if (/^-?\d+\.?\d*$/.test(str)) {
            isLiteral = true;
        }

        return isLiteral;
    };

    TypeScriptGenerator.prototype._addProperties = function (template) {
        this._addLine('viewName = \'' + template.name + '\';', 1);

        if (template.options) {
            var optionsBag = eval('(' + template.options + ')');
            for (var optionName in optionsBag) {
                this._addLine(optionName + ' = ' + optionsBag[optionName] + ';', 1);
            }
        }

        if (template.viewModelType) {
            this._addLine('viewModelType = ' + template.viewModelType + ';', 1);
        }

        for (var memberName in template.childViews) {
            var childViewDefinition = template.childViews[memberName];

            this._addLine(memberName + ' = <any>this.addChild(new ' + childViewDefinition.type + '());', 1);
        }
    };

    TypeScriptGenerator.prototype._getSpecObject = function (template) {
        var firstElement = template.documentElement;

        if (template.documentElement.tagName == 'js-view') {
            firstElement = template.documentElement.firstElementChild;
        }
        return this._getSpecElement(firstElement);
    };

    TypeScriptGenerator.prototype._getSpecElement = function (element) {
        switch (element.tagName) {
            case "js-if":
                return this._getSpecIfElement(element);
                break;
            case "js-repeat":
                return this._getSpecRepeatElement(element);
                break;
            case "js-view":
                return this._getSpecViewElement(element);
                break;

            default:
                return this._getSpecHTMLElement(element);
                break;
        }
    };

    TypeScriptGenerator.prototype._getSpecIfElement = function (element) {
        return {
            type: 4 /* IfBlock */,
            source: element.getAttribute('source'),
            children: this._getSpecChildren(element.childNodes)
        };
    };

    TypeScriptGenerator.prototype._getSpecRepeatElement = function (element) {
        return {
            type: 5 /* RepeaterBlock */,
            source: element.getAttribute('source'),
            iterator: element.getAttribute('iterator'),
            children: this._getSpecChildren(element.childNodes)
        };
    };

    TypeScriptGenerator.prototype._getSpecViewElement = function (element) {
        return {
            type: 6 /* View */,
            name: element.getAttribute('js-name'),
            children: this._getSpecChildren(element.childNodes)
        };
    };

    TypeScriptGenerator.prototype._getSpecHTMLElementAttributes = function (element) {
        var map;

        var attrLength = element.attributes.length;
        if (attrLength) {
            map = {};
            for (var i = 0; i < attrLength; i++) {
                var attribute = element.attributes[i];
                map[attribute.name] = attribute.value;
            }
        }
        return map;
    };

    TypeScriptGenerator.prototype._getSpecHTMLElementBinding = function (element) {
        return element['annotation'];
    };

    TypeScriptGenerator.prototype._getSpecHTMLElement = function (element) {
        return {
            type: 0 /* Element */,
            tag: element.tagName,
            attr: this._getSpecHTMLElementAttributes(element),
            binding: this._getSpecHTMLElementBinding(element),
            children: this._getSpecChildren(element.childNodes)
        };
    };

    TypeScriptGenerator.prototype._getSpecTextElement = function (element) {
        return {
            type: 1 /* Text */,
            value: element.nodeValue
        };
    };

    TypeScriptGenerator.prototype._getSpecChildren = function (nodes) {
        var children = [];

        if (nodes.length) {
            for (var i = 0; i < nodes.length; i++) {
                var child = nodes[i];
                if (child.nodeType === child.ELEMENT_NODE) {
                    children.push(this._getSpecElement(child));
                } else if (child.nodeType === child.TEXT_NODE) {
                    children.push(this._getSpecTextElement(child));
                }
            }
        }

        return children;
    };

    TypeScriptGenerator.prototype._addSpec = function (template) {
        var _this = this;
        this._addLine();
        this._addLine('_spec = <any> {', 1);

        var spec = this._getSpecObject(template);
        var specString = JSON.stringify(spec, null, 4);

        var lines = specString.split('\n');
        lines.shift(); // skip opening {
        lines.pop(); // skip closing }

        lines.forEach(function (line) {
            _this._addLine(line, 1);
        });

        this._addLine('};', 1);
    };

    TypeScriptGenerator.prototype._getIdAttribute = function (element) {
        var idAttribute = '';
        var annotation = element['annotation'];

        if (annotation) {
            idAttribute = ' id="\' + this.id + \'_' + annotation.id + '"';
        }

        return idAttribute;
    };

    TypeScriptGenerator.prototype._getCreationMethod = function (element, createMethodName, annotationObjectName, attributeName) {
        var annotation = element['annotation'];
        var annotationCollection = annotation ? annotation[annotationObjectName] : null;
        var methodCall = '';
        var valuesToAdd = [];
        var existingValue = element.getAttribute(attributeName) || '';

        if (annotationCollection) {
            // Remove attribute because we're going to use a creation method.
            if (attributeName) {
                element.removeAttribute(attributeName);
            }

            existingValue = "'" + existingValue + "'";

            for (var valueName in annotationCollection) {
                valuesToAdd.push("'" + valueName + "'");
                valuesToAdd.push("'" + annotationCollection[valueName] + "'");
            }

            methodCall = " ' + this." + createMethodName + "(" + existingValue;

            if (valuesToAdd.length) {
                methodCall += ", [" + valuesToAdd.join(',') + "]";
            }

            methodCall += ") + '";
        }

        return methodCall;
    };

    TypeScriptGenerator.prototype._getRemainingAttributes = function (element) {
        var attributeContent = [];

        for (var i = 0; i < element.attributes.length; i++) {
            var attribute = element.attributes[i];
            attributeContent.push(attribute.name + '="' + _toHtml(attribute.value) + '"');
        }

        return attributeContent.length ? (' ' + attributeContent.join(' ')) : '';
    };
    return TypeScriptGenerator;
})(BaseGenerator);

function _toHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = TypeScriptGenerator;
