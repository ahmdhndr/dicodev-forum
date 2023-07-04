import AlertPopup from '../components/AlertPopup';

export default {
  component: AlertPopup,
  argTypes: {
    alert: {
      control: {},
      description: 'The alert will receive type and message from the state',
    },
    customStyleAndPreventAutoHide: {
      control: 'boolean',
      description:
        'This props should not be used in the component, the purpose of this props exist is to make the alert center both vertically and horizontally inside the canvas',
    },
  },
};

const WithTypeSuccess = {
  args: {
    alert: {
      message: 'This is a success message',
      type: 'success',
    },
    customStyleAndPreventAutoHide: true,
  },
};

const WithTypeError = {
  args: {
    alert: {
      message: 'This is an error message',
      type: 'error',
    },
    customStyleAndPreventAutoHide: true,
  },
};

const WithTypeWarning = {
  args: {
    alert: {
      message: 'This is a warning message',
      type: 'warning',
    },
    customStyleAndPreventAutoHide: true,
  },
};

const WithTypeInfo = {
  args: {
    alert: {
      message: 'This is an info message',
      type: 'info',
    },
    customStyleAndPreventAutoHide: true,
  },
};

export { WithTypeSuccess, WithTypeError, WithTypeWarning, WithTypeInfo };
