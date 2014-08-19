import LeftNavModel = require('LeftNavModel');
import View = require('View');
import LeftNavcss = require('LeftNav.css');
LeftNavcss;

class LeftNav extends View {
    viewName = 'LeftNav';
    viewModelType = LeftNavModel;

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        _this.element = _this._ce("div", ["class","c-LeftNavBar"], null, [
            _this._ce("div", []),
            _this._ce("div", []),
            _this._ce("div", ["class","searchBox"], null, [
                _this._ct("hi there, "),
                _this._ce("a", [], bindings[0]),
                _this._ct(", how are you?\r\n        ")
            ])
        ]);
    }

    onRenderHtml(): string {
        return '' +
            '<div class="c-LeftNavBar">' +
                '<div></div>' +
                '<div></div>' +
                '<div class="searchBox">' +
                    'hi there,' +
                    '<a id="' + this.id + '_0" ' + this._genAttr('', ['href','name']) + '></a>' +
                    ', how are you?' +
                '</div>' +
            '</div>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "attr": {
                "href": "name"
            }
        }
    ];
}

export = LeftNav;
