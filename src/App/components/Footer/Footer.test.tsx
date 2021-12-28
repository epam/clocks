import { render, within } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../dictionary';
import Footer from './Footer';

const I18nextWrapper = () => (
  <I18nextProvider i18n={i18n}>
    <Footer />
  </I18nextProvider>
);

describe('test for Footer component', () => {
  it('renders Footer component', () => {
    const { getByRole } = render(<I18nextWrapper />);
    const footer = getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
  it('checks for reserved rights text', () => {
    const regEx = new RegExp(
      `© ${new Date().getFullYear()} EPAM Systems, Inc.`
    );
    const { getByText } = render(<I18nextWrapper />);
    const EPAMText = getByText(regEx);
    const rightsText = getByText(/All Rights Reserved/);
    expect(EPAMText).toBeInTheDocument();
    expect(rightsText).toBeInTheDocument();
  });
  it('checks for icon links target=_blank', () => {
    const { getAllByRole } = render(<I18nextWrapper />);
    const iconLinks = getAllByRole('link');
    iconLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('checking for render icon links', () => {
    const { getByTestId } = render(<I18nextWrapper />);
    const gitHubIconLink = getByTestId('GitHubIconLink');
    const facebookIconLink = getByTestId('FacebookIconLink');
    const twitterIconLink = getByTestId('TwitterIconLink');
    const linkedInIconLink = getByTestId('LinkedInIconLink');
    const instagramIconLink = getByTestId('InstagramIconLink');

    expect(gitHubIconLink).toHaveAttribute('href', 'https://github.com/epam');
    expect(
      within(gitHubIconLink).getByTestId('GitHubIcon')
    ).toBeInTheDocument();

    expect(facebookIconLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/EPAM.Global'
    );
    expect(
      within(facebookIconLink).getByTestId('FacebookIcon')
    ).toBeInTheDocument();

    expect(linkedInIconLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/epam-systems/'
    );
    expect(
      within(linkedInIconLink).getByTestId('LinkedInIcon')
    ).toBeInTheDocument();

    expect(twitterIconLink).toHaveAttribute(
      'href',
      'https://twitter.com/EPAMSYSTEMS'
    );
    expect(
      within(twitterIconLink).getByTestId('TwitterIcon')
    ).toBeInTheDocument();

    expect(instagramIconLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/epamsystems/'
    );
    expect(
      within(instagramIconLink).getByTestId('InstagramIcon')
    ).toBeInTheDocument();
  });
});
