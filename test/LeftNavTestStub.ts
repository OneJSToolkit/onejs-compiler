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

class LeftNavBlock0ItemTestStub extends TestStub {
    originalViewName = 'LeftNavBlock0Item';
    leftNavBlock1(): LeftNavBlock1TestStub {
        return new LeftNavBlock1TestStub(new GetSubControlLocation('leftNavBlock1', this.controlLocation, this.webDriver), this.webDriver);
    }
}

class LeftNavBlock1ItemTestStub extends TestStub {
    originalViewName = 'LeftNavBlock1Item';
    expandButton(): ImageButtonTestStub {
        return new ImageButtonTestStub(new GetSubControlLocation('expandButton', this.controlLocation, this.webDriver), this.webDriver);
    }
    leftNavBlock2(): LeftNavBlock2TestStub {
        return new LeftNavBlock2TestStub(new GetSubControlLocation('leftNavBlock2', this.controlLocation, this.webDriver), this.webDriver);
    }
}

class LeftNavBlock2ItemTestStub extends TestStub {
    originalViewName = 'LeftNavBlock2Item';
}

class LeftNavBlock2TestStub extends TestStub {
    originalViewName = 'LeftNavBlock2';
}

class LeftNavBlock1TestStub extends TestStub {
    originalViewName = 'LeftNavBlock1';
}

class LeftNavBlock0TestStub extends TestStub {
    originalViewName = 'LeftNavBlock0';
}

export = LeftNavTestStub;
