interface IColor {
    [colorName: string]: string;
}

const EpamColors: IColor = {
    blue: '#39C2D7',
    green: '#A3C644',
    black: '#464547',
    red: '#b22746',
    ink: '#8e244d'
};

const Colors: IColor = {
    gray: '#bcb9b5',
    lightGray: '#dcdcda'
};

export { EpamColors, Colors };
