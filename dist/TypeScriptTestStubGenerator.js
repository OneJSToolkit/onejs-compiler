var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseGenerator = require('./BaseGenerator');

var _testStubPostFix = 'TestStub';
var _baseTestStubClass = 'ViewTestStub';
var _getSubControLocationClass = 'GetSubControlLocation';

/// <summary>
/// Generates a TypeScript test stub class from a OneJS template.
/// </summary>
var TypeScriptTestStubGenerator = (function (_super) {
    __extends(TypeScriptTestStubGenerator, _super);
    function TypeScriptTestStubGenerator() {
        _super.apply(this, arguments);
    }
    TypeScriptTestStubGenerator.prototype.generate = function (templateContent) {
        var template = this.template = this._getTemplate(templateContent);

        this._addImports(template);
        this._addClass(template, true);

        this._addLine();
        this._addLine('export = ' + template.name + _testStubPostFix + ';');

        return this.output;
    };

    TypeScriptTestStubGenerator.prototype._addImports = function (template) {
        var _this = this;
        var uniqueControlTypes = {};

        uniqueControlTypes[_baseTestStubClass] = {
            path: '../onejs/' + _baseTestStubClass
        };

        uniqueControlTypes[template.baseViewType + _testStubPostFix] = {
            path: template.baseViewFullType + _testStubPostFix
        };

        function findImports(currentTemplate) {
            var i;

            for (var memberName in currentTemplate.childViews) {
                if (!uniqueControlTypes[_getSubControLocationClass]) {
                    uniqueControlTypes[_getSubControLocationClass] = {
                        path: '../onejs/' + _getSubControLocationClass
                    };
                }

                var childViewDefinition = currentTemplate.childViews[memberName];

                if (childViewDefinition.shouldImport) {
                    uniqueControlTypes[childViewDefinition.type + _testStubPostFix] = {
                        path: childViewDefinition.fullType + _testStubPostFix
                    };
                }

                uniqueControlTypes[childViewDefinition.baseType + _testStubPostFix] = {
                    // TODO: calculate correct base path
                    path: childViewDefinition.fullBaseType + _testStubPostFix
                };
            }
            for (i = 0; i < currentTemplate.subTemplates.length; i++) {
                findImports(currentTemplate.subTemplates[i]);
            }
        }

        findImports(template);

        Object.keys(uniqueControlTypes).forEach(function (typeName) {
            var controlType = uniqueControlTypes[typeName];

            var relativePath = controlType.path[0] === '.' ? controlType.path : './' + controlType.path;

            _this._addLine('import ' + typeName + ' = require(\'' + relativePath + '\');');
        });
    };

    TypeScriptTestStubGenerator.prototype._addClass = function (template, rootTemplate) {
        this._addLine();
        this._addLine('class ' + template.name + _testStubPostFix + ' extends ' + (rootTemplate ? _baseTestStubClass : template.baseViewType + _testStubPostFix) + ' {');
        this._addProperties(template);
        this._addLine('}');

        for (var i = 0; i < template.subTemplates.length; i++) {
            this._addClass(template.subTemplates[i], false);
        }
    };

    TypeScriptTestStubGenerator.prototype._addProperties = function (template) {
        this._addLine('originalViewName = \'' + template.name + '\';', 1);

        for (var memberName in template.childViews) {
            var childViewDefinition = template.childViews[memberName];

            this._addLine(memberName + '(): ' + childViewDefinition.type + _testStubPostFix + ' {', 1);
            this._addLine('return new ' + childViewDefinition.type + _testStubPostFix + '(new ' + _getSubControLocationClass + '(\'' + memberName + '\', this.controlLocation, this.webDriver), this.webDriver);', 2);
            this._addLine('}', 1);
        }
    };
    return TypeScriptTestStubGenerator;
})(BaseGenerator);

module.exports = TypeScriptTestStubGenerator;
