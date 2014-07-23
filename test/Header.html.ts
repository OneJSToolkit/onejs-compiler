import View = require('View');
import Encode = require('Encode');
import IHeaderModel = require('IHeaderModel');
import Headercss = require('Header.css');
View.loadStyles(Headercss.styles);

class Header extends View {

    public _bindings = [
        {
            "id": "0"
        }
    ];

    constructor(data?: any) {
        super(data);

        this.viewName = 'Header';
        this.baseClass = 'c-' + this.viewName + (this.baseClass ? ' ': '');
    }

    public onRenderHtml(viewModel: IHeaderModel): string {
        return '' +
            '<' + this.baseTag + ' id="' + this.id + '_0" ' + this.genStyle(this.baseStyle) + ' ' + this.genClass(this.baseClass) + '>' +
                '<div class="logoImage"></div>' +
                '<div class="logo"></div>' +
                '<ul class="commands">' +
                    '<li>' +
                        'Create' +
                    '</li>' +
                    '<li>' +
                        'Share' +
                    '</li>' +
                    '<li>' +
                        'Discover' +
                    '</li>' +
                '</ul>' +
            '</' + this.baseTag + '>' +
            '';
    }
}

export = Header;
