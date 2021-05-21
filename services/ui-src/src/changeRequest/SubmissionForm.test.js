import React from "react";
import { renderWithProviders } from "../utils/test-utils";

import {render, screen} from '@testing-library/react';
import FormInfoText, {FORM_INFO_TEXT_ID} from "../components/FormInfoText";
import 'core-js/es/typed-array/uint32-array';
import 'core-js/es/array/find';
import 'core-js/es/object/assign';
import 'core-js/es/object/entries';
import 'core-js/es/array';
import 'core-js/es/object';
import "isomorphic-fetch";
import Waiver from "./Waiver";


test('renders FormInfoText component', () => {
    const {getFormText} = render(<FormInfoText text="XYZ-Form-TEST-XYZ"/>);
    const textElement = screen.getByText(/XYZ-Form-TEST-XYZ/i);
    expect(textElement).toBeInTheDocument();
});

test('renders Waiver Form component', async () => {
    const getWaiverForm = renderWithProviders(<Waiver/>,{
        route: "/wavier"
    });
    const textElement = screen.getByText(/Once you submit this form, a confirmation email is sent to you and to CMS. CMS will use this content to review your package and you will not be able to edit this form. If CMS needs any additional information, they will follow up by email./);

});

