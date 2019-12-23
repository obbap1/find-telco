import { shallowMount } from "@vue/test-utils";
import phone from "../../phone.vue";

describe("Phone.vue", () => {
  it("calls the click handler when input is passed", () => {
    const getFirstFourNumbers = jest.fn();
    const wrapper = shallowMount(phone);
    wrapper.setProps({ phone: "0906" });
    wrapper.setMethods({ getFirstFourNumbers });
    const textBox = wrapper.find("input");
    textBox.trigger("input");
    expect(getFirstFourNumbers).toBeCalled();
  });
});
