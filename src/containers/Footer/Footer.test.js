import React from 'react';
import { render, within } from '@testing-library/react';
import Footer from './Footer';

describe('test for Footer component', () => {
  it('renders Footer component', () => {
    const { getByRole } = render(<Footer />);
    const footer = getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
  it('checks for reserved rights text', () => {
    const regEx = new RegExp(
      `© ${new Date().getFullYear()} EPAM Systems, Inc.`
    );
    const { getByText } = render(<Footer />);
    const EPAMText = getByText(regEx);
    const rightsText = getByText(/All Rights Reserved/);
    expect(EPAMText).toBeInTheDocument();
    expect(rightsText).toBeInTheDocument();
  });
  it('checks for icon links target=_blank', () => {
    const { getAllByRole } = render(<Footer />);
    const iconLinks = getAllByRole('link');
    iconLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('checking for render icon links', () => {
    const { getByTestId } = render(<Footer />);
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
