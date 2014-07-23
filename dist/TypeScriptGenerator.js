var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseGenerator = require('./BaseGenerator');

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
        var template = _this._getTemplate(templateContent);
        var interfaceName = 'I' + template.name + 'Model';

        _this._addLine('import View = require(\'View\');');
        _this._addLine('import Encode = require(\'Encode\');');
        _this._addLine('import ' + interfaceName + ' = require(\'' + interfaceName + '\');');

        if (template.cssInclude) {
            var safeName = template.cssInclude.replace('.', '');
            _this._addLine('import ' + safeName + ' = require(\'' + template.cssInclude + '\');');
            _this._addLine('View.loadStyles(' + safeName + '.styles);');
        }

        if (template.viewModelType) {
            _this._addLine('import ' + template.viewModelType + ' = require(\'' + template.viewModelType + '\');');
        }

        _this._addChildViewImports(template);
        _this._addLine();

        _this._addLine('class ' + template.name + ' extends View {');
        _this._addProperties(template);
        _this._addLine();

        _this._addConstructor(template);
        _this._addOnRenderHtml(template, interfaceName);

        _this._addLine('}');
        _this._addLine();
        _this._addLine('export = ' + template.name + ';');

        return _this.output;
    };

    TypeScriptGenerator.prototype._addChildViewImports = function (template) {
        var uniqueControlTypes = {};

        for (var memberName in template.childViews) {
            uniqueControlTypes[template.childViews[memberName].type] = template.childViews[memberName];
        }

        for (var typeName in uniqueControlTypes) {
            this._addLine('import ' + typeName + ' = require(\'' + typeName + '\');');
        }
    };

    TypeScriptGenerator.prototype._addProperties = function (template) {
        for (var memberName in template.childViews) {
            this._addLine('public ' + memberName + ': ' + template.childViews[memberName].type + ';', 1);
        }

        // Add annotations
        this._addAnnotations(template);
    };

    TypeScriptGenerator.prototype._addConstructor = function (template) {
        var _this = this;

        _this._addLine('constructor(data?: any) {', 1);
        _this._addLine('super(data);', 2);
        _this._addLine();
        _this._addLine('this.viewName = \'' + template.name + '\';', 2);
        _this._addLine('this.baseClass = \'c-\' + this.viewName + (this.baseClass ? \' \': \'\');', 2);

        if (template.viewModelType) {
            _this._addLine('this.viewModelType = ' + template.viewModelType + ';', 2);
        }

        for (var memberName in template.childViews) {
            var childView = template.childViews[memberName];

            this._addLine('this.addChild(this.' + memberName + ' = new ' + childView.type + '(' + childView.data + '));', 2);
        }

        _this._addLine('}', 1);
    };

    TypeScriptGenerator.prototype._addOnRenderHtml = function (template, interfaceName) {
        var _this = this;

        _this._addLine();
        _this._addLine('public onRenderHtml(viewModel: ' + interfaceName + '): string {', 1);
        _this._addLine('return \'\' +', 2);

        this._addRenderLine(template.documentElement, 3);

        _this._addLine('\'\';', 3);
        _this._addLine('}', 1);
    };

    TypeScriptGenerator.prototype._addRenderLine = function (element, indent) {
        var _this = this;

        if (element.tagName === 'js-control') {
            _this._addLine('this.' + element.getAttribute('js-name') + '.renderHtml() +', indent);
        } else {
            var isRoot = element.tagName === 'js-template';
            var nodeType = element.nodeType;
            var tagName = (isRoot) ? "' + this.baseTag + '" : element.tagName;
            var annotation = element['annotation'];
            var hasContent = (element.childNodes.length > 0) || (annotation && (annotation.html || annotation.text));
            var closingTag = hasContent ? ">' +" : "></" + tagName + ">' +";

            _this._addLine("'<" + tagName + this._getIdAttribute(element) + this._getCreationMethod(element, 'genStyle', 'css', 'style', isRoot) + this._getCreationMethod(element, 'genClass', 'className', 'class', isRoot) + this._getCreationMethod(element, 'genAttr', 'attr') + this._getRemainingAttributes(element) + closingTag, indent);

            if (hasContent) {
                _this._addElementContent(element, indent + 1);
                _this._addChildNodes(element, indent + 1);
                _this._addLine("'</" + tagName + ">' +", indent);
            }
        }
    };

    TypeScriptGenerator.prototype._addElementContent = function (element, indent) {
        var annotation = element['annotation'];

        if (annotation) {
            if (annotation.text) {
                this._addLine('Encode.toJS(viewModel.' + annotation.text + ') +', indent);
            }

            if (annotation.html) {
                this._addLine('Encode.toSafe(viewModel.' + annotation.html + ') +', indent);
            }
        }
    };

    TypeScriptGenerator.prototype._addChildNodes = function (element, indent) {
        for (var i = 0; i < element.childNodes.length; i++) {
            var childNode = element.childNodes[i];

            if (childNode.nodeType === element.ELEMENT_NODE) {
                this._addRenderLine(childNode, indent);
            } else if (childNode.nodeType === element.TEXT_NODE) {
                var text = childNode.textContent.trim();
                if (text) {
                    this._addLine("'" + text + "' +", indent);
                }
            }
        }
    };

    TypeScriptGenerator.prototype._addAnnotations = function (template) {
        var _this = this;
        var annotationBlocks = [];

        for (var id in template.annotations) {
            annotationBlocks.push(JSON.stringify(template.annotations[id], null, 4));
        }
        if (annotationBlocks.length) {
            _this._addLine();
            _this._addLine('public _bindings = [', 1);

            annotationBlocks.join(',\n').split('\n').forEach(function (block) {
                _this._addLine(block, 2);
            });

            _this._addLine('];', 1);
        }
    };

    TypeScriptGenerator.prototype._getIdAttribute = function (element) {
        var idAttribute = '';
        var annotation = element['annotation'];

        if (annotation) {
            idAttribute = ' id="\' + this.id + \'_' + annotation.id + '"';
        }

        return idAttribute;
    };

    TypeScriptGenerator.prototype._getCreationMethod = function (element, createMethodName, annotationObjectName, attributeName, injectBaseProperty) {
        var annotation = element['annotation'];
        var annotationCollection = annotation ? annotation[annotationObjectName] : null;
        var methodCall = '';
        var valuesToAdd = [];
        var existingValue = attributeName ? element.getAttribute(attributeName) : '';

        if (attributeName) {
            element.removeAttribute(attributeName);
        }

        // Root node needs to inject no matter what.
        if (injectBaseProperty && !annotationCollection) {
            annotationCollection = {};
        }

        if (annotationCollection) {
            if (injectBaseProperty) {
                if (existingValue) {
                    existingValue = "'" + existingValue + " ' + ";
                }
                existingValue += 'this.base' + this._toTitleCase(attributeName);
            } else {
                existingValue = "'" + existingValue + "'";
            }

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
            attributeContent.push(attribute.name + '="' + attribute.value + '"');
        }

        return attributeContent.length ? (' ' + attributeContent.join(' ')) : '';
    };
    return TypeScriptGenerator;
})(BaseGenerator);

module.exports = TypeScriptGenerator;
