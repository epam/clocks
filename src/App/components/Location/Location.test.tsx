import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';

import { SnackbarContext } from '../../context/snackbar';
import { locationsActions } from '../../redux/locationsRedux/locationsSlice';
import { IAppLocation } from '../../lib/interfaces';
import i18n from '../../dictionary';

import Location from './Location';

const mockLocation: IAppLocation = {
  timezone: 'Asia/Tashkent',
  city: 'Tashkent',
  country: 'Uzbekistan',
  offset: { hours: 0, minutes: 0 },
  host: false,
  id: 'Tashkent_UZ_41_69',
  message: '',
  hasDate: false,
  hasCountry: false,
  hasTimezone: false
};

const { ChangeUserCurrentLocation } = locationsActions;

const MockChangeUserCurrentLocation =
  ChangeUserCurrentLocation as jest.MockedFunction<
    typeof ChangeUserCurrentLocation
  >;
const MockAddComment = jest.fn();
const MockDeleteLocation = jest.fn();
const MockOpenSnackbar = jest.fn();
const MockSnackbarHandler = jest.fn();

jest.mock('@ckeditor/ckeditor5-react', () => ({
  CKEditor: ({ onBlur }: any) => {
    const OnBlur = (event: any) => {
      const editor = {
        getData: () => event.target?.value || ''
      };
      onBlur(null, editor);
    };
    return <textarea onBlur={OnBlur} />;
  }
}));

jest.mock('../../hooks/useUrl', () => ({
  useUrl: () => ({
    AddComment: MockAddComment,
    DeleteLocation: MockDeleteLocation
  })
}));

const wrapper = (children: any) => (
  <I18nextProvider i18n={i18n}>
    <SnackbarContext.Provider
      value={{
        actions: {
          OpenSnackbar: MockOpenSnackbar,
          SnackbarHandler: MockSnackbarHandler
        },
        state: { isSnackbarOpen: false }
      }}
    >
      {children}
    </SnackbarContext.Provider>
  </I18nextProvider>
);

const commentMessageText = 'This is test comment message';

describe('test Location component', () => {
  it('renders Location component', () => {
    const { getAllByRole, getByTestId, getByRole } = render(
      <Location
        changeUserCurrentLocation={ChangeUserCurrentLocation}
        {...mockLocation}
      />
    );
    const headings = getAllByRole('heading');
    const recycleBinIcon = getByTestId(/DeleteButton/i);
    const commentButton = getByTestId('commentButton');
    const city = getByRole('heading', { name: 'Tashkent' });
    expect(headings.length).toBe(3);
    expect(recycleBinIcon).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(commentButton).toBeInTheDocument();
  });
  it('renders textarea for adding comment', () => {
    const { getByTestId, getByRole } = render(
      <Location
        changeUserCurrentLocation={MockChangeUserCurrentLocation}
        {...mockLocation}
      />
    );
    const commentButton = getByTestId('commentButton');
    userEvent.click(commentButton);
    const textarea = getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });
  it('renders Location component with comment message', () => {
    mockLocation.message = commentMessageText;
    const { getByText } = render(
      <Location
        changeUserCurrentLocation={MockChangeUserCurrentLocation}
        {...mockLocation}
      />
    );
    const commentMessage = getByText(commentMessageText);
    expect(commentMessage).toBeInTheDocument();
  });
  it('set current user location id by clicking home icon button', () => {
    const spy = jest.spyOn(locationsActions, 'ChangeUserCurrentLocation');
    const { getByTestId } = render(
      <Location
        changeUserCurrentLocation={MockChangeUserCurrentLocation}
        {...mockLocation}
      />
    );
    const homeButton = getByTestId(/HomeIconButton/i);
    userEvent.click(homeButton);
    // expect(spy).toHaveBeenCalledTimes(1);
  });
  it('open delete modal by clicking delete icon button', () => {
    const { getByTestId, getByRole } = render(
      <Location
        changeUserCurrentLocation={MockChangeUserCurrentLocation}
        {...mockLocation}
      />
    );
    const deleteButton = getByTestId(/DeleteButton/i);
    userEvent.click(deleteButton);
    const deleteModal = getByRole('presentation');
    expect(deleteModal).toBeInTheDocument();
  });
  it('not render home icon if location is host', () => {
    mockLocation.host = true;
    const { queryByRole } = render(
      <Location
        changeUserCurrentLocation={MockChangeUserCurrentLocation}
        {...mockLocation}
      />
    );
    const homeButton = queryByRole('button', { name: 'home' });
    expect(homeButton).toBe(null);
  });
  it('opens textarea for adding comment by clicking pencil icon', () => {
    mockLocation.message = commentMessageText;
    const { getByTestId, queryByRole } = render(
      <Location
        changeUserCurrentLocation={MockChangeUserCurrentLocation}
        {...mockLocation}
      />
    );
    const pencilIcon = getByTestId(/pencil-icon/i);
    const textarea = queryByRole('textbox');
    expect(textarea).toBe(null);
    userEvent.click(pencilIcon);
    const textareaAfterClick = queryByRole('textbox');
    expect(textareaAfterClick).toBeInTheDocument();
  });
  it('add comment by blurring from the textarea', () => {
    mockLocation.message = commentMessageText;
    const { getByRole, getByTestId } = render(
      <Location
        changeUserCurrentLocation={MockChangeUserCurrentLocation}
        {...mockLocation}
      />
    );
    const pencilIcon = getByTestId(/pencil-icon/i);
    userEvent.click(pencilIcon);
    const textarea = getByRole('textbox');
    const heading = getByRole('heading', { name: 'Tashkent' });
    userEvent.clear(textarea);
    const newComment = 'New comment';
    userEvent.type(textarea, newComment);
    userEvent.click(heading);
    // expect(MockAddComment).toHaveBeenCalledWith(mockLocation.id, newComment);
  });
  it('hides date, timezone and country name', () => {
    const { queryByText, queryByTestId } = render(
      <Location
        changeUserCurrentLocation={MockChangeUserCurrentLocation}
        {...mockLocation}
      />
    );
    const date = queryByTestId('date');
    const country = queryByText(mockLocation.country);
    const timezone = queryByText(mockLocation.timezone);
    expect(country).toBe(null);
    expect(timezone).toBe(null);
    expect(date).toBe(null);
  });
  it('check for adding comment with length more than 100 characters', () => {
    const { getByTestId, getByRole } = render(
      wrapper(
        <Location
          changeUserCurrentLocation={MockChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
    );
    const pencilIcon = getByTestId(/pencil-icon/i);
    const heading = getByRole('heading', { name: 'Tashkent' });
    userEvent.click(pencilIcon);
    const textarea = getByRole('textbox');
    userEvent.type(
      textarea,
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    );
    userEvent.click(heading);
    expect(MockOpenSnackbar).toHaveBeenCalledTimes(1);
    expect(MockOpenSnackbar).toHaveBeenCalledWith(
      'Comment message must not be longer than 100 characters'
    );
  });
});
