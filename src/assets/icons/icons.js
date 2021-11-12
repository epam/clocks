import React from 'react';

const LinkedIn = () => (
    <svg data-testid="LinkedInIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
    </svg>
);

const GitHub = props => (
    <svg
        data-testid="GitHubIcon"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

const Twitter = () => (
    <svg
        data-testid="TwitterIcon"
        className="MuiSvgIcon-root jss176"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
    </svg>
);

const Facebook = () => (
    <svg data-testid="FacebookIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
);

const Instagram = () => (
    <svg data-testid="InstagramIcon" id="icon-instagram-filled" viewBox="125 125 550 550">
        <path d="M541.9,127.1H258.1c-72.2,0-131,58.8-131,131v283.8c0,72.3,58.8,131,131,131h283.8c72.3,0,131-58.8,131-131         V258.1C672.9,185.9,614.1,127.1,541.9,127.1z M400,568.7c-93,0-168.7-75.7-168.7-168.7c0-93,75.7-168.7,168.7-168.7         c93,0,168.7,75.7,168.7,168.7C568.7,493,493,568.7,400,568.7z M575.9,262.2c-22.4,0-40.5-18.1-40.5-40.5s18.1-40.5,40.5-40.5         c22.4,0,40.5,18.1,40.5,40.5S598.3,262.2,575.9,262.2z" />
        <path d="M400,512.2c-61.9,0-112.2-50.3-112.2-112.2S338.1,287.8,400,287.8c61.9,0,112.2,50.3,112.2,112.2         S461.9,512.2,400,512.2z" />
    </svg>
);

const CrossIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x-lg"
        viewBox="0 0 16 16"
    >
        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
    </svg>
);

const Search = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
    >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
);

const Gear = () => (
    <svg className="MuiSvgIcon-root jss177" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
);

const Comment = ({ color }) => (
    <svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill={color}>
        <path d="M 3 6 L 3 26 L 12.585938 26 L 16 29.414063 L 19.414063 26 L 29 26 L 29 6 Z M 5 8 L 27 8 L 27 24 L 18.585938 24 L 16 26.585938 L 13.414063 24 L 5 24 Z M 9 11 L 9 13 L 23 13 L 23 11 Z M 9 15 L 9 17 L 23 17 L 23 15 Z M 9 19 L 9 21 L 19 21 L 19 19 Z" />
    </svg>
);

const DarkModeIcon = () => (
    <svg width="32px" viewBox="0 0 24 24" data-testid="DarkModeIcon" aria-hidden="true">
        <path
            fill="#FFF"
            d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"
        />
    </svg>
);

const LightModeIcon = () => (
    <svg width="32px" viewBox="0 0 24 24" data-testid="LightModeIcon" aria-hidden="true">
        <path
            fill="#FFF"
            d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
        />
    </svg>
);

const HomeIcon = ({ color }) => (
    <svg viewBox="0 0 176.532 176.532" width="32px" style={{ 'enable-background': 'new 0 0 176.532 176.532' }}>
        <g>
            <path
                style={{ fill: color }}
                d="M152.928,85.912l-59.89-49.406c-2.771-2.287-6.773-2.287-9.545,0l-59.89,49.406
		c-1.728,1.425-2.728,3.546-2.728,5.785v74.544c0,4.143,3.357,7.5,7.5,7.5h119.779c4.143,0,7.5-3.357,7.5-7.5V91.697
		C155.656,89.458,154.656,87.337,152.928,85.912z M96.196,158.741H80.336v-41.524h15.859V158.741z M140.656,158.741h-29.46v-49.024
		c0-4.143-3.357-7.5-7.5-7.5H72.836c-4.143,0-7.5,3.357-7.5,7.5v49.024h-29.46V95.233l52.39-43.219l52.39,43.219V158.741z"
            />
            <path
                style={{ fill: color }}
                d="M173.72,70.866c-16.706-13.382-32.458-26.178-49.561-40.261
		c-5.109-4.591-10.479-8.938-15.675-13.144c-5.087-4.118-10.348-8.377-15.201-12.745c-2.854-2.568-7.182-2.568-10.035,0
		c-4.854,4.368-10.114,8.627-15.201,12.745c-5.195,4.205-10.565,8.553-15.675,13.144C35.27,44.689,19.518,57.484,2.812,70.866
		c-3.233,2.589-3.755,7.31-1.165,10.542c2.589,3.232,7.311,3.755,10.542,1.165C28.991,69.116,44.829,56.249,62.034,42.08
		c0.085-0.069,0.168-0.141,0.25-0.215c4.854-4.368,10.114-8.627,15.201-12.745c3.559-2.88,7.199-5.827,10.781-8.873
		c3.582,3.046,7.223,5.993,10.781,8.873c5.087,4.118,10.348,8.377,15.201,12.745c0.082,0.074,0.165,0.146,0.25,0.215
		c17.204,14.169,33.043,27.036,49.845,40.493c1.384,1.108,3.039,1.646,4.684,1.646c2.198,0,4.377-0.962,5.858-2.812
		C177.475,78.176,176.953,73.455,173.72,70.866z"
            />
        </g>
    </svg>
);

const DeleteIcon = ({ color }) => (
    <svg
        focusable="false"
        width="32px"
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-testid="DeleteIcon"
        title="DeleteIcon"
    >
        <path
            style={{ fill: color }}
            d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
        />
    </svg>
);

export {
    LinkedIn,
    GitHub,
    Twitter,
    Facebook,
    Instagram,
    CrossIcon,
    Search,
    Gear,
    Comment,
    DarkModeIcon,
    LightModeIcon,
    HomeIcon,
    DeleteIcon
};
