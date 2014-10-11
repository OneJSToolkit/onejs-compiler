import TestStub = require('../onejs/TestStub');
import LeftNavBaseTestStub = require('./LeftNavBaseTestStub');
import GetSubControlLocation = require('../onejs/GetSubControlLocation');
import BazTestStub = require('../Baz/BazTestStub');
import ViewTestStub = require('../onejs/ViewTestStub');
import BozTestStub = require('../Boz/BozTestStub');
import SearchBoxTestStub = require('../SearchBox/SearchBoxTestStub');
import RepeaterTestStub = require('../onejs/RepeaterTestStub');
import QuotaPaneTestStub = require('../QuotaPane/QuotaPaneTestStub');
import ImageButtonTestStub = require('../ImageButton/ImageButtonTestStub');

class LeftNavTestStub extends TestStub {
    originalViewName = 'LeftNav';
    _childView0(): BazTestStub {
        return new BazTestStub(new GetSubControlLocation('_childView0', this.controlLocation, this.webDriver), this.webDriver);
    }
    _childView1(): BozTestStub {
        return new BozTestStub(new GetSubControlLocation('_childView1', this.controlLocation, this.webDriver), this.webDriver);
    }
    _childView2(): SearchBoxTestStub {
        return new SearchBoxTestStub(new GetSubControlLocation('_childView2', this.controlLocation, this.webDriver), this.webDriver);
    }
    leftNavBlock0(): LeftNavBlock0TestStub {
        return new LeftNavBlock0TestStub(new GetSubControlLocation('leftNavBlock0', this.controlLocation, this.webDriver), this.webDriver);
    }
    _childView3(): QuotaPaneTestStub {
        return new QuotaPaneTestStub(new GetSubControlLocation('_childView3', this.controlLocation, this.webDriver), this.webDriver);
    }
}

export = LeftNavTestStub;
