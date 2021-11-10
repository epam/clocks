interface IColor {
    [colorName: string]: string;
}

const EpamColors: IColor = {
    epamBlue: '#76CDD8',
    limeGreen: '#A3C644',
    graphite: '#222222',
    white: '#FFFFFF',
    coral: '#D35D47',
    brightBlue: '#008ACE',
    sharpBlue: '#39C2D7',
    darkBlue: '#263852',
    lightGray: '#CCCCCC',
    darkGray: '#464547'
};

const Colors: IColor = {
    gray: '#bcb9b5',
    lightGray: '#dcdcda'
};

export { EpamColors, Colors };
