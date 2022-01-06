import { createStore } from 'redux';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';

import { Provider } from 'react-redux';
import { locationsActions } from '../../redux/locationsRedux/locationsSlice';
import { IAppLocation } from '../../lib/interfaces';
import i18n from '../../dictionary';
import rootReducer from '../../redux/rootReducer';

import Location from './LocationContainer';

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
const commentMessageText = 'This is test comment message';
const { ChangeUserCurrentLocation } = locationsActions;
const store = createStore(rootReducer);

const MockChangeUserCurrentLocation =
  jest.fn() as unknown as jest.MockedFunction<typeof ChangeUserCurrentLocation>;
const MockAddComment = jest.fn();
const MockDeleteLocation = jest.fn();

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

const Redux = ({ children }) => <Provider store={store}>{children}</Provider>;

const wrapper = (children: any) => (
  <Redux>
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  </Redux>
);

describe('test Location component', () => {
  it('renders Location component', () => {
    const { getAllByRole, getByTestId, getByRole } = render(
      wrapper(
        <Location
          changeUserCurrentLocation={ChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
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
      wrapper(
        <Location
          changeUserCurrentLocation={ChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
    );
    const commentButton = getByTestId('commentButton');
    userEvent.click(commentButton);
    const textarea = getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });
  it('renders Location component with comment message', () => {
    mockLocation.message = commentMessageText;
    const { getByText } = render(
      wrapper(
        <Location
          changeUserCurrentLocation={ChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
    );
    const commentMessage = getByText(commentMessageText);
    expect(commentMessage).toBeInTheDocument();
  });
  it('set current user location id by clicking home icon button', () => {
    const { getByTestId } = render(
      wrapper(
        <Location
          changeUserCurrentLocation={MockChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
    );
    const homeButton = getByTestId(/HomeIconButton/i);
    userEvent.click(homeButton);
    expect(MockChangeUserCurrentLocation).toHaveBeenCalledTimes(1);
  });
  it('open delete modal by clicking delete icon button', () => {
    const { getByTestId, getByRole } = render(
      wrapper(
        <Location
          changeUserCurrentLocation={ChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
    );
    const deleteButton = getByTestId(/DeleteButton/i);
    userEvent.click(deleteButton);
    const deleteModal = getByRole('presentation');
    expect(deleteModal).toBeInTheDocument();
  });
  it('not render home icon if location is host', () => {
    mockLocation.host = true;
    const { queryByRole } = render(
      wrapper(
        <Location
          changeUserCurrentLocation={ChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
    );
    const homeButton = queryByRole('button', { name: 'home' });
    expect(homeButton).toBe(null);
  });
  it('opens textarea for adding comment by clicking pencil icon', () => {
    mockLocation.message = commentMessageText;
    const { getByTestId, queryByRole } = render(
      wrapper(
        <Location
          changeUserCurrentLocation={ChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
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
      wrapper(
        <Location
          changeUserCurrentLocation={ChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
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
      wrapper(
        <Location
          changeUserCurrentLocation={ChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
    );
    const date = queryByTestId('date');
    const country = queryByText(mockLocation.country);
    const timezone = queryByText(mockLocation.timezone);
    expect(country).toBe(null);
    expect(timezone).toBe(null);
    expect(date).toBe(null);
  });
  /* it('check for adding comment with length more than 100 characters', () => {
    const { getByTestId, getByRole } = render(
      wrapper(
        <Location
          changeUserCurrentLocation={ChangeUserCurrentLocation}
          {...mockLocation}
        />
      )
    );
    const pencilIcon = getByTestId(/pencil-icon/i);
    userEvent.click(pencilIcon);
    const textarea = getByRole('textbox');
    userEvent.type(
      textarea,
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    );
  }); */
});
