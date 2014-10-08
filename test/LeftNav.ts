import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import Search = require('../Search/Search');

class Foo extends View {
    viewName = 'Foo';
    searchBox = <any>this.addChild(new Search());

    onViewModelChanged(viewModel, args?: any) {
        super.onViewModelChanged(viewModel, args);
        this.searchBox.setData({ foo: this.getValue('prop.val') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", [], [
            _this.searchBox.render()
        ]));
    }
}

export = Foo;
