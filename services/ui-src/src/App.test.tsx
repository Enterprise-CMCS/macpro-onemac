import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';


import React from "react";
import {App} from "./App";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('foo'))

});
