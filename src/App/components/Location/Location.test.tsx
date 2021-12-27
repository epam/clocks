import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import Location from './Location';

const mockLocation = {
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

const MockChangeUserCurrentLocation = jest.fn();
const MockAddComment = jest.fn();
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

const locationsProvider = (children: any) => (
  <LocationsContext.Provider
    value={{
      actions: {
        AddComment: MockAddComment,
        ChangeUserCurrentLocation: MockChangeUserCurrentLocation
      },
      state: {}
    }}
  >
    {children}
  </LocationsContext.Provider>
);

const snackbarProvider = (children: any) => (
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
);

const commentMessageText = 'This is test comment message';

describe('test Location component', () => {
  it('renders Location component', () => {
    const { getAllByRole, getByTestId, getByRole } = render(
      <Location {...mockLocation} />
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
    const { getByTestId, getByRole } = render(<Location {...mockLocation} />);
    const commentButton = getByTestId('commentButton');
    userEvent.click(commentButton);
    const textarea = getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });
  it('renders Location component with comment message', () => {
    mockLocation.message = commentMessageText;
    const { getByText } = render(<Location {...mockLocation} />);
    const commentMessage = getByText(commentMessageText);
    expect(commentMessage).toBeInTheDocument();
  });
  it('set current user location id by clicking home icon button', () => {
    const { getByTestId } = render(
      locationsProvider(<Location {...mockLocation} />)
    );
    const homeButton = getByTestId(/HomeIconButton/i);
    userEvent.click(homeButton);
    expect(MockChangeUserCurrentLocation).toHaveBeenCalledWith(
      'Tashkent_UZ_41_69'
    );
  });
  it('open delete modal by clicking delete icon button', () => {
    const { getByTestId, getByRole } = render(<Location {...mockLocation} />);
    const deleteButton = getByTestId(/DeleteButton/i);
    userEvent.click(deleteButton);
    const deleteModal = getByRole('presentation');
    expect(deleteModal).toBeInTheDocument();
  });
  it('not render home icon if location is host', () => {
    mockLocation.host = true;
    const { queryByRole } = render(
      locationsProvider(<Location {...mockLocation} />)
    );
    const homeButton = queryByRole('button', { name: 'home' });
    expect(homeButton).toBe(null);
  });
  it('opens textarea for adding comment by clicking pencil icon', () => {
    mockLocation.message = commentMessageText;
    const { getByTestId, queryByRole } = render(<Location {...mockLocation} />);
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
      locationsProvider(<Location {...mockLocation} />)
    );
    const pencilIcon = getByTestId(/pencil-icon/i);
    userEvent.click(pencilIcon);
    const textarea = getByRole('textbox');
    const heading = getByRole('heading', { name: 'Tashkent' });
    userEvent.clear(textarea);
    const newComment = 'New comment';
    userEvent.type(textarea, newComment);
    userEvent.click(heading);
    expect(MockAddComment).toHaveBeenCalledWith(mockLocation.id, newComment);
  });
  it('hides date, timezone and country name', () => {
    const { queryByText, queryByTestId } = render(
      <Location {...mockLocation} />
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
      snackbarProvider(<Location {...mockLocation} />)
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
