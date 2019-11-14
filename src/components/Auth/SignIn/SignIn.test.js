import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';
import SignIn from './SignIn';

describe.skip('<SignIn />', () => {
  // let wrapper;

  // beforeEach(() => {
  //   wrapper = shallow(<SignIn />);
  // });

  it('should should call handlesubmit on form submission', () => {
    const handleSubmit = jest.fn();
    // handleSubmit.mockReturnValueOnce(new Promise((resolve, reject) => resolve()));

    const wrapper = shallow(<SignIn onSubmit={handleSubmit} />);
    wrapper.simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();


    // const handleWishBook = jest.fn();
    // handleWishBook.mockReturnValueOnce(new Promise((resolve, reject) => resolve()));

    // wrapper.instance().handleWishBook = handleWishBook;

    // const wishButton = wrapper.find('.wish-button');

    // wishButton.simulate('click');

    // await expect(wrapper.instance().handleWishBook).toHaveBeenCalled();
  });

  xit('renders input change', () => {
    let wrapper = shallow(<SignIn />);
    // const onSubmitMock = jest.fn();
    const inputEmail = wrapper.find('input[type="email"]');
    const inputPassword = wrapper.find('input[type="password"]');
    // const form = wrapper.find('input[type="submit"]');

    // ReactTestUtils.Simulate.change(inputEmail);

    // const mockChange = jest.fn();

    // act(() => {
    //
    //   inputEmail.simulate('change', { target: { value: 'test' } });
    //   inputEmail.dispatchEvent(new MouseEvent('change', {bubbles: true}));
    // });

    inputEmail.simulate('change', { target: { value: 'test' } });
    // inputEmail.props().onChange({target:{value:'test'}})
    // inputPassword.simulate('change', { target: { value: 'password' } });
    // wrapper.update();

    // inputEmail.prop('onChange')('a');

    // inputEmail.props().onChange({target: {
    //   value: 'test'
    // }});
    // wrapper.update();

    // console.log(wrapper.state.email);

    expect(inputEmail.prop('value')).toBe('test');
    // expect(wrapper.state(userInput.email)).toBe('test');

    // wrapper.find("form").simulate("submit");

    // form.simulate('click');
    // console.log("onClickMock.mock", onSubmitMock.mock)
    // expect(onSubmitMock).toBeCalled();
  });
});
