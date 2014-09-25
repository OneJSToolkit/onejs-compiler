import TestDirectoryPathModel = require('./TestDirectoryPathModel');
import TestDirectoryPathBase = require('./TestDirectoryPathBase');
import ToggleSwitch = require('../ToggleSwitch/ToggleSwitch');
import View = require('../onejs/View');

class TestDirectoryPath extends TestDirectoryPathBase {
    viewName = 'TestDirectoryPath';
    viewModelType = TestDirectoryPathModel;
    toggleSwitch = <any>this.addChild(new ToggleSwitch());

    onViewModelChanged() {
        super.onViewModelChanged();
        this.toggleSwitch.setData({ title: 'Hello!', checked: true, foo: 123.87 });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", [], null, [
            _this._ce("h1", [], null, [
                _this._ct("ToggleSwitch Example")
            ]),
            _this._ce("div", ["class","viewSurface"], null, [
                _this.toggleSwitch.render()
            ])
        ]));
    }
}

export = TestDirectoryPath;
