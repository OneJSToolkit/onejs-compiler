import BaseGenerator = require('./BaseGenerator');
import CompiledViewTemplate = require('./CompiledViewTemplate');
//import Encode = require('onejs/src/Encode');

/// <summary>
/// Generates a TypeScript view class from a OneJS template.
/// </summary>
class TypeScriptGenerator extends BaseGenerator {

    public generate(templateContent: string): string {
        var _this = this;
        var template =this.template = _this._getTemplate(templateContent);
        var interfaceName = 'I' + template.name + 'Model';

        _this._addLine('import View = require(\'View\');');
        _this._addLine('import Encode = require(\'Encode\');');
        _this._addLine('import ' + interfaceName + ' = require(\'' + interfaceName + '\');');

        if (template.viewModelType) {
            _this._addLine('import ' + template.viewModelType + ' = require(\'' + template.viewModelType + '\');');
        }

        _this._addChildViewImports(template);

        if (template.cssInclude) {
            var safeName = template.cssInclude.replace('.', '');
            _this._addLine('import ' + safeName + ' = require(\'' + template.cssInclude + '\');');

            _this._addLine();
            _this._addLine('View.loadStyles(' + safeName + '.styles);');
        }

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
    }

    private _addChildViewImports(template: CompiledViewTemplate) {
        var uniqueControlTypes = {};

        for (var memberName in template.childViews) {
            uniqueControlTypes[template.childViews[memberName].type] = template.childViews[memberName];
        }

        for (var typeName in uniqueControlTypes) {
            this._addLine('import ' + typeName + ' = require(\'' + typeName + '\');');
        }
    }

    private _addProperties(template: CompiledViewTemplate) {
        // Add properties
        for (var memberName in template.childViews) {
            this._addLine('public ' + memberName + ': ' + template.childViews[memberName].type + ';', 1);
        }

        // Add annotations
        this._addAnnotations(template);
    }

    private _addConstructor(template: CompiledViewTemplate) {
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
    }

    private _addOnRenderHtml(template: CompiledViewTemplate, interfaceName: string) {
        var _this = this;

        _this._addLine();
        _this._addLine('public onRenderHtml(viewModel: ' + interfaceName + '): string {', 1);
        _this._addLine('return \'\' +', 2);

        this._addRenderLine(template.documentElement, 3);

        _this._addLine('\'\';', 3);
        _this._addLine('}', 1);
    }

    private _addRenderLine(element: HTMLElement, indent: number) {
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

            _this._addLine("'<" + tagName +
                this._getIdAttribute(element) +
                this._getCreationMethod(element, 'genStyle', 'css', 'style', isRoot) +
                this._getCreationMethod(element, 'genClass', 'className', 'class', isRoot) +
                this._getCreationMethod(element, 'genAttr', 'attr') +
                this._getRemainingAttributes(element) +
                closingTag, indent);

            if (hasContent) {
                _this._addElementContent(element, indent + 1);
                _this._addChildNodes(element, indent + 1);
                _this._addLine("'</" + tagName + ">' +", indent);
            }
        }
    }

    private _addElementContent(element: HTMLElement, indent: number) {
        var annotation = element['annotation'];

        if (annotation) {
            if (annotation.text) {
                this._addLine('Encode.toJS(viewModel.' + annotation.text + ') +', indent);
            }

            if (annotation.html) {
                this._addLine('Encode.toSafe(viewModel.' + annotation.html + ') +', indent);
            }
        }
    }

    private _addChildNodes(element: HTMLElement, indent: number) {
        for (var i = 0; i < element.childNodes.length; i++) {
            var childNode = element.childNodes[i];

            if (childNode.nodeType === element.ELEMENT_NODE) {
                this._addRenderLine( < HTMLElement > childNode, indent);
            } else if (childNode.nodeType === element.TEXT_NODE) {
                var text = childNode.textContent.trim();
                if (text) {
                    //this._addLine("'" + Encode.toHtml(text) + "' +", indent);
                    this._addLine("'" + text + "' +", indent);
                }
            }
        }
    }

    private _addAnnotations(template: CompiledViewTemplate) {
        var _this = this;
        var annotationBlocks = [];

        for (var id in template.annotations) {
            annotationBlocks.push(JSON.stringify(template.annotations[id], null, 4));
        }
        if (annotationBlocks.length) {
            _this._addLine();
            _this._addLine('public _bindings = [', 1);

            annotationBlocks.join(',\n').split('\n').forEach(function(block) {
                _this._addLine(block, 2);
            });

            _this._addLine('];', 1);
        }
    }

    private _getIdAttribute(element: HTMLElement): string {
        var idAttribute = '';
        var annotation = element['annotation'];

        if (annotation) {
            idAttribute = ' id="\' + this.id + \'_' + annotation.id + '"';
        }

        return idAttribute;
    }

    private _getCreationMethod(element: HTMLElement, createMethodName: string, annotationObjectName: string, attributeName ? : string, injectBaseProperty ? : boolean): string {
        var annotation = element['annotation'];
        var annotationCollection = annotation ? annotation[annotationObjectName] : null;
        var methodCall = '';
        var valuesToAdd = [];
        var existingValue = element.getAttribute(attributeName) || '';

        // Root node needs to inject no matter what.
        if (injectBaseProperty && !annotationCollection) {
            annotationCollection = {};
        }

        if (annotationCollection) {
            // Remove attribute because we're going to use a creation method.
            if (attributeName) {
                element.removeAttribute(attributeName);
            }

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
    }

    private _getRemainingAttributes(element: HTMLElement): string {
        var attributeContent = [];

        for (var i = 0; i < element.attributes.length; i++) {
            var attribute = element.attributes[i];
            attributeContent.push(attribute.name + '="' + attribute.value + '"');
        }

        return attributeContent.length ? (' ' + attributeContent.join(' ')) : '';
    }
}

export = TypeScriptGenerator;